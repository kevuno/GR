// Init Firebase
var firebase = require("nativescript-plugin-firebase");
import * as ApplicationSettings from "application-settings";


export default class BackendService {

    constructor(){
      this.is_user_logged_in = false;
      this.prevent_back_navigation = false;
    }


    async initFirebase(){
        var class_ref = this;
        firebase.init({
          onAuthStateChanged: function(data) { // optional but useful to immediately re-logon the user when they re-visit your app
              if (data.loggedIn) {
                  class_ref.is_user_logged_in = true;
                  ApplicationSettings.setBoolean("is_user_logged_in", true);
                  console.log("Logged in to firebase!. User's email address: " + (data.user.email ? data.user.email : "N/A"));
              }else{
                class_ref.is_user_logged_in = false;
                ApplicationSettings.setBoolean("is_user_logged_in", false);
                console.log("Logged out from Firebase")
              }
          }
        }).then(
            function () {
              console.log("firebase.init done");
            },
            function (error) {
              console.log("firebase.init error: " + error);
            }
        );
    }

    setUserLoggedIn(){
        this.is_user_logged_in = true;
    }

    isUserLoggedIn() {
        let logged_in_local = ApplicationSettings.getBoolean("is_user_logged_in");
        console.log("Local logged in:" + logged_in_local);
        console.log("Class logged in:" + this.is_user_logged_in);
        return this.is_user_logged_in || logged_in_local;
    }

    async login(email, password) {
        try {
            const result = await firebase.login({
                type: firebase.LoginType.PASSWORD,
                passwordOptions: {
                  email: email,
                  password: password
                }
            });
            this.is_user_logged_in = true;
            console.log(result);
            return result;
        }
        catch (error) {
            throw error;
        }
    }

    async logout() {
        try {
            const result = await firebase.logout();
            this.is_user_logged_in = false;
            return result;
        }
        catch (error) {
            throw error;
        }
    }

    setPreventBackNavigation(boolValue){
        console.log("Setting value of prevention is: " + boolValue);
        this.prevent_back_navigation = boolValue;
    }

    getPreventBackNavigation(){
        console.log("Getting value of prevention is: " + this.prevent_back_navigation);
        return this.prevent_back_navigation;
    }
}
