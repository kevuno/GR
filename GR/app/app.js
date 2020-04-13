import Vue from "nativescript-vue";

// import VueDevtools from 'nativescript-vue-devtools'

// Vue.use(VueDevtools)

import RadDataForm from 'nativescript-ui-dataform/vue';
import routes from "./routes";
import BackendService from "./services/backend-service";

var frame = require('ui/frame');
var application = require('application');


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



if (application.android) {
    // application.android.on(application.AndroidApplication.activityBackPressedEvent, backEvent);
}

function backEvent(args) {
    console.log("Inside the backEvent handler");
    var currentPage = frame.topmost().currentPage;
    //console.log(currentPage);
    console.dir(currentPage);
    console.log("----------===---------")
    console.log(currentPage.exports);
    console.log("----------===---------")
    //console.log(page.hasListeners(application.AndroidApplication.activityBackPressedEvent))


//     if (currentPage && currentPage.exports && typeof currentPage.exports.backEvent === "function") {
//         console.log("Inside the backEvent handler if statement");
//         args.cancel = true;
//         page.notify({
//             eventName: application.AndroidApplication.activityBackPressedEvent,
//             object: page
//         });
//    }
}