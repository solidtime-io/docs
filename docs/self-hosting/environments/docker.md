---
sidebar_position: 1
---
# Docker

This guide will help you to deploy solidtime using Docker and Docker Compose.
We have a repository with some example configurations for Docker Compose. You can find it [here](https://github.com/solidtime-io/self-hosting-examples).
The guide will reference this repository.

## Prerequisites

- [Docker](https://docs.docker.com/engine/install/)

## Preparation

Before you start you need to ask yourself a few questions:

**Do I have a database?**

Some people might already have a managed Postgres database that they want to use for solidtime.
If you don't have a database yet, you can look at the example with a Postgres container in the repository.
Self-hosting a database is a whole other topic and we won't cover it in this guide.
If you plan to use solidtime a production environment and you don't have experience managing a database server, we recommend using a managed database service.
If you plan on using one database server for multiple applications, you should consider using a separate database for each application with different credentials that only have access to one of the databases.

**What do I want to use to send the email that solidtime is sending?**

Solidtime sends emails for notifications and password resets. You need to configure an SMTP server to send these emails.
If you don't have your own SMTP server, which is probably the case for most people, you can use a transactional email service.


**What do you want to run before the solidtime containers?**

The solidtime docker image contains a webserver, but the image is not meant to handle things like SSL certificates, etc.
The image is designed to be run behind a reverse proxy like Nginx or Traefik.
If you don't have a reverse proxy yet, you can use the example with Traefik in the repository.

## Installation

### Choose the example that fits your needs the best

The repository contains multiple examples for different setups. You can choose the one that fits your needs the best.

 - 0-docker-traefik-with-database

Read the instructions in the README of the example you chose.

### The environment files

The docker setup has two configuration files for the environment variables.
The `laravel.env` file contains the environment variables for the solidtime application and the `.env` file contains the environment variables for the docker compose config file.
The examples all contain template files that you can copy and adjust to your needs.

 - `.env.example` --> `.env`
 - `laravel.env.example` --> `laravel.env`

You need to adjust the environment variables in the `.env` and `laravel.env` files to your needs.
You can find for information about the environment variables in the [configuration documentation](./configuration).

### Generate the application keys

You need to generate the application keys for your solidtime installation. You can do this by running the following command:

```bash
docker compose run scheduler php artisan self-host:generate-keys
```

This command will output random values for the `APP_KEY`, `PASSPORT_PRIVATE_KEY`, and `PASSPORT_PUBLIC_KEY` environment variables.
You can copy these values and add them to the `laravel.env` file.

### Start the containers

After you have set up the environment files and generated the application keys, you can start the containers.

```bash
docker compose up -d
```

You can view the logs of the containers with the following command:

```bash
docker compose logs -f
```

### Migrate database

To create the database tables, you need to run the migrations. You can do this by running the following command:

```bash
docker compose exec scheduler php artisan migrate --force
```

You also need to do this after every update of the solidtime application.
If you have a simple setup with only one container, you can also configure the container to run the migrations on startup.
To do this you can set the environment variable `AUTO_DB_MIGRATE` to `true` in the `docker-compose.yml` file.

```yaml
  app:
    # ...
    environment:
      CONTAINER_MODE: http
      AUTO_DB_MIGRATE: "true" # <--- Add this line
```

### Access the application

You can now access the application in your browser. The URL depends on your setup.

### Testing the setup

You can find information about how to test the setup in the [testing documentation](./testing).

## Update

To update solidtime, you can pull the latest image from the Docker registry.

1. Change the tag of the image in the `docker-compose.yml` file to the new version. If you are using the `latest` tag, you don't need to change anything.
2. Pull the new image:

```bash
docker compose pull
```
3. Recreate the containers:

```bash
docker compose up -d
```

4. If you don't use the auto migration config, you need to run the migrations:

```bash
docker compose exec scheduler php artisan migrate --force
```

5. Remove the old images. Docker images can use a lot of space and vServers often don't have a ton of storage. You can do this with the following command:

```bash
docker system prune -a -f
```
