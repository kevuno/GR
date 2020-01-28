<template>
    <Page>

        <ActionBar>
            <Label text="Crear Carga a Pipas"></Label>
        </ActionBar>
        <StackLayout>
            <Label class="header" text="Crear Carga a Pipas" />
            <GridLayout rows="auto, auto" columns="auto, auto" horizontalAlignment="center">
                <Label text="Operador: " row="0" col="0" />
                <TextField row="0" col="1" hint="Nombre de Operador" v-model="operador" />
                <Label text="Numero de tracto:" row="1" col="0" />
                <TextField row="1" col="1" v-model="numero_de_tracto" />
            </GridLayout>
            <StackLayout class="hr m-10"></StackLayout>
            <GridLayout rows="auto, auto" columns="*, *" class="m-20">
                <Label row="0" col="0" class="h3" fontWeight="Bold" text="Seleccionar litros de los tanques" textWrap="true" />
                <Label row="0" col="1" class="h3" fontWeight="Bold" text="Selecciona cuantos litros entraran en las pipas" textWrap="true" />
                
                <StackLayout row="1" col="0" orientation="vertical">                   
                    <template v-for="tanques_disponible in tanques_disponibles">
                        <Label :text="tanques_disponible.name"  :key="tanques_disponible.id" />
                        <TextField  hint="Litros a cargar" v-model="tanques_disponible.litros_cargados"  :key="tanques_disponible.id" @textChange="onTanquesLitrosCargadosChanged"/>                        
                    </template>
                </StackLayout>
                <StackLayout row="1" col="1" orientation="vertical">
                    <template v-for="pipa in pipas">
                        <Label :text="pipa.name"  :key="pipa.id" />
                        <TextField  hint="Litros colocados en esta pipa" v-model="pipa.litros_cargados"  :key="pipa.id" @textChange="onPipasLitrosCargadosChanged"/>                        
                    </template>
                </StackLayout>
            </GridLayout>
            <StackLayout class="hr m-10"></StackLayout>
            <GridLayout rows="auto, auto" columns="*, *" class="m-20">
                <Label text="Total de litos seleccionados de los tanques:" row="0" col="0" class="h3" textWrap="true"/>
                <Label text="Total de litos cargados a las pipas:" row="0" col="1" class="h3" textWrap="true"/>
                <Label :text="total_litros_cargados_from_tanques" row="1" col="0" />
                <Label :text="total_litros_cargados_to_pipas" row="1" col="1" />
            </GridLayout>
            <Button text="Finalizar Crear Carga" class="big_button" @tap="onFinishCrearCargaTap" horizontalAlignment="center"/>
            
            
            
            
        </StackLayout>
    </Page>
</template>

<script>
export default {
    props: ["context"],

    data: () => {
        return {
            operador: "Nombre del Operador",
            numero_de_tracto: "123",
            pipas: [{
                id: 1,
                name: "Pipa 1",
                litros_cargados: 0
            },{
                id: 2,
                name: "Pipa 2",
                litros_cargados: 0
            }],
            total_litros_cargados_from_tanques: 0,
            total_litros_cargados_to_pipas: 0
        }
    },
    computed: {
        /**
         * Compute the list of tanques passed from parent, instead of accessing
         * the value directly. This is a proper Vue convention.
         */
        tanques_disponibles() {
            return this.context || {};
        },
    },
    methods: {

        onTanquesLitrosCargadosChanged(){
            console.log("tanques disponibles changed");
            // Calculate the total amount of liters selected from the available tanks
            this.total_litros_cargados_from_tanques = this.tanques_disponibles.reduce(function(a, b){
                return a + parseInt(b.litros_cargados);
            }, 0);
        },
        onPipasLitrosCargadosChanged(){
            console.log("pipas disponibles changed");
            // Calculate the total amount of liters placed into the available pipes
            this.total_litros_cargados_to_pipas = this.pipas.reduce(function(a, b){
                return a + parseInt(b.litros_cargados);
            }, 0);
        },
        onFinishCrearCargaTap() {
            console.log("Tapped finish new carga");

            
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