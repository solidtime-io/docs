---
sidebar_position: 8
title: Other OIDC providers
---

# Other OIDC providers

solidtime works with any identity provider that implements OpenID Connect. Follow [Adding an identity provider](../adding-a-provider).

## Requirements

Your IdP must support:

| Requirement | Why |
|---|---|
| OpenID Connect Discovery (`<issuer>/.well-known/openid-configuration`) | solidtime reads the endpoints from it. You can also enter the endpoints by hand. |
| The authorization code flow with a client secret | solidtime is a confidential client. |
| The client secret in the token request body (`client_secret_post`) or an HTTP Basic header (`client_secret_basic`) | Set under **Token endpoint authentication**. Discovery picks the request body unless the IdP lists only Basic. |
| PKCE with `S256` | solidtime always sends a PKCE challenge. IdPs that don't support PKCE ignore it. |
| ID tokens signed with an asymmetric key (RS256/384/512, PS256/384/512, ES256/384/512 or EdDSA), published in a JWKS | HMAC-signed tokens (HS256) are refused. |
| A userinfo endpoint | Used when the ID token doesn't contain the email or a claim of your allow rules. |
| `sub`, `email` and `email_verified` claims | `sub` identifies the user; the email must be verified for new and email-linked accounts (or turn on **Trust email without "email_verified"**). |

## Setting it up

1. Create a confidential / web client in your IdP with the redirect URI `https://time.your-company.com/sso/<key>/callback` and the scopes `openid profile email`.
2. In solidtime, enter the client ID, client secret and the issuer as **Base URL**, and click **Discover endpoints**.
3. Choose who may sign in under **Behavior**, and test the sign-in.

If discovery isn't available, fill in the five endpoint fields by hand. The **Issuer** must be exactly the `iss` value in the IdP's ID tokens.

## Hints for common providers

- **Kanidm**: create an OAuth2 client and map the `openid`, `email` and `profile` scopes to the group that may use solidtime. Kanidm requires PKCE, which solidtime always sends.
- **JumpCloud, OneLogin, PingFederate, Ory**: use their OIDC "web application" templates. Restrict access by assigning users or groups to the app in the IdP.

If your provider needs a scope for an extra claim (for example `groups`), add it to **Additional scopes** in solidtime.
