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
            <GridLayout rows="auto, auto" columns="*, *">
                <Label row="0" col="0" class="h3" fontWeight="Bold" text="Seleccionar litros de los tanques" textWrap="true" />
                <Label row="0" col="1" class="h3" fontWeight="Bold" text="Selecciona cuantos litros entraran en las pipas" textWrap="true" />
                
                <StackLayout row="1" col="0" orientation="vertical">
                    <!-- <Label v-for="tanque_disponible in tanques_disponibles" :text="tanque_disponible.name"  :key="tanque_disponible.id"></label>                    
                    <TextField v-for="tanque_disponible in tanques_disponibles" :text="tanque_disponible.name"  :key="tanque_disponible.id"/>
                     -->
                    <template v-for="tanques_disponible in tanques">
                        <Label :text="tanques_disponible.name"  :key="tanques_disponible.id" />
                        <TextField  hint="Litros a cargar" :text="tanques_disponible.litros_cargados"  :key="tanques_disponible.id"/>                        
                    </template>
                </StackLayout>
                <StackLayout row="1" col="1" orientation="vertical">
                    <Label text="Pipa 1" />
                    <TextField text="0" />
                    <Label text="Pipa 2" />
                    <TextField text="0" />
                </StackLayout>
            </GridLayout>
            <StackLayout class="hr m-10"></StackLayout>
            <GridLayout rows="auto, auto" columns="*, *">
                <Label text="Total de litos seleccionados de los tanques:" row="0" col="0" class="h3" textWrap="true"/>
                <Label text="Total de litos cargados a las pipas:" row="0" col="1" class="h3" textWrap="true"/>
                <Label text="Total tanques" row="1" col="0" />
                <Label text="Total pipas" row="1" col="1" />
            </GridLayout>
            <Button text="Finalizar Crear Carga" tap="" horizontalAlignment="center"/>
            
            
            
            
        </StackLayout>
    </Page>
</template>

<script>
export default {
    props: ["context"],

    computed: {
        tanques() {
            return this.context || {};
        }
    },
    data: () => {
        return {
            operador: "Nombre del Operador",
            numero_de_tracto: "123",
            tanques_disponibles: [],
            tanques_usados: [{
                id: 4,
                name: "Tanque 4",
                max_cap: 2100,
                current_amount: 205,
                
            }],
            pipas_usadas: []
        }
    },
    watch: {
    },
};
</script>

<style scoped lang="scss">
// Start custom common variables
@import "~@nativescript/theme/scss/variables/blue";
// End custom common variables

// Custom styles

</style>