<template lang="html">
    <Page @loaded="pageLoaded">
        <ActionBar title="Inicio">
           <NavigationButton visibility="hidden" @tap="onBackButton"></NavigationButton>
           <!-- <AndroidBackButton :prevent="prevent_back_button" @updatePrevent"onUpdatePreventBack" @tap="onBackButton" /> -->
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
            prevent_back_button: true
        }
    },
    mounted: function () {
        console.log("Home loaded");
        this.$backendService.setPreventBackNavigation(true);
        application.android.on(application.AndroidApplication.activityBackPressedEvent, (args) => {
            if(this.$backendService.getPreventBackNavigation()){
                args.cancel = true; // prevents default back button behavior
            }
        });
    },
    methods: {
        pageLoaded(){
            this.$backendService.setPreventBackNavigation(true);
        }
        // onUpdatePreventBack(newValue){
        //     console.log("Back button prevention value changed from child");
        //     this.prevent = newValue;

        // }
    }
};

</script>

<style lang="scss">
// Start custom common variables
@import "~@nativescript/theme/scss/variables/blue";

// End custom common variables

// Custom styles

</style>
