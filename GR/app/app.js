import Vue from "nativescript-vue";

import App from "./components/App";

// import VueDevtools from 'nativescript-vue-devtools'

// Vue.use(VueDevtools)

import RadDataForm from 'nativescript-ui-dataform/vue';

Vue.use(RadDataForm);

new Vue({
    render: h => h(App)
}).$start();

