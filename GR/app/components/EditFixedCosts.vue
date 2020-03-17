<template>
    <Page>
        <ActionBar>
            <Label text="Modificar Costos Fijos"></Label>
        </ActionBar>
        <StackLayout rows="auto, auto">
            <Label class="header" text="Modificar Costos Fijos" />
            <GridLayout horizontalAlignment="center" columns="*, auto" rows="auto, auto, auto, auto">
                <Label row="0" col="0" text="Precio del Dolar en Pesos: " class="h3"  fontWeight="Bold" />
                <TextField row="0" col="1" class="h3" v-model="fixed_costs.dollar_to_pesos_rate" />
                <Label row="1" col="0" text="Costo de 1 Galon de Gasolina (USD): " class="h3" fontWeight="Bold" />
                <TextField row="1" col="1" class="h3" v-model="fixed_costs.gallon_price_in_dollars" keyboardType="number" />
                <Label row="2" col="0" text="Costo de la aduana por litro (MXN) " class="h3" fontWeight="Bold" />
                <TextField row="2" col="1" class="h3" v-model="fixed_costs.aduana_cost_in_pesos" keyboardType="number"/>
                <Label row="3" col="0" text="Utilidad por Litro deseada (MXN)" class="h3" fontWeight="Bold" />
                <TextField row="3" col="1" class="h3" v-model="fixed_costs.utility_per_liter_in_pesos" keyboardType="number"/>
            </GridLayout>
        </StackLayout>
    </Page>
</template>

<script>
import firebase from 'nativescript-plugin-firebase';

export default {
    props: ["context"],
    computed: {
        fixed_costs() {
            return this.context || {};
        },
    },
    methods:{
        onEstadoFleteChanged(){
            console.log("Text changed on flete");
            
        },
        onEstadoCostoVariableChanged(){
            console.log("Text changed Costo variable");
        },

    }
};
</script>

<style scoped lang="scss">
// Start custom common variables
@import "~@nativescript/theme/scss/variables/blue";
// End custom common variables

// Custom styles

</style>