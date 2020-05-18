<template lang="html">
    <GridLayout rows="auto, auto, *, auto">
        <Label row="0" class="header" text="Tanques activos" />
        <GridLayout horizontalAlignment="center" class="h3" row="1" columns="*, auto, auto, auto, auto" rows="auto, auto">
            <Label row="0" col="0" text="Litros Totales: " fontWeight="Bold" />
            <Label row="0" col="1" :text="litros_total_usados" />
            <Label row="0" col="2" text="/" />
            <Label row="0" col="3" :text="litros_total_disponible" />
            <Label row="0" col="4" :text="porcentaje_tanque_usado(litros_total_disponible, litros_total_usados)"/>
        </GridLayout>
        <ListView row="2" for="tanque in tanques" @itemTap="onItemTap">
            <v-template>
                <GridLayout columns="auto, auto, auto, *, *" rows="auto, *, *">
                    <Label row="0" col="0" class="tanque_title" :text="tanque.name"></Label>
                    <Label row="0" col="1" class="h3" :text="porcentaje_tanque_usado(tanque.max_cap, tanque.current_amount)"></Label>
                    <Button row="0" col="3" horizontalAlignment="right" @tap="onModificarTanqueTap(tanque)">
                        <FormattedString>
                            <Span text.decode="&#xf044;" class="fas t-12"></Span>
                        </FormattedString>
                    </Button>
                    <Button row="0" col="4" horizontalAlignment="right" @tap="onDeleteTanqueTap(tanque)">
                        <FormattedString>
                            <Span text.decode="&#xf1f8;" class="fas t-12"></Span>
                        </FormattedString>
                    </Button>
                    <!-- <Label row="0" col="4" horizontalAlignment="right" class="far t-12" text.decode="&#xf044;"></Label> -->
                    <!-- <Image row="0" col="2" horizontalAlignment="right" src.decode="font://&#xf155;" class="far t-36"></Image> -->
                    <Label row="1" col="0" text="Cantidad Maxima: " fontWeight="Bold" />
                    <Label row="1" col="1" :text="tanque.max_cap" />
                    <Label row="2" col="0" text="Cantidad Actual: " fontWeight="Bold" />
                    <Label row="2" col="1" :text="tanque.current_amount"/>
                </GridLayout>

            </v-template>
        </ListView>
        <GridLayout horizontalAlignment="center" row="3" rows="auto, auto, auto" columns="auto, auto">
            <Button row="0" colSpan="2" class="menu_item"text=" + Agregar nuevo tanque" @tap="onNewTanqueTap" />
            <Button row="1" col="0" class="menu_item" text="Crear Carga (-)" @tap="onNewCargaTap" />
            <Button row="1" col="1" class="menu_item" text="Crear Descarga (+)" @tap="onNewDescargaTap" />
            <Button row="2" colSpan="2"  class="menu_item" text="Ver Reporte" @tap="onGenerateReportTap" />
        </GridLayout>
    </GridLayout>
</template>

<script>
import ModificarTanque from './ModificarTanque.vue';
import NewCargaDescarga from './NewCargaDescarga.vue';
import Reporte from './Reporte.vue';

import firebase from 'nativescript-plugin-firebase';

var application = require('application');

export default {
    data: () => {
        return {
            tanques: [
            ],
        }
    },
    computed: {
        // Calculate total of current used liters
        litros_total_usados: function () {
            return this.tanques.reduce(function(a, b){
                return a + parseInt(b.current_amount);
            }, 0);
            
        },
        // Calculate total of available space
        litros_total_disponible: function () {
            return this.tanques.reduce(function(a, b){
                return a + parseInt(b.max_cap);
            }, 0);
            
        },
    },
    mounted: function () {
        this.$backendService.readTanques().then(tanques_result =>{ 
            this.tanques = tanques_result;
        }).catch(error => {
            console.log("Error calling backend service for loading tanques: " + error);
        });

        // Add this class Listen for future changes in the data
        this.$backendService.addTanquesEventListener(this.onTanquesUpdateCallback);
    },
    methods: {
        onModificarTanqueTap(tanque){
            console.log(tanque);
            this.$backendService.setPreventBackNavigation(false);
            this.$navigateTo(ModificarTanque, {
                transition: {
                    name:'fade',
                    duration: 300
                },
                props: {
                    context: tanque
                }
            });

        },
        /**
         * Deletes selected tanque if confirmed
         */
        onDeleteTanqueTap(tanque){
            confirm("Esta seguro de que quieres eliminar tanque: " + tanque.name + "?")
            .then(result => {
                // Check if user pressed ok
                if(result){
                    const index = this.tanques.indexOf(tanque);
                    this.tanques.splice(index, 1);

                    // Update on Server
                    firebase.remove(
                        "tanques/" + tanque.id,
                    );
                }
            });
        },
        onNewTanqueTap(){
            // Check for empty list
            let new_tanque = {
                name: "Nuevo Tanque",
                max_cap: 0,
                current_amount: 0,
            }

            // Update DB (using setValue instead of push to specify custom ID)
            var tanques_vue_obj = this.tanques;
            var new_tanque_db = firebase.push(
                "tanques/",
                new_tanque
            ).then(
                function (result) {
                    new_tanque.id = result.key;
                    tanques_vue_obj.unshift(new_tanque);
                    console.log("created new entry for tanque, key: " + result.key);
                }
            );
            

            
        },

        /**
         * Opens the a new view to create a Carga
         */
        onNewCargaTap(){
            console.log("New Carga tapped");
            var tanques_disponibles = this.tanques;
            tanques_disponibles.forEach(function (element) {
                element.litros_cargados = 0;
            });

            this.$backendService.setPreventBackNavigation(false);
            this.$navigateTo(NewCargaDescarga, {
                transition: {
                    name:'fade',
                    duration: 300
                },
                props: {
                    context: {
                        tanques_disponibles: tanques_disponibles,
                        operation_type: "carga"
                    }
                }
            });
        },
        /**
         * Opens the a new view to create a Carga
         */
        onNewDescargaTap(){
            console.log("New Descarga tapped");
            var tanques_disponibles = this.tanques;
            tanques_disponibles.forEach(function (element) {
                element.litros_cargados = 0;
            });

            this.$backendService.setPreventBackNavigation(false);
            this.$navigateTo(NewCargaDescarga, {
                transition: {
                    name:'fade',
                    duration: 300
                },
                props: {
                    context: {
                        tanques_disponibles: tanques_disponibles,
                        operation_type: "descarga"
                    }
                }
            });
        },
        onGenerateReportTap(){
            // TODO
            console.log("Generar Reporte Tap");
            this.$backendService.setPreventBackNavigation(false);
            this.$navigateTo(Reporte, {
                transition: {
                    name:'fade',
                    duration: 300
                },
                props: {}
            });
        },

        onTanquesUpdateCallback(new_tanques){
            console.log("New tanque info came in!");
            this.tanques = new_tanques;
        },

        /// HELPER METHODS ///

        /**
         * Calcula el porcentaje de litros usados, actual/total en el tanque
         * Redondea a 2 decimales
         */
        porcentaje_tanque_usado_cantidad(total, actual) {
            let percent = (actual/total) * 100;
            return (Math.round(percent * 100) / 100).toFixed(2);
        },

        porcentaje_tanque_usado(total, actual) {
            return "(" + this.porcentaje_tanque_usado_cantidad(total, actual) + "%)";
        },
    }
}


</script>

<style lang="scss" scoped>
// Start custom common variables
@import "~@nativescript/theme/scss/variables/blue";
// End custom common variables

// Custom styles

</style>