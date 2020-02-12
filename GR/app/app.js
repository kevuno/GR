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
backendService.initFirebase(onAuthStateChanged);

Vue.prototype.$backendService = backendService;


// Start rendering
new Vue({
    
    render: h => h("frame", [h(backendService.isLoggedIn() ? routes.home : routes.login)])
    
}).$start();

function onAuthStateChanged(data) { // optional but useful to immediately re-logon the user when they re-visit your app
    console.log("\n\n\n\nWAKJNKJKJNDKJNKDJNSKJNFKDJFNDKFJNSDKFJNSDKFJNSDKF");
    if (data.loggedIn) {
        this.is_user_logged_in = true;
        console.log("Logged in to firebase!. User's email address: " + (data.user.email ? data.user.email : "N/A"));
        console.log("Navigating...");
        Vue.prototype.$navigateTo(routes.home);


    }else{
      this.is_user_logged_in = false;
      console.log("Logged out from Firebase")
    }
}
