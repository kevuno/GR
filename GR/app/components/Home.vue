<template lang="html">
    <Page @loaded="onPageLoaded">
        <ActionBar title="Inicio">
           <NavigationButton visibility="hidden"></NavigationButton>
           <ActionItem @tap="onRefreshData"
                ios.systemIcon="13" ios.position="right"
                android.systemIcon="ic_popup_sync"
                text="delete" android.position="actionBar">
            </ActionItem>
       </ActionBar>
        <TabView androidTabsPosition="bottom">
            <TabViewItem title="Tanques" iconSource="~/images/tanques.png">
                <Tanques />
            </TabViewItem>
            <TabViewItem title="Precios" iconSource="~/images/precios.png">
                <Precios />
            </TabViewItem>
            <TabViewItem title="Configuracion" iconSource="~/images/settings.png">
                <Settings />
            </TabViewItem>
        </TabView>
    </Page>
</template>

<script>
import Tanques from "./Tanques.vue";
import Precios from "./Precios.vue";
import Settings from "./Settings.vue";
var application = require('application');

export default {
    components: {
        Tanques,
        Precios,
        Settings,
    },
    data(){
        return {
            current_tab_index: 0,
            prevent_back_button: true
        }
    },
    mounted: function () {
        console.log("Home Component loaded");

        // If platform is Andorid, prevent the click of the back button
        // In iOS, the button should be dissabled thanks to <NavigationButton visibility="hidden" ...>
        if(application.android){
            this.$backendService.setPreventBackNavigation(true);
            application.android.on(application.AndroidApplication.activityBackPressedEvent, (args) => {
                if(this.$backendService.getPreventBackNavigation()){
                    args.cancel = true; // prevents default back button behavior
                }
            });
        }
        
    },
    methods: {
        
        /**
         * Necessary to make sure that any time the user goes back 
         * to the home page the back button is dissabled (prevented)
         */
        onPageLoaded(){
            this.$backendService.setPreventBackNavigation(true);
        },

        /**
         * Makes a call to the backend service to reload all data and it updates
         * each of the listener components
         */
        onRefreshData() {
            this.$backendService.reloadAllData();
        }
    }
};

</script>

<style lang="scss">
// Start custom common variables
@import "~@nativescript/theme/scss/variables/blue";

// End custom common variables

// Custom styles

</style>
