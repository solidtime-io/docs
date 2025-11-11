---
sidebar_position: 6
---

# On-Premise Business

**On-Premise Business** is our paid plan that provides access to advanced features and extensions for self-hosted solidtime instances.

To learn more about the On-Premise Business plan and see detailed pricing information, please visit our [pricing page](https://www.solidtime.io/pricing).

## Getting Started

Once you subscribe to the On-Premise Business plan, you'll receive an email with the following license information:

1. Docker registry
2. Username
3. Password

## Upgrading an existing Instance

If you already have a solidtime instance running, you can upgrade it to On-Premise Business.

:::warning

We highly recommend making a backup of your data before proceeding.

:::


### 1. Login to the private registry

First, you need log into the private registry by running the following command on the host machine:

```bash
docker login registry.on-premise.solidtime.io
```

You will be asked to provide a **Username** and **Password**, which are included in the license information mail.

### 2. Upgrade Docker images

Now, we have to change the images from the [public registry](https://hub.docker.com/r/solidtime/solidtime) to the private one in the `docker-compose.yml` for the services **app, scheduler and queue**.

`solidtime/solidtime` -> `registry.on-premise.solidtime.io/solidtime/solidtime`

After doing that the image attributes in your `docker-compose.yml` for **app, scheduler and queue** should look something like this:

```yaml
services:
  app:
    // highlight-next-line
    image: "registry.on-premise.solidtime.io/solidtime/solidtime:${SOLIDTIME_IMAGE_TAG:-latest}"
    # more config...

  scheduler:
    // highlight-next-line
    image: "registry.on-premise.solidtime.io/solidtime/solidtime:${SOLIDTIME_IMAGE_TAG:-latest}"
    # more config...

  queue:
    // highlight-next-line
    image: "registry.on-premise.solidtime.io/solidtime/solidtime:${SOLIDTIME_IMAGE_TAG:-latest}"
    # more config...
```

### 3. Restart the services

After changing the config we need to pull the new images and restart the services.

```bash
docker compose pull
docker compose up -d
```

### 4. Run database migrations

The On-Premise Business Features have additional database tables, so in order to apply the migrations, run the following command:

```bash
docker compose exec scheduler php artisan migrate --force
```

### 5. All done!

solidtime should now run with all additional features of the On-Premise Business plan. If you run into any issues, please contact us at [hello@solidtime.io](mailto:hello@solidtime.io).

## Questions?

If you have questions about the On-Premise Business plan or need help getting started, please:

- Visit our [pricing page](https://www.solidtime.io/pricing) for detailed information
- Contact us at [hello@solidtime.io](mailto:hello@solidtime.io?subject=On-Premise%20Business%20Inquiry)
- Join our [Discord server](https://discord.gg/Wd7pNH5S64) for community support
