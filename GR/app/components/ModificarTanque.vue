<template>
    <Page>

        <ActionBar>
            <Label text="Modificar Tanques Disponibles"></Label>
        </ActionBar>
        <StackLayout rows="auto, auto">
            <Label class="header" text="Modificar Tanque" />
            <GridLayout horizontalAlignment="center" columns="auto, auto" rows="auto, auto, auto, auto">
                <Label row="0" col="0" text="Nombre: " class="h3"  fontWeight="Bold" />
                <TextField row="0" col="1" class="h3" v-model="tanque.name" @textChange="onTanqueNamedChanged"/>
                <Label row="1" col="0" text="Cantidad Maxima: " class="h3" fontWeight="Bold" />
                <TextField row="1" col="1" class="h3" v-model="tanque.max_cap" keyboardType="number" @textChange="onTanqueMaxCapChanged"/>
            </GridLayout>
        </StackLayout>
    </Page>
</template>

<script>
import firebase from 'nativescript-plugin-firebase';

export default {
    props: ["context"],
    watch: {
        // Whenever the values change, verify convertion to correct types
        tanque: function (new_tanque) {
            console.log("Value changed watched");
            this.tanque.max_cap = parseInt(new_tanque.max_cap, 10);
            // TODO Update on Server (both the cap and the name)
        }
    },
    computed: {
        tanque() {
            return this.context || {};
        },
    },
    methods:{
        onTanqueMaxCapChanged(){
            console.log("Text changed on Max Cap");
            this.updateDB(this.tanque);
            
        },
        onTanqueNamedChanged(){
            console.log("Text changed Name");
            this.updateDB(this.tanque);
        },
        /**
         * Calls update on the DB with the given tanque object 
         */
        updateDB(tanque){
            // Update DB
            var new_tanque_db_obj = {};
            new_tanque_db_obj[tanque.id] = tanque;

            firebase.update(
                '/tanques',
                new_tanque_db_obj
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