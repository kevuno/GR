<template>
    <Page>

        <ActionBar>
            <Label text="Modificar Tanques Disponibles"></Label>
        </ActionBar>
        <GridLayout rows="auto, *">
            <Label row="0" class="header" text="Modificar Tanques" />
            
            <ListView row="1" for="tanque in tanques" @itemTap="onItemTap">
                <v-template>
                    <GridLayout columns="auto, auto" rows="auto, *, *">
                        <Label row="0" col="0" class="tanque_title" :text="tanque.nombre"></Label>
                        <Label row="1" col="0" text="Cantidad Maxima: " fontWeight="Bold" />
                        <Label row="1" col="1" :text="tanque.capacidad_maxima" />
                        <Label row="2" col="0" text="Cantidad Actual: " fontWeight="Bold" />
                        <Label row="2" col="1" :text="tanque.capacidad_actual"/>
                    </GridLayout>
                </v-template>
            </ListView>
        </GridLayout>
    </Page>
</template>

<script>
export default {
    props: ["context"],

    computed: {
        tanques() {
            return this.context || {};
        }
    }
};
</script>

<style scoped lang="scss">
// Start custom common variables
@import "~@nativescript/theme/scss/variables/blue";
// End custom common variables

// Custom styles

</style>