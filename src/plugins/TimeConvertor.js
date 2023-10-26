import moment from  'moment-timezone';

export default {
  install(app, options) {
    app.$formatDateInTimeZone = (date, timezone) => {
      return moment().tz(timezone).format(date);
    };
  },
};