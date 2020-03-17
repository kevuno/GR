<template>
    <GridLayout rows="auto, auto, auto, auto *">
        <Label row="0" class="header" text="Precios Fijos" />
        <GridLayout row="1" columns="auto, *, auto" rows="auto, auto" horizontalAlignment="center" >
            <!-- First Row -->
            <GridLayout row="0" col="0" columns="*, *">
                <Label row="0" col="0" text="USD -> MXN " fontWeight="Bold"/>
                <Label row="0" col="1" :text="'$' + fixed_costs.dollar_to_pesos_rate"></Label>
            </GridLayout>
            <Label row="0" col="1" text=" " textWrap="true" />
            
            <GridLayout row="0" col="2" columns="*, *" style="margin-left: 5px">
                <Label row="0" col="0" text="Precio del Galon (USD) " fontWeight="Bold"></Label>
                <Label row="0" col="1" :text="'$' + fixed_costs.gallon_price_in_dollars"></Label>
            </GridLayout>
        
            <!-- Second Row -->
            <GridLayout row="1" col="0" columns="*, *">
                <Label row="0" col="0" text="Coto de la Aduana (USD) " fontWeight="Bold"/>
                <Label row="0" col="1" :text="'$' + fixed_costs.aduana_cost_in_dollars"></Label>
            </GridLayout>
            <Label row="0" col="1" text=" " textWrap="true" />
            <GridLayout row="1" col="2" columns="*, *" style="margin-left: 5px">
                <Label row="0" col="0" text="Utilidad por Litro (MXN) " fontWeight="Bold"></Label>
                <Label row="0" col="1" :text="'+ $' + fixed_costs.utility_per_liter_in_pesos"></Label>
            </GridLayout>
        </GridLayout>
        <Button row="2" class="big_button" text="Editar Precios Fijos" @tap="onEditFixedPricesTap" />
        <Label row="3" class="header" text="Precios por Estado" />
        <ListView row="4" for="estado in estados" @itemTap="onEstadoItemTap">
            <v-template>
                <GridLayout columns="70*, 15*, 15*" rows="auto, auto">
                    <Label row="0" col="0" :text="estado.name" />
                    <Label row="0" col="1" :text="'$' + estado.liter_price"></Label>
                    <Button row="0" col="2" horizontalAlignment="right" @tap="onEditEstadoPrecioTap(estado)">
                        <FormattedString>
                            <Span text.decode="&#xf044;" class="fas t-12"></Span>
                        </FormattedString>
                    </Button>
                    <Label row="1" col="0" :text="'$' + estado.flete"></Label>
                    <Label row="1" col="1" :text="'$' + estado.costo_variable"></Label>
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
                aduana_cost_in_dollars: 4.3,
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
        // console.log("Reading operaciones from DB");
        // firebase.getValue('/operations')
        //     .then(result => {
        //         // Save each tanque obj into the array of tanques
        //         let operations_list_obj = result.value;
        //         for(var operation_key in operations_list_obj) {
        //             if(operations_list_obj.hasOwnProperty(operation_key)) {
        //                 // Save tanque obj into Vue list of tanques
        //                 let operation_obj = operations_list_obj[operation_key];
        //                 operation_obj.id = operation_key; // Add ID property for easy queryings
        //                 this.operations.push(operation_obj);
        //             }
        //         }
                
        //     })
        //     .catch(error => console.log("Error: " + error));
    },
    computed: {
        
    },
    methods: {
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