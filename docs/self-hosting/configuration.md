---
sidebar_position: 3
---

# Configuration

This page contains important **configuration options you should consider when self-hosting solidtime in production**. Please read them carefully and adjust them to your needs.
If you are looking for a guide to get a simple setup up and running, you can find it [here](./guides/docker).

The configuration contains placeholders (`your-domain.com`, `your-bucket-name`, `***`) that you need to replace with your own values.

## General

The configuration example below is for a production environment using HTTPS. You can adjust the values to your needs, in any case you will have to change `APP_URL` to the URL of your solidtime instance.

```bash
APP_ENV="production"
APP_DEBUG="false"
APP_URL="https://your-domain.com"
APP_FORCE_HTTPS="true"
APP_ENABLE_REGISTRATION="on"
TRUSTED_PROXIES="0.0.0.0/0,2000:0:0:0:0:0:0:0/3"
```

| Env variable name       | Description                                                                                                                                                                                                                                                                                                                                                    |
|-------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| APP_URL                 | Base URL (f.e. `https://your-domain.com` for a production setup or something like `http://localhost:8000` for a local HTTP-only setup)                                                                                                                                                                                                                         |
| APP_FORCE_HTTPS         | If enabled, the application will threat all request as if they were HTTPS. This is useful if the app is behind a reverse proxy and the reverse proxy is HTTPS-only but the communication between reverse proxy and app is HTTP.                                                                                                                                |
| APP_ENABLE_REGISTRATION | Controls who can register an account. Supported values: `on` — everyone can register; `invite-only` — only users who accepted an organization invitation for their email address can register (users with a pending invitation are asked to accept it first); `off` — registration is disabled, only users with an existing account can log in, but it is still possible to create users in the [super admin panel](/self-hosting/super-admin-panel) and via the [CLI](/self-hosting/cli-commands). The values `true` and `false` are still supported for backwards compatibility and behave like `on` and `off`. [SSO auto-provisioning](/self-hosting/single-sign-on/adding-a-provider#new-accounts) into an organization ignores this setting.                                                                                                             |
| TRUSTED_PROXIES         | Comma-seperated list of CIDR IP ranges that are considered trusted. The app will trust headers like the `X-Forwarded-For` requests from those IPs. The example above (`0.0.0.0/0,2000:0:0:0:0:0:0:0/3`) is a wildcard for all IP addresses. This is only safe, if it's not possible to bypass the reverse proxy and the reverse proxy is correctly configured. |
| TRUSTED_HOSTS           | Comma-seperated list of additional hostnames that the application accepts requests on. By default, requests are only accepted if their `Host` header matches the hostname of `APP_URL` or a subdomain of it. Requests on any other hostname are rejected to prevent Host header poisoning of generated links (f.e. password reset links). Set this variable if your instance is reachable under more than one hostname, f.e. `TRUSTED_HOSTS="solidtime.internal,*.your-tailnet.ts.net"`. An entry like `*.example.com` matches all subdomains of `example.com`, but not `example.com` itself. |

## Authentication

You can run `docker run --rm solidtime/solidtime:main php artisan self-host:generate-keys` to obtain `APP_KEY`, `PASSPORT_PRIVATE_KEY` and `PASSPORT_PUBLIC_KEY`

```bash
APP_KEY=""
PASSPORT_PRIVATE_KEY=""
PASSPORT_PUBLIC_KEY=""
SUPER_ADMINS=""
```

| Env variable name    | Description                                                                                                         |
|----------------------|---------------------------------------------------------------------------------------------------------------------|
| APP_KEY              | The application key is mainly used to encrypt the session cookies.                                                  |
| PASSPORT_PRIVATE_KEY | Private key for the OAuth server                                                                                    |
| PASSPORT_PUBLIC_KEY  | Public key for the OAuth server                                                                                     |
| SUPER_ADMINS         | Array of email addresses that have access to the [super admin panel](./super-admin-panel), seperated by a comma `,` |

## Single Sign-On (SSO)

Signing in through your company's identity provider (OIDC), including how to require it for all users, is described on the [Single Sign-On page](/self-hosting/single-sign-on).
Providers are configured in the super admin panel, the following environment variables control the instance-wide SSO behavior:

```bash
SSO_ENFORCE_SSO="false"
SSO_ALLOW_HTTP_ENDPOINTS="false"
SSO_LOGIN_RATE_LIMIT_PER_MINUTE="600"
```

| Env variable name               | Description                                                                                                                                                                             |
|---------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| SSO_ENFORCE_SSO                 | Require SSO for everyone except super admins (see [Enforcing SSO](/self-hosting/single-sign-on/enforcing-sso)). Applies even while no provider is active, so only turn it on once a provider works (default: `false`) |
| SSO_ALLOW_HTTP_ENDPOINTS        | Allow identity provider endpoints over plain HTTP. Only meant for local testing (default: `true` if `APP_ENV` is `local` or `testing`, otherwise `false`)                               |
| SSO_LOGIN_RATE_LIMIT_PER_MINUTE | Maximum number of requests per minute and IP address to the SSO routes. The default is high on purpose, because a company's users often share one IP address (default: `600`)           |

## Logging

You can read more about the logging configuration in the [Laravel documentation](https://laravel.com/docs/11.x/logging#configuration).

**Store logs in files under storage/logs with one log file per day:**

```bash
LOG_CHANNEL="daily"
LOG_LEVEL="debug"
```

**Output logs via stderr:**

```bash
LOG_CHANNEL="stderr"
LOG_LEVEL="debug"
```

**Output logs via stderr and store the in daily log files:**

```bash
LOG_CHANNEL="stderr_daily"
LOG_LEVEL="debug"
```

## Database

You can read more about the database configuration in the [Laravel documentation](https://laravel.com/docs/11.x/database#configuration).
Please remember that solidtime only supports PostgreSQL.

```bash
DB_HOST="your-database-host-or-ip"
DB_PORT="5432"
DB_SSL_MODE="prefer"
DB_DATABASE="***"
DB_USERNAME="***"
DB_PASSWORD="***"
```

`DB_SSL_MODE` sets the [PostgreSQL SSL mode](https://www.postgresql.org/docs/current/libpq-ssl.html#LIBPQ-SSL-PROTECTION) of the connection and defaults to `prefer`.
If you use an external database that supports SSL, you can set it to `require` to enforce an encrypted connection.
Do not set it to `require` (or stricter) when using the database container from the self-hosting guide, since it does not support SSL.

Alternatively, you can configure the connection with a single URL via `DB_URL` (`DATABASE_URL` is supported as a fallback):

```bash
DB_URL="postgresql://username:password@your-database-host-or-ip:5432/database?sslmode=prefer"
```

## PDF rendering

If you want to use solidtime features that create PDFs, like exporting a report as PDF, you need to configure a PDF rendering server.
solidtime uses [Gotenberg](https://gotenberg.dev/) to render PDFs.
The application needs to be able to send requests to the Gotenberg server.
The self-hosting guide already includes a Gotenberg container.
The environment variable `GOTENBERG_URL` is used to configure the URL of the Gotenberg server.

```bash
GOTENBERG_URL=http://gotenberg:3000
```

## Email

Configure the email settings for sending emails. Solidtime supports every (transactional) mail service that offers an SMTP integration.  

### Example using Scaleway TEM via SMTP

```bash
MAIL_MAILER="smtp"
MAIL_HOST="smtp.tem.scw.cloud"
MAIL_PORT="465"
MAIL_ENCRYPTION="tls"
MAIL_FROM_ADDRESS="no-reply@your-domain.com"
MAIL_FROM_NAME="your-company-name"
MAIL_USERNAME="**"
MAIL_PASSWORD="**"
```

### Test via Log

If you want to test f.e. the registration before setting up a transactional email service, you can use the log mailer.
This logs outgoing emails to the log file.
If you want to copy the link for the email verification, use the one from the textual, non-HTML version of the email in the log file.

```bash
MAIL_MAILER="log"
```

## Queue

You can read more about the queue configuration in the [Laravel documentation](https://laravel.com/docs/11.x/queues#driver-prerequisites).

### Sync

You can use this option if you don't want to use a separate Queue Worker (f.e. a `worker` container, see [Container Mode](./container-mode.md)) that handles queued jobs asynchronously. It will dispatch jobs synchronously. **We do not recommend using this option in production.** 

```bash
QUEUE_CONNECTION="sync"
```

### Database

Please keep in mind that you need a separate Queue Worker (f.e. a `worker` container, see [Container Mode](./container-mode.md)) that handles queued jobs asynchronously to use this configuration option.

```bash
QUEUE_CONNECTION="database"
```

## File Storage

You can read more about the file storage configuration in the [Laravel documentation](https://laravel.com/docs/11.x/filesystem#configuration).


| Env variable name      | Description                                              |
|------------------------|----------------------------------------------------------|
| FILESYSTEM_DISK        | Filesystem disk for private files                        |
| PUBLIC_FILESYSTEM_DISK | Filesystem disk for public files (f.e. profile pictures) |

### Local Disk

```bash
FILESYSTEM_DISK="local"
PUBLIC_FILESYSTEM_DISK="public"
```

### Scaleway Object Storage

```bash
FILESYSTEM_DISK="s3"
PUBLIC_FILESYSTEM_DISK="s3"
S3_REGION="fr-par" # fr-par, nl-ams, pl-waw
S3_BUCKET="your-bucket-name"
S3_ENDPOINT="https://s3.fr-par.scw.cloud" # Replace fr-par with your region
S3_ACCESS_KEY_ID="***"
S3_SECRET_ACCESS_KEY="***"
```

## API Rate Limiting

The [API](/user-guide/access-api) is rate limited to protect the application against excessive use.
Authenticated requests are counted per user, guest requests are counted per IP address.
If you hit the limits, f.e. because of integrations that make a lot of API requests, you can increase them via the following environment variables. Note that the web app also uses the API and requests via the web app count towards the API Rate Limits. 
The rate limits are only enforced if `APP_ENV` is set to `production`.

```bash
API_RATE_LIMIT_AUTH_PER_MINUTE="200"
API_RATE_LIMIT_GUEST_PER_MINUTE="60"
```

| Env variable name               | Description                                                                                 |
|---------------------------------|---------------------------------------------------------------------------------------------|
| API_RATE_LIMIT_AUTH_PER_MINUTE  | Number of API requests per minute that an authenticated user can make (default: `200`)      |
| API_RATE_LIMIT_GUEST_PER_MINUTE | Number of API requests per minute that a guest can make, counted per IP address (default: `60`) |

## Update Check and Telemetry

solidtime regularly contacts the solidtime API twice a day to check for new versions and to send anonymous telemetry data. The exact times are derived from your `APP_KEY`, so requests from different instances are spread over the day.
The update check sends your solidtime version, build and `APP_URL` and shows the latest available version in the [super admin panel](./super-admin-panel).
Telemetry sends the same information plus the number of records in the main tables (users, organizations, projects, project members, clients, tasks, time entries and audits). Only counts are sent, no actual data.

Both tasks are enabled by default and can be deactivated via the following environment variables:

```bash
SCHEDULING_TASK_SELF_HOSTING_CHECK_FOR_UPDATE="false"
SCHEDULING_TASK_SELF_HOSTING_TELEMETRY="false"
```

| Env variable name                             | Description                                                                               |
|-----------------------------------------------|-------------------------------------------------------------------------------------------|
| SCHEDULING_TASK_SELF_HOSTING_CHECK_FOR_UPDATE | Enables the scheduled check for new solidtime versions (default: `true`)                  |
| SCHEDULING_TASK_SELF_HOSTING_TELEMETRY        | Enables the scheduled sending of anonymous telemetry data (default: `true`)               |
