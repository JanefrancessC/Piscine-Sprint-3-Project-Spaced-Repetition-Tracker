import { calculateRevisionDates, getUserIds } from "../src/common.mjs";
import assert from "node:assert";
import test from "node:test";

test("User count is correct", () => {
  assert.equal(getUserIds().length, 5);
});

test("Dates returned are accurate", () => {
  const startDate = "2025-07-19";

  const expected = [
    "2025-07-26",
    "2025-08-19",
    "2025-10-19",
    "2026-01-19",
    "2026-07-19",
  ];

  const result = calculateRevisionDates(startDate);

  assert.deepStrictEqual(expected, result);
});

test("Handles end of month correctly", () => {
  const startDate = "2025-01-31";

  const expected = [
    "2025-02-07",
    "2025-03-03",
    "2025-05-01",
    "2025-07-31",
    "2026-01-31",
  ];
  const result = calculateRevisionDates(startDate);
  assert.deepStrictEqual(expected, result);
});

test("Test handles leap year accurately", () => {
  const startDate = "2024-02-29";

  const expected = [
    "2024-03-07",
    "2024-03-29",
    "2024-05-29",
    "2024-08-29",
    "2025-03-01",
  ];
  const result = calculateRevisionDates(startDate);
  assert.deepStrictEqual(expected, result);
});
