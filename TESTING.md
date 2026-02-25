# Testing Report

## 1. User Interface & Selector

- **Requirement: Drop-down with exactly 5 users.**
  - _Implementation:_ The `select-user` dropdown is dynamically populated by `populateUserSelector()` using the IDs returned by `getUserIds()` in `common.mjs`.
- **Requirement: No user selected on page load.**
  - _Implementation:_ The HTML includes a placeholder `<option>` with the `selected` attribute.
- **Requirement: Message displayed if no agenda.**
  - _Implementation:_ The `renderAgenda` function checks if the fetched array is empty and displays the content of `#agenda-msg` if no revisions exist. It remains hidden if no user is selected.

## 2. Form & Validation

- **Requirement: Form with topic name, date picker, and submit button.**
  - _Implementation:_ A semantic `<form>` is used in `index.html`.
- **Requirement: Date picker defaults to today’s date.**
  - _Implementation:_ The `dateToday()` function in `script.mjs` sets the `dateInput.value` using `new Date().toISOString().split("T")[0]` on page load and after every submission.
- **Requirement: Form validation (non-empty fields).**
  - _Implementation:_ Native HTML `required` attributes are used on all inputs, blocking submission via the browser's built-in validation.

## 3. Core Logic & Calculation

- **Requirement: Calculate 5 revision dates (1w, 1m, 3m, 6m, 1y).**
  - _Implementation:_ Handled by `calculateRevisionDates()` in `common.mjs`.
- **Requirement: Handling Daylight Savings Time (DST).**
  - _Implementation:_ The "Noon Trick" is used. All calculations start from a date string appended with `T12:00:00`. This ensures that 1-hour shifts during DST boundaries do not push a date into the previous or next calendar day.
- **Requirement: Relevant user data only.**
  - _Implementation:_ Data is saved using `addData(userId, data)`, where `userId` is pulled directly from the current value of the user selector.

## 4. Agenda Display Logic

- **Requirement: Chronological sorting.**
  - _Implementation:_ Inside `renderAgenda`, the data is sorted using `[...upcomingRevisions].sort((a, b) => a.date.localeCompare(b.date))`.
- **Requirement: Revision dates in the past should not be displayed.**
  - _Implementation:_ A `.filter()` method is applied to the data before rendering, comparing `item.date` against a current date string (`YYYY-MM-DD`).
- **Requirement: Immediate update after submission.**
  - _Implementation:_ The `renderAgenda` function is called at the end of the `submit` event listener to refresh the UI without a page reload.

## 5. Technical Requirements

- **Requirement: Unit test for at least one non-trivial function.**
  - _Implementation:_ `test/common.test.mjs` contains a test suite for `calculateRevisionDates`. It covers:
    - Standard date calculation.
    - Month-end rollover (Jan 31st).
    - Leap Year rollover (Feb 29th).
  - _Run tests:_ `npm test`.
- **Requirement: 100% Lighthouse Accessibility score.**
  - _Implementation:_ Confirmed 100/100 using Lighthouse Snapshot. High contrast dark mode, semantic labels, and `aria-live` regions for dynamic updates were implemented.
- **Requirement: Automatic Deployment.**
  - _Live URL:_ [https://janefrancessc.github.io/Piscine-Sprint-3-Project-Spaced-Repetition-Tracker/]

## 6. Manual Testing Verification

The following cases from the project brief were verified manually:

| Test Case  | Scenario                  | Expected Result                | Result   |
| :--------- | :------------------------ | :----------------------------- | :------- |
| **User 1** | Functions in JS (July 19) | 5 dates starting July 26       | **PASS** |
| **User 2** | Multiple Topics (Oct/Nov) | Interleaved chronological list | **PASS** |
| **User 3** | Topic from 1 month ago    | 4 dates shown (1-week hidden)  | **PASS** |
