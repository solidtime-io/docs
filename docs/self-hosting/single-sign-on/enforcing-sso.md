---
sidebar_position: 5
title: Enforcing SSO
---

# Enforcing SSO

By default, SSO is an additional way to sign in, and users keep their passwords. Enforcing SSO turns off password login for everyone except the super admins, so your IdP decides who has access, with its MFA, conditional access and offboarding.

## Turning it on

1. Set up a [provider](./adding-a-provider) and test it with a normal user.
2. Make sure every super admin (`SUPER_ADMINS`) has a password and a verified email address, and can sign in with the password. They are your [break-glass access](#break-glass-access).
3. Set `SSO_ENFORCE_SSO` in your `laravel.env` (or wherever you configure solidtime) and restart the containers:

   ```bash
   SSO_ENFORCE_SSO="true"
   ```

4. [Revoke existing API tokens](#revoke-existing-api-tokens).

Turn it on only once a provider works: enforcement applies as soon as `SSO_ENFORCE_SSO` is set, even without an active provider. Super admins can always sign in with their password, so you can't lock yourself out.

:::warning

Every active provider counts, including one that anyone can sign in through, such as Google without a required `hd` claim. With such a provider, enforcement only means "sign in with that provider", not "sign in with your company's IdP". Scope every provider to your company with [allow rules](./adding-a-provider#allowed-email-domains) before you enforce SSO.

:::

## What changes for users

Once enforcement is active:

- Password login is refused for everyone except super admins. Users see the usual "credentials do not match" error and use the SSO buttons instead.
- Registration with a password is disabled. The registration page redirects to the login page. New accounts can only be created through **Auto provision** or by a super admin.
- "Forgot password" no longer sends reset emails to users who are not super admins. The page still shows the normal success message, so it doesn't reveal which accounts exist.
- Users who are signed in with a password are logged out on their next request and asked to sign in with SSO. This includes "remember me" sessions.
- Users who are not super admins can no longer confirm actions with their password, so they can't delete their account or an organization themselves (see [Actions that need a password](#actions-that-need-a-password)).
- The desktop app and the browser extension sign in through the browser, so they use SSO automatically.

A session started through any active provider satisfies enforcement.

## Revoke existing API tokens

Enforcement controls how users sign in to the web app. It does **not** revoke credentials created before it was turned on: API tokens, and the logins of the desktop app and browser extension. These keep working until they are revoked: API tokens are valid for up to a year, and the desktop app and browser extension renew their logins on their own. Users can also still create new API tokens while SSO is enforced.

After turning on enforcement, revoke them so every user has to sign in through SSO again:

```bash
docker compose exec scheduler php artisan sso:revoke-non-sso-credentials
```

Alternatively, use the **Revoke API tokens** action on the **SSO Providers** page, which is shown while SSO is enforced. The page also shows how many API tokens and app logins exist. This count includes ones created through SSO, so it goes up again as users sign in to the apps.

This revokes all API tokens and app logins of every user except super admins, including those created through SSO, because solidtime can't tell afterwards how a token was obtained. Users then sign in again in the desktop app and browser extension, and create new API tokens if they need them. Add `--force` to skip the confirmation, for example in a deployment script. The command refuses to run while SSO isn't enforced, since users could then simply sign in with their password again.

## Break-glass access

Super admins (`SUPER_ADMINS`) are exempt from enforcement: they can still sign in with their password, reset it, and confirm actions with it, as long as they already have one. Keep at least one super admin with a password and store it securely, so that you can fix the provider configuration if the IdP is unavailable.

To turn enforcement off, remove `SSO_ENFORCE_SSO` (or set it to `false`) and restart the containers. Users who have a password can then use it again. Users created through SSO don't have a password and keep signing in through SSO.

## Deactivating a provider

Deactivating or deleting a provider ends all sessions that were started through it, on the users' next request. This happens with and without enforcement. Users who have no other way to sign in (no other active provider, and no password they are allowed to use) also lose their API tokens and app logins.

Enforcement stays in effect when you deactivate the last active provider. Users can't fall back to an old password, so someone you offboarded at your IdP stays locked out of the web app. Until a provider is active again, only super admins can sign in.

## Actions that need a password

Deleting an account and deleting an organization ask the user to confirm with their password. SSO accounts can't do this: accounts created through SSO have no password, and while SSO is enforced only super admins may use theirs. The confirmation dialog tells these users to contact an administrator.

A super admin can delete the user or the organization for them in the [super admin panel](/self-hosting/super-admin-panel), under **Users → Users** or **Users → Organizations**.

Logging out other browser sessions works for SSO accounts without a confirmation. This requires the database session driver (`SESSION_DRIVER="database"`, the default). With other drivers, these users see a message that the action is unavailable.

To offboard someone, see [Removing users](./managing-users#removing-users).
