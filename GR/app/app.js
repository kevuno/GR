import Vue from "nativescript-vue";

import App from "./components/App";

// import VueDevtools from 'nativescript-vue-devtools'

// Vue.use(VueDevtools)

import RadDataForm from 'nativescript-ui-dataform/vue';

Vue.use(RadDataForm);

var firebase = require("nativescript-plugin-firebase");

firebase.init({
    // Optionally pass in properties for database, authentication and cloud messaging,
    // see their respective docs.
    persist: true
}).then(
    function () {
      console.log("firebase.init done");
    },
    function (error) {
      console.log("firebase.init error: " + error);
    }
);

new Vue({
    render: h => h(App)
}).$start();

