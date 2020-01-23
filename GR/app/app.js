import Vue from "nativescript-vue";

import App from "./components/App";

// import VueDevtools from 'nativescript-vue-devtools'

// Vue.use(VueDevtools)

new Vue({
    render: h => h(App)
}).$start();

