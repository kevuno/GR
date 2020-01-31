<template>
    <Page>

        <ActionBar>
            <Label text="Modificar Tanques Disponibles"></Label>
        </ActionBar>
        <StackLayout rows="auto, auto">
            <Label class="header" text="Modificar Tanque" />
            <GridLayout horizontalAlignment="center" columns="auto, auto" rows="auto, auto, auto, auto">
                <Label row="0" col="0" text="Nombre: " class="h3"  fontWeight="Bold" />
                <TextField row="0" col="1" class="h3" v-model="tanque.name" />
                <Label row="1" col="0" text="Cantidad Maxima: " class="h3" fontWeight="Bold" />
                <TextField row="1" col="1" class="h3" v-model="tanque.max_cap" keyboardType="number"/>
            </GridLayout>
        </StackLayout>
    </Page>
</template>

<script>
export default {
    props: ["tanque"],
    watch: {
        // Whenever the values change, verify convertion to correct types
        tanque: function (new_tanque) {
            this.tanque.max_cap = parseInt(new_tanque.max_cap, 10);
            // TODO Update on Server (both the cap and the name)
        }
    },
};
</script>

<style scoped lang="scss">
// Start custom common variables
@import "~@nativescript/theme/scss/variables/blue";
// End custom common variables

// Custom styles

</style>