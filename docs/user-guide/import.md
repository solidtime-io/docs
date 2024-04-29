---
sidebar_position: 5
---

# Import

To make migrating to solidtime as easy as possible, we provide a way to import your existing data into solidtime.

Currently, we support importing data from the following sources:
 - [Toggl](https://toggl.com/)
 - [Clockify](https://clockify.me/)

More import sources will be added in the future.
If you are using a different time tracking tool and would like to import your data into solidtime, please [contact us](mailto:hello@solidtime.io) or [create a GitHub issue](https://github.com/solidtime-io/solidtime/issues/new).

## How to import data

1. In the left top corner click on the name of your organization and in the dropdown click on "Organization Settings"
2. Scroll down to the "Import Data" section
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
