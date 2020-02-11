// Init Firebase
var firebase = require("nativescript-plugin-firebase");

export default class BackendService {

    constructor(){
      this.is_user_logged_in = false;
      this.initFirebase();
    }


    initFirebase(){
        firebase.init({
            onAuthStateChanged: function(data) { // optional but useful to immediately re-logon the user when they re-visit your app
                if (data.loggedIn) {
                    this.is_user_logged_in = true;
                    console.log("Logged in to firebase!. User's email address: " + (data.user.email ? data.user.email : "N/A"));
                }else{
                  this.is_user_logged_in = false;
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

    isLoggedIn() {
        return this.is_user_logged_in;
    }

    async login(email, password) {
        // TODO
        // return Kinvey.User.login(user.email, user.password);
        try {
            const result = await firebase.login({
                type: firebase.LoginType.PASSWORD,
                passwordOptions: {
                  email: email,
                  password: password
                }
            });
            console.log(result);
            return result;
        }
        catch (error) {
            throw error;
        }
    }

    logout() {
        // TODO
        // return Kinvey.User.logout();
    }

    register(user) {
        // TODO
        // return Kinvey.User.signup({ username: user.email, password: user.password });
    }
}
