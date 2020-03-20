<template>
    <Page>
        <ActionBar>
            <Label text="Modificar Costos Estado"></Label>
        </ActionBar>
        <StackLayout rows="auto, auto">
            <Label class="header" text="Modificar Costos del Estado" />
            <GridLayout horizontalAlignment="center" columns="auto, auto" rows="auto, auto, auto, auto">
                <Label row="0" col="0" text="Flete: " class="h3"  fontWeight="Bold" />
                <TextField row="0" col="1" class="h3" v-model="estado.flete" width="50" keyboardType="number" @textChange="onEstadoFleteChanged"/>
                <Label row="1" col="0" text="Costo Variable: " class="h3" fontWeight="Bold" />
                <TextField row="1" col="1" class="h3" v-model="estado.costo_variable" width="50" keyboardType="number" @textChange="onEstadoCostoVariableChanged"/>
            </GridLayout>
        </StackLayout>
    </Page>
</template>

<script>
import firebase from 'nativescript-plugin-firebase';

export default {
    props: ["context"],
    computed: {
        estado() {
            return this.context || {};
        },
    },
    methods:{
        onEstadoFleteChanged(){
            console.log("Text changed on flete");
            this.updateDB();
            
        },
        onEstadoCostoVariableChanged(){
            console.log("Text changed Costo variable");
            this.updateDB();
        },

        /**
         * Calls update on the DB with the given estado object 
         */
        updateDB(){
            // Update DB
            var new_estado_db_obj = {};
            new_estado_db_obj[this.estado.id] = this.estado;

            console.log("Updaing estado" + new_estado_db_obj);
            firebase.update(
                '/estados',
                new_estado_db_obj
            );
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