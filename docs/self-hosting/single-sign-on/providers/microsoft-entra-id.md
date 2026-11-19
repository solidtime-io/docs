---
sidebar_position: 2
title: Microsoft Entra ID
---

# Microsoft Entra ID

This guide connects solidtime to Microsoft Entra ID (formerly Azure Active Directory), so your users sign in with their Microsoft 365 work accounts.

You need:

- An Entra tenant with your users, and an account that may create app registrations (for example the Application Administrator role).
- The callback URL of your solidtime provider. Create the provider in solidtime first with the key `entra` (see [Adding an identity provider](../adding-a-provider)); the callback URL is then `https://time.your-company.com/sso/entra/callback`.

The Entra admin center changes often. The menu paths below are from the [Microsoft Entra admin center](https://entra.microsoft.com); in the Azure portal the same pages are under **Microsoft Entra ID**.

## 1. Register the application

Go to **Entra ID → App registrations → New registration**:

- **Name**: `solidtime`
- **Supported account types**: **Single tenant only** (in older versions of the admin center: **Accounts in this organizational directory only**).
- **Redirect URI**: platform **Web**, and the callback URL `https://time.your-company.com/sso/entra/callback`.

Click **Register**. On the **Overview** page, copy the **Application (client) ID** and the **Directory (tenant) ID**.

The redirect URI must match exactly, including `https://`. Otherwise Entra shows `AADSTS50011: The redirect URI ... does not match the redirect URIs configured for the application`.

## 2. Create a client secret

Go to **Certificates & secrets → Client secrets → New client secret**, enter a description and choose an expiry. Copy the secret's **Value** (not the Secret ID) right away; Entra shows it only once.

:::warning

Entra client secrets always expire, after 24 months at most. When the secret expires, every SSO sign-in fails with "Signing in with this identity provider is not working right now because of a configuration problem". Put a reminder in your calendar, create a new secret before the old one expires, and enter it in solidtime.

:::

## 3. Add the email claims

Entra handles email addresses differently from most IdPs, so this step is required:

Go to **Token configuration → Add optional claim**, choose token type **ID**, and add:

- `email`: the user's email address, in the ID token next to `xms_edov`. If solidtime only gets the email from the userinfo endpoint, it comes without `xms_edov` and counts as unverified.
- `xms_edov` ("email domain owner verified"): Entra never sends the standard `email_verified` claim. `xms_edov: true` tells solidtime that the email's domain is verified in your tenant, so solidtime may trust the address.

If Entra asks to add the Microsoft Graph `email` permission, accept.

Without `xms_edov`, every first sign-in is refused with "The identity provider did not return a verified email address", unless you turn on **Trust email without "email_verified"** in solidtime. Only do that if you control who can set email addresses in your tenant.

## 4. Make sure users have an email address

The `email` claim comes from the user's **Email** (`mail`) attribute, not from their sign-in name (user principal name). Users with an Exchange Online mailbox have it set automatically. Users without a Microsoft 365 license (contractors, service accounts, users created by hand) often don't.

Check it under **Users → user → Properties → Contact information → Email**. Users without one are refused with "Email not provided by identity provider". solidtime deliberately doesn't fall back to the user principal name, because it isn't a verified email address.

## 5. Restrict who may sign in (recommended)

By default every user in your tenant can sign in to the app. To limit it to selected users or groups:

1. Go to **Entra ID → Enterprise apps → All applications** and open `solidtime`.
2. Under **Properties**, set **Assignment required?** to **Yes** and save.
3. Under **Users and groups**, add the users or groups who may use solidtime.

Unassigned users are then stopped by Entra itself (`AADSTS50105`) before they reach solidtime. Assigning groups (instead of individual users) needs Microsoft Entra ID P1 or P2, and members of nested groups aren't included.

To check group membership in solidtime instead, add a groups claim: **Token configuration → Add groups claim**, choose **Security groups** (or **Groups assigned to the application**), and for the **ID** token keep **Group ID**. Entra sends group **object IDs** (GUIDs), not names, so in solidtime add the required claim `groups` with the object ID as its value. Users in more than 200 groups get no groups claim at all ("group overage"); use **Groups assigned to the application** to avoid that.

## 6. Configure the provider in solidtime

Edit the provider in solidtime and fill in [Credentials and endpoints](../adding-a-provider#3-credentials-and-endpoints):

| Field             | Value |
|-------------------|-------|
| Client ID         | the Application (client) ID |
| Client secret     | the secret's value from step 2 |
| Base URL (issuer) | `https://login.microsoftonline.com/<tenant-id>/v2.0` with your Directory (tenant) ID, then click **Discover endpoints** |

Under [**Behavior**](../adding-a-provider#4-behavior), choose who may sign in, for example **Auto provision** on with your organization and **Allowed email domains** set to your verified domains.

Save, then test and activate the provider as described in [Test and activate](../adding-a-provider#5-test-and-activate).

## Entra specifics

- **Use your tenant ID**, never `common`, `organizations` or `consumers`. Those let any Microsoft account sign in. Discovery refuses `common` and `organizations` because their issuer is a placeholder, and `consumers` can't be used with an organization or email linking. Your tenant's custom domain (`https://login.microsoftonline.com/your-company.com/v2.0`) also works, but the GUID never changes.
- **National clouds**: for Azure Government or Azure China, use the matching host (`login.microsoftonline.us`, `login.partner.microsoftonline.cn`).
- **Userinfo endpoint**: Entra's userinfo endpoint is on Microsoft Graph (`https://graph.microsoft.com/oidc/userinfo`). It is discovered automatically.
- **Signing keys**: Entra publishes keys without an `alg` field. solidtime handles that.
- **Claims mapping policies**: if the app registration uses a claims mapping policy with a custom signing key, Entra signs its tokens with a key that isn't in the tenant's key set. Add `?appid=<application-client-id>` to the **JWKS URI** after discovering the endpoints, for example `https://login.microsoftonline.com/<tenant-id>/discovery/v2.0/keys?appid=<application-client-id>`. Otherwise every sign-in fails because the token's signing key is unknown. Optional claims (step 3) don't need this.
- **Subject**: Entra's `sub` is unique per user and application (pairwise), so the same user has a different `sub` in every app registration. If you replace the app registration with a new one, for example after deleting it or moving to another tenant, every user gets a new `sub` and is treated as new. Keep the registration and rotate only its client secret. If you must replace it, create a new provider in solidtime for the new registration with **Allow email-based account linking** on, so existing users are linked to it by email on their next sign-in, then delete the old provider. Reusing the old provider doesn't work: an account that is still linked there can't be linked by email to a new `sub`, and while SSO is enforced, users who can only sign in through SSO can't be unlinked.
- **MFA and Conditional Access** apply as for every other app. New tenants make users register for MFA on first sign-in (security defaults), usually with Microsoft Authenticator.
- **Personal Microsoft accounts** (outlook.com, hotmail.com) are not supported with a single-tenant registration, and that is intended.
- **Several Microsoft accounts in one browser**: Microsoft shows its account picker. Only accounts of your tenant can complete the sign-in.
