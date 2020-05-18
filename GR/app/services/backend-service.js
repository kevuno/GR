// Init Firebase
var firebase = require("nativescript-plugin-firebase");
import * as ApplicationSettings from "application-settings";


export default class BackendService {

    constructor(){
        this.is_user_logged_in = false;
        this.prevent_back_navigation = false;
        this.firebase_listeners = [];
        this.MAX_RELOAD_TRIES = 10;
        this.data_listeners = {
            tanques: null,
            precios_estados: null,
            fixed_prices: null
        };
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

    /** ======= Data Readers (TODO turn into Listeners) ========= */
    /** (Right now data is only loaded once and it doesn't update the other apps unless it hard reloads)  */

    async readTanques(reload_tries=0){
        console.log("Reading tanques from DB");
        return new Promise((resolve, reject) => {
            firebase.getValue('/tanques')
                .then(result => {
                    // Save each tanque obj into the array of tanques
                    var tanques_result = [];
                    let tanques_list_obj = result.value;
                    for(var tanque_key in tanques_list_obj) {
                        if(tanques_list_obj.hasOwnProperty(tanque_key)) {
                            // Save tanque obj into Vue list of tanques
                            let tanque_obj = tanques_list_obj[tanque_key];
                            tanque_obj.id = tanque_key; // Add ID property for easy queryings
                            tanques_result.push(tanque_obj);
                        }
                    }

                    // DONE resolve/return final list of tanques
                    resolve(tanques_result.sort(BackendService.compareTanqueByName));
                })
                .catch(error => {
                    console.log("Error loading tanques: " + error);
                    this.firebaseErrorRetryHandling(this.readTanques, reload_tries)
                        .then(result => resolve(result)) // Pass the result to parent call
                        .catch(error => reject(error)); // Pass the error to parent call
                    
                });
        })
        
    }

    async readPreciosEstados(reload_tries=0){
        // Get list of precies from each estado
        console.log("Reading estados from DB");
        return new Promise((resolve, reject) => {
            firebase.getValue('/estados')
            .then(result => {
                // DONE resolve/return final array of estados
                resolve(result.value);
                
            })
            .catch(error => {
                console.log("Error loading precios estados: " + error);
                this.firebaseErrorRetryHandling(this.readPreciosEstados, reload_tries)
                    .then(result => resolve(result)) // Pass the result to parent call
                    .catch(error => reject(error)); // Pass the error to parent call
                
            });
        });
    }

    async readFixedCosts(reload_tries=0){
        console.log("Reading fixed_costs from DB");
        return new Promise((resolve, reject) => {
            firebase.getValue('/precios_fijos')
            .then(result => {
                // DONE resolve/return value of the fixed costs object
                resolve(result.value);
                
            })
            .catch(error => {
                console.log("Error loading fixed costs: " + error);
                this.firebaseErrorRetryHandling(this.readFixedCosts, reload_tries)
                    .then(result => resolve(result)) // Pass the result to parent call
                    .catch(error => reject(error)); // Pass the error to parent call
                
            });
        });
    }

    async firebaseErrorRetryHandling(reload_function_async, reload_tries){
        return new Promise((resolve, reject) => {
        
            if(reload_tries < this.MAX_RELOAD_TRIES){
                console.log(`Retrying...(${reload_tries})`);
                setTimeout(() => {
                    // Recurse after waiting 1 second and try again
                    reload_function_async(reload_tries + 1)
                        .then(result => resolve(result)) // Pass the result to parent call
                        .catch(error => reject(error)); // Pass the error to parent call
                }, 1000);
            }else{
                reject(`Max reload tries achieved at  ${reload_tries} total tries`);
            }
        });
    }


    /** ==== EVENT LISTENERS ==== */
    addTanquesEventListener(tanques_update_function){
        this.data_listeners.tanques = tanques_update_function;
    }
    addPreciosEstadosEventListener(precios_estados_update_function){
        this.data_listeners.precios_estados = precios_estados_update_function;
    }
    addFixedPricesEventListener(fixed_prices_update_function){
        this.data_listeners.fixed_prices = fixed_prices_update_function;
    }

    reloadAllData(){
        console.log("RELOADING ALL THE DATA");

        // 1. Tanques
        this.readTanques().then(tanques_result => {
            // Update Listener 
            this.data_listeners.tanques(tanques_result);
        }).catch(error => {
            console.log("Error calling backend service for reloading tanques data: " + error);
        });

        // 2. Precios Estados
        this.readPreciosEstados().then(precios_estados_result => {
            // Update Listener 
            this.data_listeners.precios_estados(precios_estados_result);
        }).catch(error => {
            console.log("Error calling backend service for reloading precios estados data: " + error);
        });

        // 3. Precios Estados
        this.readFixedCosts().then(fixed_prices_result => {
            // Update Listener 
            this.data_listeners.fixed_prices(fixed_prices_result);
        }).catch(error => {
            console.log("Error calling backend service for reloading fixed prices data: " + error);
        });
    }
    


    /** ========== BACK NAVIGATION VALUE SET/GET ============= */

    setPreventBackNavigation(boolValue){
        console.log("Setting value of prevention is: " + boolValue);
        this.prevent_back_navigation = boolValue;
    }

    getPreventBackNavigation(){
        console.log("Getting value of prevention is: " + this.prevent_back_navigation);
        return this.prevent_back_navigation;
    }

    /** ====== TANQUE COMPARISON HELPERS ===== */
    static compareTanqueByName(tanqueA, tanqueB) {
        // Use toUpperCase() to ignore character casing
        const a = tanqueA.name.toUpperCase();
        const b = tanqueB.name.toUpperCase();

        let comparison = 0;
        if (a > b) {
            comparison = 1;
        } else if (a < b) {
            comparison = -1;
        }
        return comparison;
    }
}
