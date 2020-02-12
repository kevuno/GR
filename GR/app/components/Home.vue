<template lang="html">
    <Page>
        <TabView>
            <TabViewItem title="Tanques" iconSource="~/images/tanques.png">
                <Tanques />
            </TabViewItem>
            <TabViewItem title="Precios" iconSource="~/images/precios.png">
                <Precios />
            </TabViewItem>
        </TabView>
    </Page>
</template>

<script>
import Tanques from "./Tanques.vue";
import Precios from "./Precios.vue";

export default {
  components: {
    Tanques,
    Precios,
  },
};
</script>

<style lang="scss">
// Start custom common variables
@import "~@nativescript/theme/scss/variables/blue";

// End custom common variables

// Custom styles

</style>
