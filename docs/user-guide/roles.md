---
sidebar_position: 2
---

# Roles

In organizations with multiple users it is important to have different roles to manage the access and permissions of the users.
The following roles are available in solidtime:

## Owner

The owner has full access of the organization.
The owner is the only role that can:
 - delete the organization
 - transfer the ownership to another user
 - solidtime cloud: access to the billing settings

## Admin

The admin has full access to the organization, except for the stuff that only the owner can do.

## Manager

The manager has full access to projects, clients, tags, time entries, and reports, but can not manage the organization or the users.

## Employee

An employee is a user that is only using the application to track time, but has no administrative rights.

## Placeholder

Placeholder users are special users that can not do anything in the organization.
If you use solidtime cloud, those users are not billed.
Placeholder users are used for imports and to remove users from the organization without deleting their time entries.

**Import**

If you are importing data from another time tracking tool, the importer, depending on the data, needs to create users in the organization.
Since you might want to invite users to solidtime one by one, the importer only creates placeholder users, that will be used for their time entries.

**Remove users**

Note: This feature will be available soon

If you want to remove a user from the organization, but you don't want to delete their time entries, you can remove the user from the organization and the user will be converted to a placeholder user.

### Invite placeholder users to become real users

If you want to invite a placeholder user to become a real user in the organization, you can do this by following these steps:

1. Go to the "Members" tab in the navigation on the left
2. Find the placeholder user you want to invite and click on the "Invite" button on the right side of the user
