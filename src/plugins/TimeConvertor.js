import moment from 'moment-timezone';
import tzlookup from 'tz-lookup';
import { authStore } from '../store/auth/authStore.js'

export default {
  install: (app) => {
    app.config.globalProperties.$formatDateInTimeZone = (location, date, time) => {

      const eventTimeZone = tzlookup(location[0], location[1])
      const originalTime = moment.tz(`${date} ${time}`, eventTimeZone);

      const store = authStore()

      if (store.currentUser) {
        const targetTime = originalTime.tz(store.currentUser.timeZone).format();

        return targetTime
      }

      return `${date} / ${time}`
    };
  },
};