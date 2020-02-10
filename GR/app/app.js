import Vue from "nativescript-vue";

// import VueDevtools from 'nativescript-vue-devtools'

// Vue.use(VueDevtools)

import RadDataForm from 'nativescript-ui-dataform/vue';
import routes from "./routes";
import BackendService from "./services/backend-service";

Vue.use(RadDataForm);

// Init  Backend Service and save to be used globablly
const backendService = new BackendService();
Vue.prototype.$backendService = backendService;


// Start rendering
new Vue({
    render: h => h(backendService.isLoggedIn() ? routes.home : routes.login)
}).$start();

