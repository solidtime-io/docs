---
sidebar_position: 6
---

# Container Mode

When self-hosting solidtime with [our Docker Images](https://hub.docker.com/r/solidtime/solidtime), you can choose between different container modes. The container mode defines which service is started in the container.

The mode can be defined by setting the `CONTAINER_MODE` environment variable on the docker service. The default mode is `http`.

## HTTP Server

`CONTAINER_MODE=http`

The HTTP server mode is the default mode. It starts the HTTP server for the solidtime application. The solidtime image uses Swoole as an HTTP server.

## Scheduler

`CONTAINER_MODE=scheduler`

The scheduler mode starts the Laravel scheduler. The scheduler is used to run scheduled tasks like sending reminders, similar to running cronjobs.

## Worker

`CONTAINER_MODE=worker`

The worker mode starts the Laravel Queue Worker. It is used to process asynchronous tasks like sending emails, when `QUEUE_CONNECTION` is set to `database`.
