# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

1. Create a new table in database called `CustomIds` which stores customIds for facility and agent with the following columns:
    - `id` - integer, primary key, auto-increment
    - `facilityId` - integer, foreign key to `Facilities.id`
    - `agentId` - integer, foreign key to `Agents.id`
    - `customId` - string, unique

2. Create a function named `getCustomIdByFacilityAndAgent` which takes a facilityId and agentId and returns the customId for that facility and agent. If no customId exists, return null.

3. After calling `getShiftsByFacility`, call `getCustomIdByFacilityAndAgent` for each shift and replace the agentId with the customId if it exists.

4. Call `generateReport` with the list of Shifts, which now have customIds instead of agentIds.