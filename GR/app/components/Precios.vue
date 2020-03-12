<template>
    <GridLayout rows="auto, auto, *">
        <Label row="0" class="header" text="Precios por Estado" />
        <Button row="1" class="big_button" text="Editar Precios Fijos" @tap="onEditFixedPricesTap" />
        <ListView row="2" for="estado in estados" @itemTap="onEstadoItemTap">
            <v-template>
                <GridLayout columns="70*, 15*, 15*" rows="auto">
                    <Label row="0" col="0" :text="estado.name" />
                    <Label row="0" col="1" :text="'$' + estado.liter_price"></Label>
                    <Button row="0" col="2" horizontalAlignment="right" @tap="onEditEstadoPrecioTap(estado)">
                        <FormattedString>
                            <Span text.decode="&#xf044;" class="fas t-12"></Span>
                        </FormattedString>
                    </Button>
                </GridLayout>
            </v-template>
        </ListView>
    </GridLayout>
    
</template>

<script>
import firebase from 'nativescript-plugin-firebase';
import OperationDetails from './OperationDetails.vue';

export default {
    props: ["context"],

    data: () => {
        return {
            estados: [{
                name: "Baja California Norte",
                liter_price: 20.24
            },{
                name: "Baja California Sur",
                liter_price: 18.90
            },{
                name: "Puebla",
                liter_price: 22.14
            },{
                name: "Estado de Mexico",
                liter_price: 21.43
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
            // this.$navigateTo(ModificarTanque, {
            //     transition: {
            //         name:'fade',
            //         duration: 300
            //     },
            //     props: {
            //         context: tanque
            //     }
            // });

        },
        onEditFixedPricesTap(){
            console.log("Pressed Edit Fixed Prices button");
        },


        
    }
};
</script>