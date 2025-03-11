---
sidebar_position: 4
---

# Import

To make migrating to solidtime as easy as possible, we provide a way to import your existing data into solidtime.

Currently, we support importing data from the following sources:
 - [Toggl](https://toggl.com/)
 - [Clockify](https://clockify.me/)
 - [Harvest](https://www.getharvest.com/)
 - solidtime
 - [Generic CSV Import](#generic-csv-import)

More import sources will be added in the future.
If you are using a different time tracking tool and would like to import your data into solidtime, please [contact us](mailto:hello@solidtime.io) or [create a GitHub issue](https://github.com/solidtime-io/solidtime/issues/new).

## How to import data

To import data into solidtime, follow these steps:

1. Select the organization you want to import the data to in the left top corner
2. Click on "Import" in the left navigation under "Admin" (You need to be Admin or Owner of the organization to see this)
3. Select the import that you want to use
4. After selecting the import an instruction will be shown on how to export the data from the source tool
5. Follow the instruction and upload the exported file in the upload area below the instructions
6. Click on "Import Data"

Depending on the amount of data that you are importing, the import can take a few minutes.
After the import is finished, a modal will be shown with the result of the import.

**Why are there multiple import types for the same data source? (f.e. Toggl Time Entries & Toggl Data Importer)**

Many time tracking tools don't provide one export file that contains all the data.
Therefore, we provide multiple import types for the same data source, so you can import the data in multiple steps.
To get the most accurate data, the order of the imports is important.
For example, when importing Toggl data, you should first use the "Toggl Data Importer" and then the "Toggl Time Entries" import.

The correct order of the imports is shown in the instructions after selecting the import. Please read those instructions carefully, before importing data.

## Generic CSV Import

solidtime offers to import from common other time tracking tools, but you might want to migrate from a different tool or a custom solution like an Excel sheet.
In that case the generic CSV import might help you achieve that.
To use this import method you need to convert your data into CSVs with a data structure like the one defined in the following sections.
Since the time entries importer can indirectly also import projects it is better to first import the projects and then the time entries.
This way you can import more information about the project then just the name.
All generic import CSVs need to be comma-seperated and in UTF-8. If necessary the values can be enclosed in `"`.


### Generic projects importer


| Column           | Description                                                                                     | Data type                                                                 |
|------------------|-------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------|
| name             | Name of the project                                                                             | Text (f.e. `Big project 2030`)                                            |
| color            | Color of the project. If empty a random color that matches the style of solidtime will be used. | Color in Hex (f.e. `#ef5350`)                                             |
| billable_rate    | Billable rate for this project (in Cents)                                                       | Number (f.e. `20000`)                                                     |
| is_public        | Whether the project is public                                                                   | `true` or `false`                                                         |
| client           | The name of the client of the project. If empty the project doesn't have a client               | Text (f.e. `Big ACME company`)                                            |
| billable_default | Whether the time entries should be billable per default                                         | `true` or `false`                                                         |
| estimated_time   | Estimated time the project takes (in seconds)                                                   | Number (f.e. `3600`)                                                      |
| archived_at      | When the project was archived. If empty the project is not archived                             | ISO 8601 format, Timezone is always UTC (example: `2021-01-01T12:00:00Z`) |

### Generic time entries importer


| Column      | Description                        | Data type                                                                              |
|-------------|------------------------------------|----------------------------------------------------------------------------------------|
| description | Name of the project                | Text (f.e. `Video conference about XY`)                                                |
| billable    | Whether the time entry is billable | `true` or `false`                                                                      |
| client      | Name of the client                 | Text (f.e. `Big company`)                                                              |
| project     | Name of the project                | Text (f.e. `Big project 2030`)                                                         |
| tags        | List of tags                       | Comma-seperated list (f.e. `Project managment,Meeting`)                                |
| start       | Start timestamp                    | Date time in ISO 8601 format, Timezone is always UTC (example: `2021-01-01T12:00:00Z`) |
| end         | End timestamp                      | Date time in ISO 8601 format, Timezone is always UTC (example: `2021-01-01T12:10:01Z`) |
| task        | Name of the task                   | Text (f.e. `Feature YX`)                                                               |
| user_name   | Name of the user                   | Text (f.e. `Peter Tester`)                                                             |
| user_email  | Email of the user                  | Email (f.e. `peter.tester@big-agency.test`)                                            |
