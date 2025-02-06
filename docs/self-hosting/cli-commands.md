---
sidebar_position: 6
---

# CLI Commands

The solidtime CLI provides a set of commands to manage your self-hosted solidtime instance.

## `artisan admin:user:create [name] [email]`

This command creates a new user in the solidtime application. Per default this command does not send out any emails.

### Options

| Name                 | Default | Description                                                                                                 |
|----------------------|---------|-------------------------------------------------------------------------------------------------------------|
| `--ask-for-password` |         | Ask for the password of the user. If this option is missing a random password will be generated and output. |
| `--verify-email`     |         | Manually mark the email of the newly created user verified.                                                 |

## `artisan admin:user:verify [email]`

This command verifies the email address of a user.
