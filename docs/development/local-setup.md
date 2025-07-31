---
sidebar_position: 2
---

# Local Development Setup

:::info
This local setup is **ONLY intended for development** purposes. **DO NOT** use this if you want to actually use solidtime, even if you want to run it locally.
If just want to use solidtime, please follow the [self-hosting guide](../self-hosting/intro.md).
:::


## Prerequisites

- [Docker Desktop and Docker Compose](https://www.docker.com/products/docker-desktop/) installed on your system.

## Setup

The local setup is an extended version of [Laravel Sail](https://laravel.com/docs/12.x/sail#main-content).

To start you need to download or clone the repository f.e. with:

```bash
git clone git@github.com:solidtime-io/solidtime.git
```

After that, execute the following commands **inside the project folder**:

```bash
docker run --rm \
    --pull=always \
    -v "$(pwd)":/opt \
    -w /opt \
    laravelsail/php83-composer:latest \
    bash -c "composer install --ignore-platform-reqs"

cp .env.example .env
```

Before you can run the application, you need to set up the environment variables in the `.env` file.
Make sure to set the `FORWARD_DB_PORT` inside your `.env` file to a port that is not already used by your system.

By default, the PostgreSQL database is set up to run on port `54329` on your host machine, so you can use that port if it is not already in use.

```bash
./vendor/bin/sail up -d

./vendor/bin/sail artisan key:generate

./vendor/bin/sail artisan migrate:fresh --seed

./vendor/bin/sail php artisan passport:install

./vendor/bin/sail npm install

./vendor/bin/sail npm run build
```

**Optional: sail Alias**

If you want to use the `sail` command instead of `./vendor/bin/sail`, you can add the following alias to your shell configuration file (e.g. `.bashrc`, `.zshrc`):

```bash
alias sail='sh $([ -f sail ] && echo sail || echo vendor/bin/sail)'
```

### Setup with Reverse Proxy

Using a Traefik reverse proxy is currently required for the local development setup to work properly.
The `docker-compose.yml` file already contains configurations for Traefik, but you need to set up the reverse proxy yourself.

You can follow the following [this guide to set up the reverse proxy](https://github.com/korridor/reverse-proxy-docker-traefik?tab=readme-ov-file#setup-for-local-development).

Afterward, add the following entries to your `/etc/hosts`:

```
127.0.0.1 solidtime.test
127.0.0.1 playwright.solidtime.test
127.0.0.1 vite.solidtime.test
127.0.0.1 mail.solidtime.test
```

Then restart the Docker containers with:

```bash
./vendor/bin/sail down
./vendor/bin/sail up -d
```

You should now be able to access the application at [http://solidtime.test](http://solidtime.test) and the Vite server at [http://vite.solidtime.test](http://vite.solidtime.test).

### Running E2E Tests

`./vendor/bin/sail up -d ` will automatically start a Playwright UI server that you can access at `https://playwright.solidtime.test`.
Make sure that you use HTTPS otherwise the resources will not be loaded correctly.

### Recording E2E Tests

To record E2E tests, you need to install and execute playwright locally (outside the Docker container) using:

```bash
npx playwright install
npx playwright codegen solidtime.test
``` 

### E2E Troubleshooting

If E2E tests are not working at all, make sure you do not have the Vite server running and just run `npm run build` to update the version.
If the E2E tests are not working consistently and fail with a timeout during the authentication, you might want to delete the `test-results/.auth` directory to force new test accounts to be created.

### Generate ZOD Client

The Zodius HTTP client is generated using the following command:

```bash
npm run zod:generate
```
