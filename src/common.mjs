export function getUserIds() {
  return ["1", "2", "3", "4", "5"];
}

/**
 * Calculates revision date intervals from a given state date
 * Intervals: 1 week, 1 month, 3 months, 6 months, 1 year.
 * @param {string} startDate - This is the HTML date picker (YYYY-MM-DD)
 * @returns {string[]} - Returns a string Array of dates in "YYYY-MM-DD" format.
 */

export function calculateRevisionDates(startDate) {
  const baseDate = new Date(`${startDate}T12:00:00`);

  const oneWeek = addDaysUTC(baseDate, 7);
  const oneMonth = addMonthsUTC(baseDate, 1);
  const threeMonths = addMonthsUTC(baseDate, 3);
  const sixMonths = addMonthsUTC(baseDate, 6);
  const oneYear = addYearsUTC(baseDate, 1);

  return [oneWeek, oneMonth, threeMonths, sixMonths, oneYear].map((d) =>
    d.toISOString().slice(0, 10),
  );
}
// Helper functions to get days, months, year
function addDaysUTC(date, days) {
  const d = new Date(date);
  d.setUTCDate(d.getUTCDate() + days);
  return d;
}

function addMonthsUTC(date, months) {
  const d = new Date(date);
  d.setUTCMonth(d.getUTCMonth() + months);
  return d;
}

function addYearsUTC(date, years) {
  const d = new Date(date);
  d.setUTCFullYear(d.getUTCFullYear() + years);
  return d;
}
