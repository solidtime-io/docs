---
sidebar_position: 3
---

# Billable rates

Billable rates is a price per hour for time tracked in solidtime.

Billable rates can be set on multiple levels:
 1. **Project member** - for a specific user in a specific project
 2. **Project** - for all users in a specific project
 3. **Organization member** - for a specific user in the organization
 4. **Organization** - for all users

Setting the billable rate is optional on all levels.
The billable rate on a level overwrites the billable rate of the level above. (Level 1 overwrites level 2, level 2 overwrites level 3, etc.)

**Example 1:**

A user called Bob is a member of the organization and tracks 3 hours on a project called "Project A".

- Organization billable rate: 50€
- Project billable rate: 60€
- Bob's billable rate in "Project A": 70€

Bob's tracked time in "Project A" will be billed with 70€ per hour.

**Example 2:**

A user called Alice is a member of the organization and tracks 3 hours on a project called "Project B".

- Organization billable rate: 50€
- Alice's billable rate in the organization: 70€
- Project billable rate: 60€
- Alice's billable rate in "Project B": not set

Alice's tracked time in "Project B" will be billed with the projects billable rate 60€ per hour, since she does not have a billable rate set on her own in the project.

## How to set billable rates

In the following sections, you will learn how to set billable rates on different levels.
In general, the process is the same for all levels.
Before you update a billable rate, you will be asked to confirm that the new billable rate will be applied to all affected existing time entries.
If you cancel, the billable rate will not be saved.

When the billable rate is updated, only the time entries that use the specific billable rate will be updated. If a time entry has a billable rate set on a higher level, the time entry will not be updated.

**Example:**

Bob and Alice are members of the organization "Great company".
Bob tracks 3 hours on "Project A". The billable rate for Bob in "Project A" is 100€.
Alice tracks 4 hours without a project.

The administrator of the organization now sets the billable rate for the organization to 50€ and confirms the update.
This will update Alice's time entries to 50€ per hour, but Bob's time entries will stay at 100€ per hour, since the project billable rate has a higher priority.

:::note
If you want to preserve a billable rate for certain time entries, you can do so by setting a project billable rate and moving the time entries to that project.
:::

### Organization billable rate

1. Go to the Settings tab in the navigation on the left
2. Scroll down to the "Billable Rate" section and set the billable rate
3. When you click on "Save" a popup will appear asking you to confirm that the new billable rate will be applied to existing time entries

### Organization member billable rate

1. Go to the "Members" tab in the navigation on the left
2. Find the user you want to set the billable rate for and click on the three dots on the right side of the user
3. Click on "Edit"
4. Under "Billable" select "Custom rate" and set the billable rate
5. When you click "Update" a popup will appear asking you to confirm that the new billable rate will be applied to existing time entries.

### Project billable rate

1. Go to the "Projects" tab in the navigation on the left
2. Find the project you want to set the billable rate for and click on the three dots on the right side of the project
3. Click on "Edit"
4. Under "Billable Default" select "Custom rate" and set the billable rate
5. When you click "Update" a popup will appear asking you to confirm that the new billable rate will be applied to existing time entries.

It is also possible to set the billable rate when creating a new project.

### Project member billable rate

1. Go to the "Projects" tab in the navigation on the left
2. Click on the project you want to set the billable rate for to open the project
3. Under "Project members" find the user you want to set the billable rate for and click on the three dots on the right side of the user and click on "Edit"
4. Set the billable rate in the "Billable rate" field
5. When you click "Update project member" a popup will appear asking you to confirm that the new billable rate will be applied to existing time entries.

If the user is not a member of the project yet, you can add the user to the project with the "+ Add Member" button and set the billable rate at the same time.
