---
sidebar_position: 5
---

# Super Admin Panel

The super admin panel is a special panel for the administrators of the self-hosted solidtime instance.

:::warning

The super admin panel is made for technical users that are responsible for the solidtime instance. It is possible to break the application with the super admin panel.

:::

## Access

To access the super admin panel, you need to be a super admin. The super admins are defined in the environment variables of the self-hosted solidtime application. If you use the [Docker guide](/self-hosting/guides/docker), you can set the super admins in the `laravel.env` file with the `SUPER_ADMINS` environment variable.

```bash
SUPER_ADMINS="chief.admin@somecompany.test,other.admin@somecompany.test"
```

The super admins env variable is a comma-separated list of email addresses.
If you are logged in with an email address that is in the `SUPER_ADMINS` list, you can access the super admin panel via `/admin`.
The super admin panel uses the same authentication as the rest of the application.

