import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const showNotification = (msg) => {
  toast(msg, {
    autoClose: 1000,
  });
};

export default showNotification;