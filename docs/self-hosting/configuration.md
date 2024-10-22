---
sidebar_position: 3
---

# Configuration

This page contains important **configuration options you should consider when self-hosting solidtime in production**. Please read them carefully and adjust them to your needs.
If you are looking for a guide to get a simple setup up and running, you can find it [here](./guides/docker).

The configuration contains placeholders (`your-domain.com`, `your-bucket-name`, `***`) that you need to replace with your own values.

## General

The configuration example below is for a production environment using HTTPS. You can adjust the values to your needs, in any case you will have to change `APP_URL` to the URL of your solidtime instance.

```dotenv
APP_ENV="production"
APP_DEBUG="false"
APP_URL="https://your-domain.com"
APP_FORCE_HTTPS="true"
TRUSTED_PROXIES="0.0.0.0/0,2000:0:0:0:0:0:0:0/3"
```

| Env variable name | Description                                                                                                                                                                                                                                                                                                                                                    |
|-------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| APP_URL           | Base URL (f.e. `https://your-domain.com` for a production setup or something like `http://localhost:8000` for a local HTTP-only setup)                                                                                                                                                                                                                         |
| APP_FORCE_HTTPS   | If enabled, the application will threat all request as if they were HTTPS. This is useful if the app is behind a reverse proxy and the reverse proxy is HTTPS-only but the communication between reverse proxy and app is HTTP.                                                                                                                                |
| TRUSTED_PROXIES   | Comma-seperated list of CIDR IP ranges that are considered trusted. The app will trust headers like the `X-Forwarded-For` requests from those IPs. The example above (`0.0.0.0/0,2000:0:0:0:0:0:0:0/3`) is a wildcard for all IP addresses. This is only safe, if it's not possible to bypass the reverse proxy and the reverse proxy is correctly configured. |

## Authentication

You can run `docker run --rm solidtime/solidtime:main php artisan self-host:generate-keys` to obtain `APP_KEY`, `PASSPORT_PRIVATE_KEY` and `PASSPORT_PUBLIC_KEY`

```dotenv
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

## Logging

You can read more about the logging configuration in the [Laravel documentation](https://laravel.com/docs/11.x/logging#configuration).

**Store logs in files under storage/logs with one log file per day:**

```dotenv
LOG_CHANNEL="daily"
LOG_LEVEL="debug"
```

**Output logs via stderr:**

```dotenv
LOG_CHANNEL="stderr"
LOG_LEVEL="debug"
```

**Output logs via stderr and store the in daily log files:**

```dotenv
LOG_CHANNEL="stderr_daily"
LOG_LEVEL="debug"
```

## Database

You can read more about the database configuration in the [Laravel documentation](https://laravel.com/docs/11.x/database#configuration).
Please remember that solidtime only supports PostgreSQL.

```dotenv
DB_HOST="your-database-host-or-ip"
DB_PORT="5432"
DB_SSLMODE="require"
DB_DATABASE="***"
DB_USERNAME="***"
DB_PASSWORD="***"
```

## Email

Configure the email settings for sending emails. Solidtime supports every (transactional) mail service that offers an SMTP integration.  

### Example using Scaleway TEM via SMTP

```dotenv
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

```dotenv
MAIL_MAILER="log"
```

## Queue

You can read more about the queue configuration in the [Laravel documentation](https://laravel.com/docs/11.x/queues#driver-prerequisites).

### Sync

You can use this option if you don't want to use a separate Queue Worker (f.e. a `worker` container, see [Container Mode](./container-mode.md)) that handles queued jobs asynchronously. It will dispatch jobs synchronously. **We do not recommend using this option in production.** 

```dotenv
QUEUE_CONNECTION="sync"
```

### Database

Please keep in mind that you need a separate Queue Worker (f.e. a `worker` container, see [Container Mode](./container-mode.md)) that handles queued jobs asynchronously to use this configuration option.

```dotenv
QUEUE_CONNECTION="database"
```

## File Storage

You can read more about the file storage configuration in the [Laravel documentation](https://laravel.com/docs/11.x/filesystem#configuration).


| Env variable name      | Description                                              |
|------------------------|----------------------------------------------------------|
| FILESYSTEM_DISK        | Filesystem disk for private files                        |
| PUBLIC_FILESYSTEM_DISK | Filesystem disk for public files (f.e. profile pictures) |

### Local Disk

```dotenv
FILESYSTEM_DISK="local"
PUBLIC_FILESYSTEM_DISK="public"
```

### Scaleway Object Storage

```dotenv
FILESYSTEM_DISK="s3"
PUBLIC_FILESYSTEM_DISK="s3"
S3_REGION="fr-par" # fr-par, nl-ams, pl-waw
S3_BUCKET="your-bucket-name"
S3_ENDPOINT="https://s3.fr-par.scw.cloud" # Replace fr-par with your region
S3_ACCESS_KEY_ID="***"
S3_SECRET_ACCESS_KEY="***"
```
