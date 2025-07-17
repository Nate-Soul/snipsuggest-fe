import type { PluginOptions } from "vue-toastification";
import Toast, { POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";

export default defineNuxtPlugin((nuxtApp) => {
    const options: PluginOptions = {
        timeout: 2000,
        position: POSITION.TOP_RIGHT
    };
    nuxtApp.vueApp.use(Toast, options);
})
