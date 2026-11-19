---
sidebar_position: 1
title: Keycloak
---

# Keycloak

This guide connects solidtime to a Keycloak realm. The screenshots show Keycloak 26; older versions have the same settings in slightly different places.

You need:

- A Keycloak realm with your users. In this guide the realm is called `company` and Keycloak runs at `https://keycloak.your-company.com`.
- The callback URL of your solidtime provider. Create the provider in solidtime first with the key `keycloak` (see [Adding an identity provider](../adding-a-provider)); the callback URL is then `https://time.your-company.com/sso/keycloak/callback`.

## 1. Create the client

In the Keycloak admin console, select your realm and go to **Clients → Create client**.

**General settings**: keep **Client type** `OpenID Connect` and enter a **Client ID**, for example `solidtime`. The name is optional.

<img src="/img/sso/keycloak-create-client-general.png" width="1360" alt="Keycloak Create client, step General settings, with client type OpenID Connect and client ID solidtime" />

**Capability config**:

- Turn on **Client authentication**. This makes the client confidential and gives it a client secret.
- Keep **Standard flow** checked. This is the authorization code flow solidtime uses.
- Uncheck **Direct access grants**; solidtime doesn't need it.
- If your Keycloak version shows **PKCE Method** here, set it to `S256`. solidtime always sends a PKCE challenge, so this only makes Keycloak require it. In older versions the setting is under **Advanced → Advanced settings → Proof Key for Code Exchange Code Challenge Method**.

<img src="/img/sso/keycloak-create-client-capability.png" width="1360" alt="Keycloak Create client, step Capability config, with client authentication on and only Standard flow checked" />

**Login settings**:

- **Root URL**: your solidtime URL, for example `https://time.your-company.com`.
- **Valid redirect URIs**: the **Callback URL** of your solidtime provider, for example `https://time.your-company.com/sso/keycloak/callback`. Copy it from solidtime exactly as shown.

<img src="/img/sso/keycloak-create-client-login-settings.png" width="1360" alt="Keycloak Create client, step Login settings, with root URL https://time.your-company.com and valid redirect URI https://time.your-company.com/sso/keycloak/callback" />

Click **Save**.

## 2. Copy the client secret

Open the **Credentials** tab of the client. Keep **Client Authenticator** at `Client Id and Secret` and copy the **Client Secret**.

<img src="/img/sso/keycloak-client-credentials.png" width="1360" alt="The Credentials tab of the solidtime client with the client authenticator Client Id and Secret and the masked client secret, with an arrow pointing at its copy button" />

## 3. Add a groups or roles claim (optional)

To limit solidtime to some of your Keycloak users, add their groups or realm roles to the ID token. You need only one of the two.

### Groups

Add the user's groups to the token:

1. Open the client's **Client scopes** tab and click `solidtime-dedicated`.

   <img src="/img/sso/keycloak-client-scopes-dedicated.png" width="1360" alt="The Client scopes tab of the solidtime client with solidtime-dedicated highlighted" />

2. Click **Configure a new mapper** (or **Add mapper → By configuration**).

   <img src="/img/sso/keycloak-dedicated-scope-configure-mapper.png" width="1360" alt="The solidtime-dedicated scope without mappers and an arrow pointing at Configure a new mapper" />

3. Choose **Group Membership**.

   <img src="/img/sso/keycloak-mapper-type-group-membership.png" width="1360" alt="The Configure a new mapper dialog with the Group Membership row highlighted" />

4. Set **Name** and **Token Claim Name** to `groups`.
5. Turn **Full group path** off, so the claim contains `solidtime-users` instead of `/solidtime-users`.
6. Keep **Add to ID token** and **Add to userinfo** on, and save.

<img src="/img/sso/keycloak-groups-mapper.png" width="1360" alt="Keycloak Add mapper form of type Group Membership with name groups, token claim name groups and full group path off" />

Then create the group and add the users who may use solidtime:

1. Under **Groups**, click **Create group**, enter a name such as `solidtime-users`, and click **Create**.

   <img src="/img/sso/keycloak-create-group.png" width="1360" alt="The Create a group dialog with the name solidtime-users" />

2. Open the group, go to its **Members** tab, click **Add member**, select the users, and click **Add**.

   <img src="/img/sso/keycloak-group-add-members.png" width="1360" alt="The Add member dialog of the group solidtime-users with two users selected" />

### Realm roles

Keycloak's built-in roles mapper adds realm roles only to the access token, which solidtime doesn't read. To use realm roles, add them to the ID token for this client:

1. Under **Realm roles**, click **Create role**.

   <img src="/img/sso/keycloak-realm-roles-create.png" width="1360" alt="The Realm roles page with the Create role button highlighted" />

2. Enter a **Role name** such as `solidtime-user` and save. Then assign the role to the users or groups that may use solidtime.

   <img src="/img/sso/keycloak-realm-role-form.png" width="1360" alt="The Create role form with the role name solidtime-user" />

3. In the client's `solidtime-dedicated` scope, click **Configure a new mapper** (see above) and choose **User Realm Role**.

   <img src="/img/sso/keycloak-mapper-type-user-realm-role.png" width="1360" alt="The Configure a new mapper dialog with the User Realm Role row highlighted" />

4. Set **Name** to `realm roles` and **Token Claim Name** to `realm_access.roles`, keep **Multivalued** and **Add to ID token** on, and save.

   <img src="/img/sso/keycloak-realm-roles-mapper.png" width="1360" alt="The Add mapper form of type User Realm Role with name realm roles, token claim name realm_access.roles, and Multivalued, Add to ID token and Add to userinfo on" />

## 4. Configure the provider in solidtime

Edit the provider in solidtime and fill in [Credentials and endpoints](../adding-a-provider#3-credentials-and-endpoints):

| Field             | Value |
|-------------------|-------|
| Client ID         | the client ID from step 1, for example `solidtime` |
| Client secret     | the secret from step 2 |
| Base URL (issuer) | your realm's URL, for example `https://keycloak.your-company.com/realms/company`, then click **Discover endpoints** |

Under [**Behavior**](../adding-a-provider#4-behavior), choose who may sign in. For example:

- **Auto provision** on, **Organization** set to your company's organization.
- **Required claims**: the claim `groups` with the value `solidtime-users` (from step 3). With realm roles, use the claim `realm_access.roles` with the value `solidtime-user`.
- **Allowed email domains**: `your-company.com`, if all your users have addresses on your domains.

Save, then test and activate the provider as described in [Test and activate](../adding-a-provider#5-test-and-activate).

## Keycloak specifics

- **Issuer**: the realm URL `https://<host>/realms/<realm>`. Older Keycloak versions (before 17) have `/auth` in the path: `https://<host>/auth/realms/<realm>`.
- **Verified emails**: Keycloak sends `email_verified` from the user's **Email verified** setting. Users whose email isn't verified can't get an account or be linked by email. Verify them in Keycloak (**Users → user → Email verified**), or turn on **Verify email** under **Realm settings → Login**.
- **Hostname**: the issuer in Keycloak's tokens is derived from its hostname configuration. If Keycloak is reachable under several hostnames (for example an internal and a public one), set `KC_HOSTNAME` so the browser and solidtime see the same issuer. Otherwise sign-ins fail with "Token issuer does not match the configured issuer".
- **Reverse proxy**: if Keycloak runs behind a proxy that terminates TLS and doesn't trust the proxy's forwarded headers, discovery returns `http://` endpoints and solidtime refuses to save them ("must use HTTPS"). Set `KC_PROXY_HEADERS=xforwarded` (or `forwarded`, depending on your proxy) and an `https://` `KC_HOSTNAME`, then discover the endpoints again.
- **Self-registration**: if **User registration** is on under **Realm settings → Login**, anyone can create a Keycloak account and, with **Auto provision**, a solidtime account. Require a group or realm role (step 3) so only people you add get in.
- **User federation**: users from LDAP or Active Directory federated into Keycloak work like any other Keycloak user. Make sure the LDAP mapper fills the email and marks it verified (the "Trust Email" setting of the LDAP provider).
- **Sign-out**: signing out of solidtime doesn't sign the user out of Keycloak.
