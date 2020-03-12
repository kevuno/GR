<template lang="html">
    <Page>
        <ActionBar title="Inicio">
           <NavigationButton visibility="hidden" ></NavigationButton>
       </ActionBar>
        <TabView>
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

export default {
  components: {
    Tanques,
    Precios,
    Settings
  },
};
</script>

<style lang="scss">
// Start custom common variables
@import "~@nativescript/theme/scss/variables/blue";

// End custom common variables

// Custom styles

</style>
