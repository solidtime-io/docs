---
sidebar_position: 6
---

# API access

The solidtime API is a RESTful API that allows you to access and manipulate data in solidtime.
The API is designed to be easy to use and to provide all the functionality that is available in the solidtime web application.

## Creating an API Token

To access the API, you need an API token.
You can create an API token in the user settings.

1. Click on "Profile Settings" in the bottom left corner
2. Scroll down to the "Create API Token" section
3. Enter a name and click on "Create API Token"
4. The API token will be displayed in a popup. Copy the token and store it in a safe place.

:::warning
The API token is only displayed once. If you lose the token, you need to create a new one.
:::

## Using the API

The API token is a JWT token.
You need to add the token to the Authorization header of your HTTP requests with a `Bearer ` prefix.

**Example:**

```
Authorization: Bearer <api-token>
```

All API endpoints are documented in [the API reference](/api-reference).

