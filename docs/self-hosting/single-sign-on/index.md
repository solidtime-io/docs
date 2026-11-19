---
sidebar_position: 1
title: Overview
---

# Single Sign-On (SSO)

solidtime can sign users in through your company's identity provider (IdP) using OpenID Connect (OIDC). Your users click a button on the solidtime login page, sign in at your IdP as they do for every other company app, and come back signed in to solidtime.

SSO is part of [On-Premise Business](/self-hosting/on-premise-business).

<img class="theme-image-light" src="/img/sso/sso-login-page-light.png" width="568" alt="The solidtime login page with the email and password form and a Keycloak button below it" />
<img class="theme-image-dark" src="/img/sso/sso-login-page-dark.png" width="568" alt="The solidtime login page with the email and password form and a Keycloak button below it" />

## Supported identity providers

Any identity provider that supports the OpenID Connect authorization code flow works. These have a step-by-step guide:

- [Keycloak](./providers/keycloak.md)
- [Microsoft Entra ID](./providers/microsoft-entra-id.md) (formerly Azure AD)
- [Okta](./providers/okta.md)
- [Google Workspace](./providers/google-workspace.md)
- [Other OIDC providers](./providers/other-oidc-providers.md) (Kanidm, Ory, PingFederate, JumpCloud, OneLogin, ...)

## Before you start

The IdP sends users back to solidtime, so solidtime has to know its own public URL:

- `APP_URL` must be the URL your users open, for example `https://time.your-company.com`.
- If solidtime runs behind a reverse proxy that terminates HTTPS, set `APP_FORCE_HTTPS="true"` and `TRUSTED_PROXIES` as described in the [configuration](/self-hosting/configuration#general). Otherwise solidtime sends an `http://` callback URL and the IdP rejects it.
- solidtime has to reach your IdP over HTTPS from the server (for the token exchange), and your users' browsers have to reach it too. IdPs on an internal network are fine.
- Make sure at least one super admin is set in `SUPER_ADMINS` and that this account has a password. Super admins can always sign in with their password, even when SSO is enforced. This is your way back in if the IdP is down or misconfigured.

## Where to go next

| You want to ...                                          | Read                                                         |
|----------------------------------------------------------|--------------------------------------------------------------|
| Connect your first identity provider                     | [Adding an identity provider](./adding-a-provider.md), then the guide for your IdP under [Provider guides](./providers/index.mdx) |
| Decide who gets an account and which organization they join | [Behavior](./adding-a-provider.md#4-behavior) |
| Manage linked users, email changes and offboarding | [Managing users](./managing-users.md) |
| Limit sign-ins to your domains or IdP groups             | [Allowed email domains and required claims](./adding-a-provider.md#allowed-email-domains) |
| Turn off password login                                   | [Enforcing SSO](./enforcing-sso.md)                            |
