---
sidebar_position: 4
title: Managing users
---

# Managing users

How solidtime connects a sign-in to an account, and what happens to accounts afterwards. New accounts and email linking are set up under [Behavior](./adding-a-provider#4-behavior).

## How an identity is matched to an account

solidtime tries these in order:

1. **Linked account.** The IdP's user ID (the `sub` claim) is already linked to a solidtime account at this provider. The user is signed in to that account. This is how every sign-in after the first one works.
2. **Existing account with the same email.** If [**Allow email-based account linking**](./adding-a-provider#email-linking-and-verification) is on, an existing solidtime account with the same, verified email address is linked and signed in.
3. **New account.** If [**Auto provision**](./adding-a-provider#new-accounts) is on, a new account is created and linked.

If none of these apply, the sign-in is refused with "Account not found. Contact your administrator to get access."

<img class="theme-image-light" src="/img/sso/sso-login-error-light.png" width="568" alt="The login page with the error message Account not found. Contact your administrator to get access." />
<img class="theme-image-dark" src="/img/sso/sso-login-error-dark.png" width="568" alt="The login page with the error message Account not found. Contact your administrator to get access." />

Accounts are matched by the IdP's user ID, never by name or username. After the first sign-in, a user's email address can change at the IdP and they still reach the same account.

## Email address changes

While a user is linked to an active provider, the IdP manages their email address. They can't change it in solidtime; a change at the IdP is taken over on their next sign-in, and the old address gets a notification. A super admin can still change it in the [super admin panel](/self-hosting/super-admin-panel).

## Managing linked users

The **Linked users** table on a provider's edit page lists every solidtime account connected to an identity at this provider, with the IdP's user ID (**Subject**, the `sub` claim) and when it was linked.

<img class="theme-image-light" src="/img/sso/sso-admin-linked-users-light.png" width="896" alt="The Linked users table with jane.doe@your-company.com, her name, her subject and the date she was linked, and an Unlink action" />
<img class="theme-image-dark" src="/img/sso/sso-admin-linked-users-dark.png" width="896" alt="The Linked users table with jane.doe@your-company.com, her name, her subject and the date she was linked, and an Unlink action" />

**Unlink** removes the connection. It doesn't delete the account. The user's sessions through this provider end on their next request, and their next sign-in with this provider is treated like a first sign-in (auto-provisioning or email linking, depending on your settings). solidtime refuses to unlink a user if it is their only way to sign in.

Links can't be created by hand. They are only created by a successful sign-in, because the subject must be exactly what the IdP sends.

## Removing users

SCIM is not currently supported, so solidtime doesn't learn when you remove someone in your IdP. Removing a user in your IdP (or from an allowed group) stops their **next** sign-in, but doesn't affect what they already have:

- Their current web session continues until it expires: by default after 120 minutes without activity (`SESSION_LIFETIME`).
- Their API tokens, desktop app and browser extension logins keep working.
- Their organization memberships stay in place.

When someone leaves, also **deactivate** them in solidtime: on the organization's **Members** page, open the member's menu and choose **Deactivate**. solidtime turns them into a placeholder member, so their time entries stay in the organization, and their account loses access to the organization's data right away. Alternatively, delete their account in the super admin panel, which also keeps their time entries as a placeholder (see [Delete your account](/user-guide/delete-users-organizations#delete-your-account)).

Deactivating doesn't unlink their account from the IdP. If they still pass the allow rules, they can sign in, but they no longer see the organization's data.
