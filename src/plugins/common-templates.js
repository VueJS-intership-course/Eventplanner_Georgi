import TheModal from '@/common-templates/TheModal.vue';
import BasicInput from '@/common-templates/BasicInput.vue'
import ErrorModal from '@/common-templates/ErrorModal.vue';

export default {
    install(app, options) {
        app.component('TheModal', TheModal);
        app.component('ErrorModal', ErrorModal);
        app.component('BasicInput', BasicInput)
    }
}