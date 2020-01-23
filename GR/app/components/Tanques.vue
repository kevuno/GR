<template lang="html">
    <Page>
        <ActionBar>
            <Label text="Tanques"></Label>
        </ActionBar>
        <GridLayout rows="auto, auto, *, auto">
            <Label row="0" class="header" text="Tanques activos" />
            <GridLayout horizontalAlignment="center" class="h2" row="1" columns="*, auto, auto, auto, auto" rows="auto">
                <Label row="0" col="0" text="Litros Totales: " fontWeight="Bold" />
                <Label row="0" col="1" :text="litros_total_usados" />
                <Label row="0" col="2" text="/" />
                <Label row="0" col="3" :text="litros_total_disponible" />
                <Label row="0" col="4" :text="porcentaje_tanque_usado(litros_total_disponible, litros_total_usados)"/>
            </GridLayout>
            <ListView row="2" for="tanque in tanques" @itemTap="onItemTap">
                <v-template>
                    <GridLayout columns="auto, auto" rows="auto, *, *">
                        <Label row="0" col="0" class="tanque_title" :text="tanque.nombre"></Label>
                        <Label row="0" col="1" class="h3" :text="porcentaje_tanque_usado(tanque.capacidad_maxima, tanque.capacidad_actual)"></Label>
                        <Label row="1" col="0" text="Cantidad Maxima: " fontWeight="Bold" />
                        <Label row="1" col="1" :text="tanque.capacidad_maxima" />
                        <Label row="2" col="0" text="Cantidad Actual: " fontWeight="Bold" />
                        <Label row="2" col="1" :text="tanque.capacidad_actual"/>
                    </GridLayout>

                </v-template>
            </ListView>
            <StackLayout row="3" orientation="vertical">
                <Button class="menu_button" text="Crear Carga" @tap="onButtonTap" />
                <Button class="menu_button" text="Crear Descarga" @tap="onButtonTap" />
                <Button class="menu_button" text="Modificar Tanques" @tap="onModificarTanquesTap" />
                <Button class="menu_button" text="Modificar Pipas" @tap="onModificatPipasTap" />
                <Button class="menu_button" text="Generar Reporte" @tap="onButtonTap" />
            </StackLayout>]
            
            
            
        </GridLayout>
    </Page>
</template>

<script>
import ModificarTanques from './ModificarTanques.vue';
import Precios from './Precios.vue';

export default {
    data: () => {
        return {
            tanques: [
                {
                    id: 1,
                    nombre: "Tanque 1",
                    capacidad_maxima: 5000,
                    capacidad_actual: 60,
                    
                },
                {
                    id: 2,
                    nombre: "Tanque 22",
                    capacidad_maxima: 2200,
                    capacidad_actual: 1500,
                    
                },
                {
                    id: 3,
                    nombre: "Tanque 3",
                    capacidad_maxima: 4000,
                    capacidad_actual: 1150,
                    
                },
                {
                    id: 4,
                    nombre: "Tanque 4",
                    capacidad_maxima: 3100,
                    capacidad_actual: 1205,
                    
                },
            ],
        }
    },
    computed: {
        // a computed getter
        litros_total_usados: function () {
            // `this` points to the vm instance
            return this.tanques.reduce(function(a, b){
                return a + b.capacidad_actual;
            }, 0);
            
        },
        litros_total_disponible: function () {
            // `this` points to the vm instance
            return this.tanques.reduce(function(a, b){
                return a + b.capacidad_maxima;
            }, 0);
            
        },
    },
    mounted: function () {
        console.log("MOunting Itssems");
    },
    methods: {
        onModificarTanquesTap(args){
            const view = args.view;
            console.log(view);
            this.$navigateTo(ModificarTanques, {
                transition: {
                    name:'fade',
                    duration: 800
                },
                props: {
                    tanques: this.tanques
                }
            });

        },

        onModificatPipasTap(){

        },

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

        onItemTap(args) {
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


</script>

<style lang="scss" scoped>
// Start custom common variables
@import "~@nativescript/theme/scss/variables/blue";
// End custom common variables

// Custom styles

</style>