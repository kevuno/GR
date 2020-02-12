import Vue from "nativescript-vue";

// import VueDevtools from 'nativescript-vue-devtools'

// Vue.use(VueDevtools)

import RadDataForm from 'nativescript-ui-dataform/vue';
import routes from "./routes";
import BackendService from "./services/backend-service";


Vue.use(RadDataForm);
// Vue.config.silent = false;

// Init Backend Service and save to be used globablly (this should also init Firebase)
const backendService = new BackendService();
backendService.initFirebase();

Vue.prototype.$backendService = backendService;


// Start rendering
new Vue({
    
    render: h => h("frame", [h(backendService.isUserLoggedIn() ? routes.home : routes.login)])
    
}).$start();
