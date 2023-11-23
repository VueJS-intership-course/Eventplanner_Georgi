import moment from 'moment-timezone';
import tzlookup from 'tz-lookup';
import { authStore } from '@/store/auth/authStore.js'

export default {
  install: (app) => {
    app.config.globalProperties.$formatDateInTimeZone = (location, date) => {
      const store = authStore()

      if (store.currentUser && store.currentUser.timeZone) {
        const targetTime = moment.utc(date).tz(store.currentUser.timeZone).format('dddd, MMMM Do YYYY, h:mm:ss a');

        return targetTime
      }

      return moment.utc(date).local().format('dddd, MMMM Do YYYY, h:mm:ss a')
    };
  },
};