<template>
    <GridLayout rows="auto, auto, auto, auto, auto, *">
        <Label row="0" class="header" text="Precios Fijos" />
        <!-- First Row -->
        <GridLayout row="1" col="0" class="sub_header" columns="auto, auto" horizontalAlignment="center">
            <Label row="0" col="0" text="USD -> MXN " fontWeight="Bold"/>
            <Label row="0" col="1" :text="'$' + fixed_costs.dollar_to_pesos_rate"></Label>
        </GridLayout>
        <GridLayout row="2" columns="auto, auto" rows="auto, auto, auto" horizontalAlignment="center" >
            
            <!-- Second Row -->
            <GridLayout row="1" col="0" columns="*, *" style="margin-left: 5px">
                <Label row="0" col="0" text="Precio del Galon (USD) " fontWeight="Bold"></Label>
                <Label row="0" col="1" :text="'$' + fixed_costs.gallon_price_in_dollars"></Label>
            </GridLayout>
            
            <GridLayout row="1" col="1" columns="*, *" style="margin-left: 5px">
                <Label row="0" col="0" text="Precio del Litro (MXN) " fontWeight="Bold"></Label>
                <Label row="0" col="1" :text="'$' + liter_price_in_pesos"></Label>
            </GridLayout>
        
            <!-- Third Row -->
            <GridLayout row="2" col="0" columns="*, *">
                <Label row="0" col="0" text="Coto de la Aduana (MXN) " fontWeight="Bold"/>
                <Label row="0" col="1" :text="'$' + fixed_costs.aduana_cost_in_pesos"></Label>
            </GridLayout>
            <GridLayout row="2" col="1" columns="*, *" style="margin-left: 5px">
                <Label row="0" col="0" text="Utilidad por Litro (MXN) " fontWeight="Bold"></Label>
                <Label row="0" col="1" :text="'+ $' + fixed_costs.utility_per_liter_in_pesos"></Label>
            </GridLayout>
        </GridLayout>
        <Button row="3" class="big_button" text="Editar Precios Fijos" @tap="onEditFixedPricesTap" />
        <Label row="4" class="header" text="Precios por Estado" />
        <ListView row="5" for="estado in estados" @itemTap="onEstadoItemTap">
            <v-template>
                <GridLayout columns="50*, 35*, 15*" rows="auto, auto">
                    <Label row="0" col="0" class="tanque_title" :text="estado.name" />
                    <Label row="0" col="1" class="price_title" :text="'$' + computeLiterPrice(estado)"></Label>
                    <Button row="0" col="2" horizontalAlignment="right" @tap="onEditEstadoPrecioTap(estado)">
                        <FormattedString>
                            <Span text.decode="&#xf044;" class="fas t-12"></Span>
                        </FormattedString>
                    </Button>
                    <Label row="1" col="0" :text="'Flete: $' + estado.flete"></Label>
                    <Label row="1" col="1" :text="'Cost. Var: $' + estado.costo_variable"></Label>
                </GridLayout>
            </v-template>
        </ListView>
    </GridLayout>
    
</template>

<script>
import firebase from 'nativescript-plugin-firebase';
import EditEstado from './EditEstado.vue';
import EditFixedCosts from './EditFixedCosts.vue';

export default {
    props: ["context"],

    data: () => {
        return {
            fixed_costs :{
                dollar_to_pesos_rate: 19.50,
                gallon_price_in_dollars: 2.3,
                aduana_cost_in_pesos: 4.3,
                utility_per_liter_in_pesos: 3.0
            },
            estados: [{
                name: "Baja California Norte",
                liter_price: 20.24,
                flete: 1.5,
                costo_variable: 5.3,
            },{
                name: "Baja California Sur",
                liter_price: 18.90,
                flete: 0.5,
                costo_variable: 8.3,
            },{
                name: "Puebla",
                liter_price: 22.14,
                flete: 1.2,
                costo_variable: 2.3,
            },{
                name: "Estado de Mexico",
                liter_price: 21.43,
                flete: 1.8,
                costo_variable: 1.3,
            },]
        }
    },
    mounted: function () {
        console.log("Reading estados from DB");
    },
    computed: {
        // Convert price of gallon in dol lars to liters in pesos
        liter_price_in_pesos(){
            let precio = (parseFloat(this.fixed_costs.gallon_price_in_dollars) * parseFloat(this.fixed_costs.dollar_to_pesos_rate)) / 3.78541 // galons in a liter
            return precio.toFixed(3);

            
        },

        
    },
    methods: {
        computeLiterPrice(estado){
            let fixed_costs_sum = parseFloat(this.liter_price_in_pesos) + parseFloat(this.fixed_costs.aduana_cost_in_pesos);
            let variable_costs_sum = parseFloat(estado.flete) + parseFloat(estado.costo_variable);
            return (fixed_costs_sum + variable_costs_sum + parseFloat(this.fixed_costs.utility_per_liter_in_pesos)).toFixed(3);

        },
        onEstadoItemTap(estado){
            console.log("Tapped on estado: " + estado);
            console.dir(estado.item);
        },

        onEditEstadoPrecioTap(estado){
            console.log(estado.item);
            this.$navigateTo(EditEstado, {
                transition: {
                    name:'fade',
                    duration: 300
                },
                props: {
                    context: estado
                }
            });

        },
        onEditFixedPricesTap(){
            console.log("Pressed Edit Fixed Prices button");
            var fixed_costs = this.fixed_costs
            this.$navigateTo(EditFixedCosts, {
                transition: {
                    name:'fade',
                    duration: 300
                },
                props: {
                    context: fixed_costs
                }
            });
        },


        
    }
};
</script>