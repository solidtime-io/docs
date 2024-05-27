---
sidebar_position: 4
---
# Testing that the self-hosting setup works

This guide will help you to test that the self-hosting setup works.

## Healthcheck endpoints

Solidtime has two healthcheck endpoints that you can use to check if the application is running correctly.

### /health-check/up

This endpoint returns a 200 status code if the web server in the solidtime container is running correctly.
It does not check if the database is running correctly or if any other services that solidtime depends on are running correctly.
This endpoint can be used to test if a container is ready.

**Example response:**

```json
{
  "success":true
}
```

### /health-check/debug

This endpoint returns information about how solditime receives the request and how the server is configured.
It can be used to debug problems with the server and reverse proxy configuration.

You should check for the following things:
 - `ip_address` should be the external IP address of the computer that made the request
 - `hostname` should be the hostname that the application runs on and the customer sees
 - `timestamp` should be the current unix timestamp
 - `date_time_utc` and `date_time_app` should be the same and the current UTC time
 - `timezone` should be `GMT` or `UTC`
 - `secure` should be `true`
 - `is_trusted_proxy` should be `true`

**Example response:**

```json
{
  "ip_address": "1.1.1.1",
  "hostname": "your-domain.com",
  "timestamp": 1716545410,
  "date_time_utc": "2024-05-24 10:10:10",
  "date_time_app": "2024-05-24 10:10:10",
  "timezone": "GMT",
  "secure": true,
  "is_trusted_proxy": true
}
```
