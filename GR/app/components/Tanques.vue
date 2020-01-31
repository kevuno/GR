<template lang="html">
    <Page>
        <ActionBar>
            <Label text="Tanques"></Label>
        </ActionBar>
        <GridLayout rows="auto, auto, *, auto">
            <Label row="0" class="header" text="Tanques activos" />
            <GridLayout horizontalAlignment="center" class="h2" row="1" columns="*, auto, auto, auto, auto" rows="auto, auto">
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
            <StackLayout row="3" orientation="vertical">
                <Button class="big_button"text=" + Agregar nuevo tanque" @tap="onNewTanqueTap" />
                <StackLayout class="hr m-10"></StackLayout>
                <Button class="big_button" text="Crear Carga" @tap="onNewCargaTap" />
                <Button class="big_button" text="Crear Descarga" @tap="onNewDescargaTap" />
                <StackLayout class="hr m-10"></StackLayout>
                <Button class="big_button" text="Generar Reporte" @tap="onButtonTap" />
            </StackLayout>]
            
            
            
        </GridLayout>
    </Page>
</template>

<script>
import ModificarTanque from './ModificarTanque.vue';
import NewCargaDescarga from './NewCargaDescarga.vue';

export default {
    data: () => {
        return {
            tanques: [
                {
                    id: 1,
                    name: "Tanque 1",
                    max_cap: 3000,
                    current_amount: 60,
                    
                },
                {
                    id: 2,
                    name: "Tanque 22",
                    max_cap: 2200,
                    current_amount: 300,
                    
                },
                {
                    id: 3,
                    name: "Tanque 3",
                    max_cap: 7000,
                    current_amount: 2250,
                    
                },
                {
                    id: 4,
                    name: "Tanque 4",
                    max_cap: 7100,
                    current_amount: 205,
                    
                },
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
        console.log("MOunting Itssems");
    },
    methods: {
        onModificarTanqueTap(tanque){
            console.log(tanque);
            this.$showModal(ModificarTanque, {
                transition: {
                    name:'fade',
                    duration: 300
                },
                props: {
                    tanque: tanque
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
                }
            });
            
            // TODO Update on Server

        },
        onNewTanqueTap(){
            // Check for empty list
            if(this.tanques.length == 0){
                var new_id = 1;
            }else{
                var new_id = this.tanques[this.tanques.length - 1].id + 1;
            }

            let new_tanque = {
                id: new_id,
                name: "Nuevo Tanque",
                max_cap: 0,
                current_amount: 0,
            }
            this.tanques.unshift(new_tanque);

            // TODO Update on Server
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

            console.log(tanques_disponibles);
            this.$showModal(NewCargaDescarga, {
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
            console.log("New Carga tapped");
            var tanques_disponibles = this.tanques;
            tanques_disponibles.forEach(function (element) {
                element.litros_cargados = 0;
            });

            console.log(tanques_disponibles);
            this.$showModal(NewCargaDescarga, {
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