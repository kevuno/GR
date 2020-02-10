// Init Firebase
var firebase = require("nativescript-plugin-firebase");
firebase.init({
    
}).then(
    function () {
      console.log("firebase.init done");
    },
    function (error) {
      console.log("firebase.init error: " + error);
    }
);

export default class BackendService {

    isLoggedIn() {
        return false;
    }

    login(user) {
        // TODO
        // return Kinvey.User.login(user.email, user.password);
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
