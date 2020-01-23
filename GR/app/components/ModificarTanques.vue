<template>
    <Page>

        <ActionBar>
            <Label text="Modificar Tanques Disponibles"></Label>
        </ActionBar>
        <GridLayout rows="auto, auto, *">
            <Label row="0" class="header" text="Modificar Tanques" />

            <Button row="1" horizontalAlignment="right"  text=" + Agregar nuevo tanque" @tap="onNewTanqueTap" />
        
            <ListView row="2" for="tanque in tanques" @itemTap="onItemTap">
                <v-template>
                    <GridLayout columns="auto, auto" rows="auto, *, *, *">
                        <TextField row="0" col="0" class="tanque_title" v-model="tanque.nombre" />
                        <Label row="1" col="0" text="Cantidad Maxima: " fontWeight="Bold" />
                        <TextField row="1" col="1" v-model="tanque.capacidad_maxima" />
                        <Label row="2" col="0" text="Cantidad Actual: " fontWeight="Bold" />
                        <TextField row="2" col="1" v-model="tanque.capacidad_actual"/>
                        <Button row="3" horizontalAlignment="right"  text=" - BORRAR TANQUE" @tap="onBorrarTanqueTap(tanque)" />
                    </GridLayout>
                </v-template>
            </ListView>
        </GridLayout>
    </Page>
</template>

<script>
export default {
    props: ["tanques"],
    
    watch: {
        // whenever question changes, this function will run
        tanques: function (new_tanques) {
            console.log("Tanques changed. New Tanques: ");
            console.log(new_tanques);
        }
    },
    methods: {
        onNewTanqueTap(){
            this.tanques.push({
                id: "4",
                nombre: "Nuevo Tanque",
                capacidad_maxima: 0,
                capacidad_actual: 0,
            });
        },
        onBorrarTanqueTap(tanque){
            console.log("AAAA");
            
            console.dir(tanque);
            this.tanques.splice(tanque.id - 1, 1);
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