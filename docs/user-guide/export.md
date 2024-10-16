---
sidebar_position: 6
---

# Export

To make sure that you can always access your data, we provide a way to export your data from solidtime.
The export can also be useful to migrate from a self-hosted solidtime instance to the cloud version or to another self-hosted instance.

## Exporting an organization

1. Choose the organization you want to export in dropdown in the left top corner
2. Click on "Export" in the left navigation under "Admin" (You need to be Admin or Owner of the organization to see this)
3. Click on "Export" and save the ZIP file

The ZIP file contains the following data:
 - Clients
 - Members
 - Organization invitations
 - Organization settings
 - Projects (incl. members)
 - Tags
 - Tasks
 - Time entries

### Technical details

The export is a ZIP file that contains a CSV file for each entity. It also contains a `meta.json` file that contains the metadata of the export.

The CSV files are:
 - `clients.csv`
 - `members.csv`
 - `organization_invitations.csv`
 - `organizations.csv`
 - `project_members.csv`
 - `projects.csv`
 - `tags.csv`
 - `tasks.csv`
 - `time_entries.csv`

The CSV files are named after the entity in the database. The columns in the CSV files are named after the attributes of the entity.

The CSV files are UTF-8 encoded, have a header row, and are separated by a comma (`,`). If necessary the values are enclosed by double quotes (`"`).

More information about how data types are exported:

 - Boolean: `true` or `false`
 - Date time: ISO 8601 format, Timezone is always UTC (example: `2021-01-01T12:00:00Z`)
 - IDs: UUID version 4 (example: `ebf1384d-6dc7-4f93-872d-2f53dd481d30`)
 - Null values: Empty string (`""`)
 - Money values: Integer value in cents (example: `1000` for `10.00`)

The `meta.json` file contains the following data:

 - `id`: The ID of the export
 - `version`: The version of the export format
 - `organizations`: An array of organization keys that are exported
 - `exported_at`: The timestamp when the export was created in ISO 8601 format (example: `2021-01-01T12:00:00Z`)

