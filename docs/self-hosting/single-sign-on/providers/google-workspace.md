---
sidebar_position: 4
title: Google Workspace
---

# Google Workspace

This guide lets the users of your Google Workspace sign in with their Google account.

You need:

- A Google Workspace and a Google Cloud project you can manage (any project in your Workspace's Cloud organization).
- The callback URL of your solidtime provider. Create the provider in solidtime first with the key `google` (see [Adding an identity provider](../adding-a-provider)); the callback URL is then `https://time.your-company.com/sso/google/callback`.

:::info

Google is a **public issuer**: anyone with a Google account can sign in at Google, including personal accounts registered with your company's email address. solidtime therefore requires the `hd` (hosted domain) claim rule described in step 3 before it adds users to your organization. Without the rule, email linking only links Gmail addresses and Workspace accounts whose email is on their own domain, since Google controls those mailboxes.

:::

## 1. Configure the consent screen

In the [Google Cloud Console](https://console.cloud.google.com), select your project and open [**Google Auth Platform**](https://console.cloud.google.com/auth/overview) (formerly **APIs & Services → OAuth consent screen**):

- **Branding**: an app name such as `solidtime`, and a support email.

  <img src="/img/sso/google-branding.png" width="1360" alt="The Branding page of the Google Auth Platform with the app name solidtime and the support email it@your-company.com" />

- **Audience**: **Internal**. Only users of your Google Workspace can then sign in to the app, which is an additional, Google-side restriction.

  <img src="/img/sso/google-audience.png" width="578" alt="The User type section of the Audience page set to Internal" />

## 2. Create the OAuth client

Go to **Clients → Create client** (formerly **Credentials → Create credentials → OAuth client ID**):

- **Application type**: **Web application**
- **Name**: `solidtime`
- **Authorized redirect URIs**: the **Callback URL** of your solidtime provider, for example `https://time.your-company.com/sso/google/callback`

<img src="/img/sso/google-create-client.png" width="1360" alt="The Create OAuth client ID form with application type Web application, name solidtime and the redirect URI https://time.your-company.com/sso/google/callback" />

Click **Create** and copy the **Client ID** and **Client secret**.

## 3. Configure the provider in solidtime

Edit the provider in solidtime and fill in [Credentials and endpoints](../adding-a-provider#3-credentials-and-endpoints):

| Field             | Value |
|-------------------|-------|
| Client ID         | the client ID from step 2 |
| Client secret     | the client secret from step 2 |
| Base URL (issuer) | `https://accounts.google.com`, then click **Discover endpoints** |

Under [**Behavior**](../adding-a-provider#4-behavior):

- **Required claims**: claim `hd`, value your Workspace's primary domain, for example `your-company.com`. For several domains, add one value per domain. Always set it: without it, any Google account can sign in, and solidtime refuses to add users to an organization.
- **Allowed email domains**: the same domain(s).
- **Auto provision** and **Organization** as you need them (see [New accounts](../adding-a-provider#new-accounts)).

Save, then test and activate the provider as described in [Test and activate](../adding-a-provider#5-test-and-activate).

## Google specifics

- **`hd` is the Workspace's primary domain** for all its users, also for users whose email address is on a secondary domain. solidtime additionally requires the email's domain to equal `hd`, so users on secondary or alias domains are refused. Use their primary-domain address, or set up one Google provider per domain.
- **Several Google accounts in one browser**: Google shows its account picker, and users pick their work account. The `hd` rule refuses any other account, even one with an address on your domain.
- **Personal Google accounts** have no `hd` claim and are always refused by the `hd` rule, even if their address is on your domain.
- **Groups**: Google doesn't put group memberships into tokens. Control access with the Workspace domain, or with the consent screen's **Internal** audience.
