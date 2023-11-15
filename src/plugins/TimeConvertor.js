import moment from 'moment-timezone';
import tzlookup from 'tz-lookup';
import { authStore } from '@/store/auth/authStore.js'

export default {
  install: (app) => {
    app.config.globalProperties.$formatDateInTimeZone = (location, date) => {
      const originalTime = moment.utc(date);

      const store = authStore();

      if (store.currentUser && store.currentUser.timeZone) {
        const targetTime = originalTime.tz(store.currentUser.timeZone).format('dddd, MMMM Do YYYY, h:mm:ss a');
        return targetTime;
      }

      return originalTime.format('dddd, MMMM Do YYYY, h:mm:ss a');
    };
  },
};