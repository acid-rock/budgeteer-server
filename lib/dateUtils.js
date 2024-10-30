const { DateTime } = require("luxon");

const getUTCDayRange = (timezone) => {
  const start = DateTime.now()
    .setZone(timezone)
    .startOf("day")
    .toUTC()
    .toFormat("yyyy-MM-dd'T'HH:mm");

  const end = DateTime.now()
    .setZone(timezone)
    .endOf("day")
    .toUTC()
    .toFormat("yyyy-MM-dd'T'HH:mm");

  return { start: start, end: end };
};

const getUTCWeekRange = (timezone) => {
  const start = DateTime.now()
    .setZone(timezone)
    .startOf("week")
    .toUTC()
    .toFormat("yyyy-MM-dd'T'HH:mm");

  const end = DateTime.now()
    .setZone(timezone)
    .endOf("week")
    .toUTC()
    .toFormat("yyyy-MM-dd'T'HH:mm");

  return { start: start, end: end };
};

const getUTCMonthRange = (timezone) => {
  const start = DateTime.now()
    .setZone(timezone)
    .startOf("month")
    .toUTC()
    .toFormat("yyyy-MM-dd'T'HH:mm");

  const end = DateTime.now()
    .setZone(timezone)
    .endOf("month")
    .toUTC()
    .toFormat("yyyy-MM-dd'T'HH:mm");

  return { start: start, end: end };
};

const getUTCYearRange = (timezone) => {
  const start = DateTime.now()
    .setZone(timezone)
    .startOf("year")
    .toUTC()
    .toFormat("yyyy-MM-dd'T'HH:mm");

  const end = DateTime.now()
    .setZone(timezone)
    .endOf("year")
    .toUTC()
    .toFormat("yyyy-MM-dd'T'HH:mm");

  return { start: start, end: end };
};

module.exports = {
  getUTCDayRange,
  getUTCWeekRange,
  getUTCMonthRange,
  getUTCYearRange,
};
