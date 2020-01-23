<template lang="html">
    <BottomNavigation>
        <TabStrip>
            <TabStripItem class="navigation__item">
                <Label text="Tanques"></Label>
                <Image src.decode="font://&#xf0db;" class="fas t-36"></Image>
            </TabStripItem>
            <TabStripItem class="navigation__item">
                <Label text="Precios"></Label>
                <Image src.decode="font://&#xf155;" class="far t-36"></Image>
            </TabStripItem>
        </TabStrip>

        <TabContentItem>
            <Frame>
                <Tanques />
            </Frame>
        </TabContentItem>

        <TabContentItem>
            <Frame>
                <Precios />
            </Frame>
        </TabContentItem>

    </BottomNavigation>
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
