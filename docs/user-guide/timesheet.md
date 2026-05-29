---
sidebar_position: 3
---

# Timesheet

The timesheet is a weekly grid for entering and reviewing tracked time at a glance — one row per project (or project + task), one column per day, with each cell showing the total time tracked. It's a different view of the time entries you also see in the Time Tracker; changes in one appear in the other.

Open it from **Timesheet** in the left sidebar. The page lands on the current week — starting on the day configured in your profile preferences (Monday by default).

<img class="theme-image-light" src="/img/timesheet/timesheet-overview-light.png" alt="The timesheet showing a week with several projects and tasks" />
<img class="theme-image-dark" src="/img/timesheet/timesheet-overview-dark.png" alt="The timesheet showing a week with several projects and tasks" />

## Entering time

Each row in the grid represents a unique combination of **project**, **task**, **billable status**, and **tags**. Each cell holds the total time tracked on that combination on a single day; if multiple entries match the same row identity on the same day, they are summed into one cell.

<img class="theme-image-light" src="/img/timesheet/timesheet-cell-editing-light.png" alt="A timesheet cell focused for editing, with its current value selected" />
<img class="theme-image-dark" src="/img/timesheet/timesheet-cell-editing-dark.png" alt="A timesheet cell focused for editing, with its current value selected" />

Click a cell and type a duration — `2`, `2.5`, `2h`, `2h 30min`, `1:30`, and `90min` all work. Press <kbd>Enter</kbd> (or click outside the cell) to save, or <kbd>Escape</kbd> to cancel without sending anything to the server. The saved value is shown back to you in the duration format configured in your organization's settings.

In all cases, the timesheet places entries in free time within the same day. If the value can't fit before midnight, the edit is refused rather than silently truncated. What it does to the underlying time entries depends on the cell's previous state:

<details>
<summary><b>Creating an entry</b> — typing into an empty cell</summary>

A new entry is created at **9:00 AM local time** if that slot is free, otherwise in the **earliest free window** of the day large enough to hold the duration. The scan respects running timers and entries that spill over from neighbouring days.

</details>

<details>
<summary><b>Extending an entry</b> — increasing a cell value</summary>

The entry with the **latest end time** is extended forward, up to the next obstacle or the end of the day. Any leftover duration is placed as a new entry in the next free window after it. If neither the extension nor the remainder fits, the edit is rejected and nothing changes. Only the entry's `end` changes; running timers are never extended.

</details>

<details>
<summary><b>Shrinking an entry</b> — decreasing a cell value</summary>

The cell's entries are walked in **reverse start order** (latest-starting first): each one is either deleted whole (if shorter than the amount you removed) or has its `end` moved earlier. Running timers are skipped.

</details>

<details>
<summary><b>Clearing a cell</b> — setting it to <code>0</code> or empty</summary>

Every entry in the cell is deleted in a single request, with no confirmation dialog. Only entries on that day with that row identity are affected.

</details>

:::note Running timers
If a timer is currently running in the Time Tracker, its matching cell in the timesheet is disabled — hovering it shows _Stop the running time entry to edit the timesheet_. Stop the timer to make the cell editable again. This prevents accidentally changing the duration of a live entry.
:::

## Adding a row

If the project or task you want to log time on isn't shown yet, click **Add row** at the bottom of the grid and pick a project (and optionally a task). You can search by typing, and create a new project inline if you have permission.

<img class="theme-image-light" src="/img/timesheet/timesheet-add-row-light.png" alt="The Add row dropdown showing the project and task picker" />
<img class="theme-image-dark" src="/img/timesheet/timesheet-add-row-dark.png" alt="The Add row dropdown showing the project and task picker" />

A newly added empty row stays in the grid until you enter time on it or remove it.

## Copy last week

The **Copy last week** dropdown helps you set up a new week quickly when your work pattern repeats:

<img class="theme-image-light" src="/img/timesheet/timesheet-copy-last-week-light.png" alt="The Copy last week dropdown with its two options" />
<img class="theme-image-dark" src="/img/timesheet/timesheet-copy-last-week-dark.png" alt="The Copy last week dropdown with its two options" />

- **Copy rows only** — adds the project/task rows from the previous week to the current week, **without** any hours. Useful for prefilling the structure of the week, then filling in actual hours as you go.
- **Copy rows and time entries** — adds the rows and recreates the hours from last week on the matching days. Each copied cell creates new time entries on the current week.

Rows that already exist on the current week aren't duplicated.

## Changing a row

You can change a row's identity from its left-hand side:

- Click the project name to switch to another project or task.
- Toggle the billable indicator to mark the row billable or non-billable.
- Click the tag selector to add or remove tags.

The change updates **every time entry currently in the row** in one go. The row keeps its position in the grid while the change saves.

## Removing a row

Hover over a row to reveal the **×** button on the right.

- If the row has no entries, it's removed immediately.
- If the row has entries, a confirmation dialog appears. Confirming deletes the row **and every entry on the visible week** — entries for the same project on other weeks are untouched.

## Permissions

The timesheet uses the same permissions as time entries in general:

| Role        | Can use the timesheet for own time | Can use the timesheet for other members |
| ----------- | :--------------------------------: | :-------------------------------------: |
| Owner       | ✔                                  | ✔                                       |
| Admin       | ✔                                  | ✔                                       |
| Manager     | ✔                                  | ✔                                       |
| Employee    | ✔                                  | ✖                                       |
| Placeholder | ✖                                  | ✖                                       |

See [Roles](./roles.md) for a full overview of role-based permissions.
