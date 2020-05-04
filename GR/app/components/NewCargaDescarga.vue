<template>
    <Page>
        <ActionBar>
            <Label text="Nueva Operacion"></Label>
        </ActionBar>
        <ScrollView orientation="vertical">
            <StackLayout>
                <Label class="header" :text="content_strings.title" />
                <GridLayout rows="auto, auto" columns="auto, auto" horizontalAlignment="center">
                    <Label text="Operador: " row="0" col="0" />
                    <TextField row="0" col="1" hint="Nombre de Operador" v-model="operador" />
                    <Label text="Numero de tracto:" row="1" col="0" />
                    <TextField row="1" col="1" v-model="numero_de_tracto" />
                </GridLayout>
                <StackLayout class="hr m-10"></StackLayout>
                    <FlexboxLayout flexDirection="column">
                        <!-- Right arrow icon if operation type is carga, otherwise the arrow points left -->
                        <Label v-if="operation_type == 'carga'" text.decode="&#xf061;" alignSelf="center" height="40" class="fas t-20"></Label>
                        <Label v-else text.decode="&#xf060;" alignSelf="center" height="40" class="fas t-20"></Label>
                    </FlexboxLayout>         
                    <GridLayout rows="auto, auto" columns="60*, 40*" class="m-20"> <!-- Format for %width of the cells -->
                        <Label row="0" col="0" class="h3" fontWeight="Bold" :text="content_strings.tanques_secc_label" textWrap="true" />
                        <Label row="0" col="1" class="h3" fontWeight="Bold" :text="content_strings.pipas_secc_label" textWrap="true" />
                        
                        <StackLayout row="1" col="0" orientation="vertical">                   
                            <template v-for="tanque_disponible in tanques_disponibles">                        
                                <GridLayout rows="auto, auto" columns="auto, auto, *" :key="tanque_disponible.id">                            
                                    <Label row="0" col="0" colSpan="3" :text="tanque_disponible.name"  class="tanque_title"  />                            
                                    <Label row="1" col="0" text="Litros disp. = "  style="font-style: italic;" />                            
                                    <Label row="1" col="1" :text="tanque_disponible.current_amount"  style="font-style: italic;" />
                                    <TextField  row="1" col="2" hint="Litros a cargar"
                                                v-model="tanque_disponible.litros_cargados"
                                                :key="tanque_disponible.id" 
                                                @textChange="onTanquesLitrosCargadosChanged"
                                                />
                                </GridLayout>
                            </template>
                        </StackLayout>
                        <StackLayout row="1" col="1" orientation="vertical">
                            <template v-for="pipa in pipas">                        
                                <Label :text="pipa.name"  :key="pipa.id" class="tanque_title" />
                                <TextField  hint="Litros colocados en esta pipa" v-model="pipa.litros_cargados"  :key="pipa.id" @textChange="onPipasLitrosCargadosChanged"/>                        
                            </template>
                        </StackLayout>
                    </GridLayout>            
                    <StackLayout class="hr m-10"></StackLayout>
                    <GridLayout rows="auto, auto, auto" columns="50*, 10*, 40*" class="m-20">
                        <!-- First row has the total labels -->
                        <Label :text="content_strings.total_tanques_label" row="0" col="0" class="h3" textWrap="true" fontWeight="Bold" textAlignment="left"/>
                        <Label :text="content_strings.total_pipas_label" row="0" col="2" class="h3" textWrap="true" fontWeight="Bold" textAlignment="right"/>

                        <!-- Second row has a little checkmark if the amounts in the inputs are valid, a cross otherwise -->
                        <Label text.decode="&#xf00c;" v-if="are_amounts_valid" row="1" col="1" class="fas t-14"></Label>
                        <Label text.decode="&#xf00d;" v-else row="1" col="1" class="fas t-14"></Label>

                        <!-- Third row has the total values -->
                        <Label :text="total_litros_cargados_from_tanques" row="2" col="0" class="h1" horizontalAlignment="center" />
                        <Label text="=" v-if="are_amounts_valid" row="2" col="1" class="h21" fontWeight="Bold"></Label>
                        <Label :text="total_litros_cargados_to_pipas" row="2" col="2" class="h1" horizontalAlignment="center" />
                    </GridLayout>
                    <Button :text="content_strings.submit_button_label"  :isEnabled="are_amounts_valid" class="big_button" @tap="onFinishCrearCargaTap" horizontalAlignment="center"/>
            </StackLayout>
        </ScrollView>
    </Page>
</template>

<script>
import firebase from 'nativescript-plugin-firebase';

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
            return this.context.tanques_disponibles || {};
        },

        /**
         * Check the type of operation, carga or descarga
         */
        operation_type() {
            return this.context.operation_type || {};
        },

        content_strings(){
            if(this.operation_type == "carga"){
                return {
                    title: "Crear Carga a Pipas",
                    tanques_secc_label: "Seleccionar litros de los tanques",
                    pipas_secc_label: "Seleccionar litros que iran a pipas",
                    total_tanques_label: "Total de litros seleccionados de los tanques:",
                    total_pipas_label: "Total de litros cargados a las pipas",
                    submit_button_label: "Finalizar Carga"
                }

            }else if(this.operation_type == "descarga"){
                return {
                    title: "Crear Descarga a Pipas",
                    tanques_secc_label: "Seleccionar litros que iran a tanques",
                    pipas_secc_label: "Seleccionar litros de las pipas",
                    total_tanques_label: "Total de litros cargados a tanques:",
                    total_pipas_label: "Total de litros seleccionados de las pipas:",
                    submit_button_label: "Finalizar Descarga"
                }
            }else{
                // Error
                console.error("Error creando transferencia, tipo de operacion invalido");
            }
        },
        are_amounts_valid(){
            return this.total_litros_cargados_from_tanques == this.total_litros_cargados_to_pipas;
        }
    },
    methods: {

        onTanquesLitrosCargadosChanged(){
            console.log("tanques disponibles changed");
            // Calculate the total amount of liters selected from the available tanks
            this.total_litros_cargados_from_tanques = this.tanques_disponibles.reduce(function(a, b){
                // Clean and check if string is valid
                let litros_quantity = b.litros_cargados;
                if (typeof litros_quantity === 'string'){
                    litros_quantity = litros_quantity.replace(/\s/g,'');
                }
                litros_quantity = litros_quantity == "" ? 0 : litros_quantity;
                return a + parseInt(litros_quantity);
            }, 0);
        },
        onPipasLitrosCargadosChanged(){
            console.log("pipas disponibles changed");
            // Calculate the total amount of liters placed into the available pipes
            this.total_litros_cargados_to_pipas = this.pipas.reduce(function(a, b){
                // Clean and check if string is valid
                let litros_quantity = b.litros_cargados;
                if (typeof litros_quantity === 'string'){
                    litros_quantity = litros_quantity.replace(/\s/g,'');
                }
                litros_quantity = litros_quantity == "" ? 0 : litros_quantity;
                return a + parseInt(litros_quantity);
            }, 0);
        },
        onFinishCrearCargaTap() {
            console.log("Tapped finish new carga");
            // Count number of tanks used
            const number_of_tanks_used = this.tanques_disponibles.reduce(function(a, b){
                // Clean and check if string is valid
                let litros_quantity = b.litros_cargados;
                if (typeof litros_quantity === 'string'){
                    litros_quantity = litros_quantity.replace(/\s/g,'');
                }
                // Add one to count if value is not empty
                if(litros_quantity != "" && litros_quantity != 0){
                    return a + 1;
                }
                return a + 0;
            }, 0);

            // Count number of pipes used
            const number_of_pipes_used = this.pipas.reduce(function(a, b){
                // Clean and check if string is valid
                let litros_quantity = b.litros_cargados;
                if (typeof litros_quantity === 'string'){
                    litros_quantity = litros_quantity.replace(/\s/g,'');
                }
                // Add one to count if value is not empty
                if(litros_quantity != "" && litros_quantity != 0){
                    return a + 1;
                }
                return a + 0;
            }, 0);

            const confirmation_str = `Esta seguro de que quiere continuar? \n Resumen: \n\n Tanques utilizados: ${number_of_tanks_used}.\n Pipas cargadas utilizadas: ${number_of_tanks_used}.`
            let confirm_obj_strs = {
                title: "Confirmar operacion",
                message: confirmation_str,
                okButtonText: "OK",
                cancelButtonText: "Cancelar"
            }
            // Confirm:
            confirm(confirm_obj_strs).then(result => {
                if(result){
                    console.log(result);
                    // Save all necessary info form the transaction in DB
                    this.saveOperationToDB();

                    console.log("uooooo");

                    // Perform substraction of loaded amounts from each tank
                    this.tanques_disponibles.forEach(tanque => {
                        console.log(tanque);
                        // Subtract or Add liters from or to tanks (depending of the type of operation) and reset values
                        if(this.operation_type == "carga"){
                            tanque.current_amount -= parseInt(tanque.litros_cargados);
                        }else if(this.operation_type == "descarga"){
                            tanque.current_amount += parseInt(tanque.litros_cargados);
                        }else{
                            // Error
                            console.error("Error creando transferencia, tipo de operacion invalido");
                        }
                        // Save new content of tanque in DB
                        var new_tanque_db_obj = {};
                        new_tanque_db_obj[tanque.id] = tanque;

                        firebase.update(
                            '/tanques',
                            new_tanque_db_obj
                        );

                        // Clear Values in the form
                        tanque.litros_cargados = 0;
                    });

                    // Clear values of pipas in the form
                    this.pipas.forEach(pipa => {
                        pipa.litros_cargados = 0;
                    });

                    alert('Se a creado la carga satisfactoriamente!');
                    // TODO UPDATE in DB 

                }
            });

        },
        saveOperationToDB(){
            var operation_data = {
                operador: this.operador,
                numero_de_tracto: this.numero_de_tracto,
                pipas: this.pipas,
                total_litros_cargados_from_tanques: this.total_litros_cargados_from_tanques,
                total_litros_cargados_to_pipas: this.total_litros_cargados_to_pipas,
                tanques_usados: [],
                operation_type: this.operation_type,
                timestamp: firebase.ServerValue.TIMESTAMP
            }

            this.tanques_disponibles.forEach(function(tanque){
                if(tanque.litros_cargados != 0){
                    // Add tanques all tanques that were used
                    operation_data.tanques_usados.push(tanque);
                }
            });
            console.log(operation_data);

            var new_tanque_db = firebase.push(
                "operations/",
                operation_data
            ).then(
                function (result) {
                    console.log("created entry for new operation, key: " + result.key);
                }
            ).catch(error => console.log("Error: " + error));
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