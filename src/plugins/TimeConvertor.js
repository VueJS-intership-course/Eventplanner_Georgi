import moment from 'moment-timezone';
import tzlookup from 'tz-lookup';
import { authStore } from '../store/auth/authStore.js'

export default {
  install: (app) => {
    app.config.globalProperties.$formatDateInTimeZone = (location, date) => {
      const eventTimeZone = tzlookup(location[0], location[1])
      const originalTime = moment.tz(`${date}`, eventTimeZone);

      const store = authStore()

      if (store.currentUser && store.currentUser.timeZone) {
        const targetTime = originalTime.tz(store.currentUser.timeZone).format();

        return targetTime
      }

      return moment.utc(date).format('dddd, MMMM Do YYYY, h:mm:ss a')
    };
  },
};