import moment from 'moment-timezone';
import tzlookup from 'tz-lookup';
import { authStore } from '@/store/auth/authStore.js'

// utc: 12:00:00
export default {
  install: (app) => {
    app.config.globalProperties.$formatDateInTimeZone = (location, date) => {
      const eventTimeZone = tzlookup(location[0], location[1])
      const store = authStore()

      if (store.currentUser && store.currentUser.timeZone) {
        const originalTime = moment.tz(`${date}`, eventTimeZone);
        const targetTime = originalTime.tz(store.currentUser.timeZone).format('dddd, MMMM Do YYYY, h:mm:ss a');

        return targetTime
      }

      // use .local() when default to users system local date
      return moment.utc(date).local().format('dddd, MMMM Do YYYY, h:mm:ss a')
    };
  },
};