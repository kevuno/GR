<template lang="html">
    <Page>
        <ActionBar>
            <Label text="Tanques"></Label>
        </ActionBar>
        <GridLayout rows="auto, auto, auto, *, *, *, *, *">
            <Label row="0" class="header" text="Tanques activos" />

            <StackLayout row="1" orientation="horizontal">
                <Label class="h2" text="Litros en Total:" />
                <Label class="h3" :text="litros_total" />
            </StackLayout>
            

            <ListView row="2"for="tanque in tanques" @itemTap="onItemTap">
                <v-template>
                    <GridLayout columns="auto, auto" rows="auto, *, *">
                        <Label row="0" col="0" class="tanque_title" :text="tanque.nombre"></Label>
                        <Label row="0" col="1" class="h3" :text="porcentaje_tanque(tanque.capacidad_actual, tanque.capacidad_maxima)"></Label>
                        <Label row="1" col="0" text="Cantidad Maxima: " fontWeight="Bold" />
                        <Label row="1" col="1" :text="tanque.capacidad_maxima" />
                        <Label row="2" col="0" text="Cantidad Actual: " fontWeight="Bold" />
                        <Label row="2" col="1" :text="tanque.capacidad_actual"/>
                    </GridLayout>

                </v-template>
            </ListView>
            <Button row="3" text="Crear Carga" @tap="onButtonTap" />
            <Button row="4" text="Crear Descarga" @tap="onButtonTap" />
            <Button row="5" text="Modificar Tanques" @tap="onModificarTanquesTap" />
            <Button row="6" text="Modificar Pipas" @tap="onModificatPipasTap" />
            <Button row="7" text="Generar Reporte" @tap="onButtonTap" />
            
            
        </GridLayout>
    </Page>
</template>

<script>
export default {
    data: () => {
        return {
            tanques: [
                {
                    nombre: "Tanque 1",
                    capacidad_maxima: 1000,
                    capacidad_actual: 50,
                    
                },
                {
                    nombre: "Tanque 2",
                    capacidad_maxima: 2000,
                    capacidad_actual: 150,
                    
                },
                {
                    nombre: "Tanque 3",
                    capacidad_maxima: 6000,
                    capacidad_actual: 1150,
                    
                },
                {
                    nombre: "Tanque 4",
                    capacidad_maxima: 7000,
                    capacidad_actual: 1050,
                    
                },
            ],
        }
    },
    computed: {
        // a computed getter
        litros_total: function () {
            // `this` points to the vm instance
            debugger
            return this.tanques.reduce(function(a, b){
                return a + b.capacidad_actual;
            }, 0);
            
        }
    },
    mounted: function () {
        console.log("MOunting Items");
    },
    methods: {
        onModificarTanquesTap(){

        },

        onModificatPipasTap(){

        },

        /**
         * Calcula el porcentaje de litros usados, actual/total en el tanque
         * Redondea a 2 decimales
         */
        porcentaje_usado(total, actual) {
            let percent = actual/total;
            return (Math.round(percent * 100) / 100).toFixed(2);
        },

        porcentaje_tanque(total, actual) {
            return this.porcentaje_usado(total, actual) + "%";
        },

        onItemTap (args) {
            const view = args.view;
            const page = view.page;
            const tappedItem = view.bindingContext;
            console.log(tappedItem);
            // this.$navigateTo(ItemDetails, {
            //     props: { 
            //         context: tappedItem,
            //         animated: true,
            //         transition: {
            //             name: "slide",
            //             duration: 200,
            //             curve: "ease"
            //         }
            //     }
            // });

        }
    }
}

import {request} from 'http';


</script>

<style lang="scss" scoped>
// Start custom common variables
@import "~@nativescript/theme/scss/variables/blue";
// End custom common variables

// Custom styles

</style>