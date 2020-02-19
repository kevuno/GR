<template>
    <Page>
        <ScrollView orientation="vertical">
            <StackLayout>
                <Label class="header" :text="content_strings.title" />
                <GridLayout rows="auto, auto" columns="150, 100" horizontalAlignment="center">
                    <Label row="0" col="0" text="Operador: "  fontWeight="Bold" />
                    <Label row="0" col="1" :text="operation.operador" />
                    <Label row="1" col="0" text="Numero de tracto:" fontWeight="Bold" />
                    <Label row="1" col="1" :text="operation.numero_de_tracto" />
                </GridLayout>
                <StackLayout class="hr m-10"></StackLayout>
                    <FlexboxLayout flexDirection="column">
                        <!-- Right arrow icon if operation type is carga, otherwise the arrow points left -->
                        <Label v-if="operation.operation_type == 'carga'" text.decode="&#xf061;" alignSelf="center" height="20" class="fas t-20"></Label>
                        <Label v-else text.decode="&#xf060;" alignSelf="center" height="20" class="fas t-20"></Label>
                    </FlexboxLayout>         
                    <GridLayout rows="auto, auto" columns="50*, 50*" class="m-20"> <!-- Format for %width of the cells -->
                        <Label row="0" col="0" class="h2"  :text="content_strings.tanques_secc_label" textWrap="true" />
                        <Label row="0" col="1" class="h2"  :text="content_strings.pipas_secc_label" textWrap="true" />
                        
                        <StackLayout row="1" col="0" orientation="vertical">                   
                            <template v-for="tanque in operation.tanques_usados">                        
                                <GridLayout rows="auto, auto" columns="auto, auto, *" :key="tanque.id">                            
                                    <Label row="0" col="0" colSpan="3" :text="tanque.name"  class="tanque_title"  />
                                    <Label row="1" col="0" :text="tanque.litros_cargados" :key="tanque.id" fontWeight="Bold"/>
                                </GridLayout>
                            </template>
                        </StackLayout>
                        <StackLayout row="1" col="1" orientation="vertical">
                            <template v-for="pipa in operation.pipas">                        
                                <Label :text="pipa.name"  :key="pipa.id" class="tanque_title" />
                                <Label v-model="pipa.litros_cargados"  :key="pipa.id" fontWeight="Bold" />                        
                            </template>
                        </StackLayout>
                    </GridLayout>            
                    <StackLayout class="hr m-10"></StackLayout>
                    <GridLayout rows="auto, auto" columns="50*, 50*" class="m-20">
                        <Label :text="content_strings.total_tanques_label" row="0" col="0" class="h3" textWrap="true" fontWeight="Bold" />                
                        <Label :text="content_strings.total_pipas_label" row="0" col="2" class="h3" textWrap="true" fontWeight="Bold" textAlignment="right"/>
                        <Label :text="operation.total_litros_cargados_from_tanques" row="1" col="0" class="h1" horizontalAlignment="center" />
                        <Label :text="operation.total_litros_cargados_to_pipas" row="1" col="2" class="h1" horizontalAlignment="center" />
                    </GridLayout>
            </StackLayout>
        </ScrollView>
    </Page>
</template>

<script>
export default {
    props: ["context"],

    computed: {
        operation() {
            return this.context || {};
        },
        content_strings(){
            if(this.operation.operation_type == "carga"){
                return {
                    title: "Detalles de la Carga",
                    tanques_secc_label: "Litros tomados de los tanques",
                    pipas_secc_label: "Litros depositados a pipas",
                    total_tanques_label: "Total de litros seleccionados de los tanques:",
                    total_pipas_label: "Total de litros cargados a las pipas",
                }

            }else if(this.operation.operation_type == "descarga"){
                return {
                    title: "Detalles de la descarga",
                    tanques_secc_label: "Litros depositados en tanques",
                    pipas_secc_label: "Litros tomados de las pipas",
                    total_tanques_label: "Total de litros cargados a tanques:",
                    total_pipas_label: "Total de litros seleccionados de las pipas:",
                }
            }else{
                // Error
                console.error("Error creando transferencia, tipo de operacion invalido");
            }
        },
    },
    methods: {
        timestampToDateString(timestamp){
            return new Date(timestamp).toDateString();
        }
    }
};
</script>

<style scoped lang="scss">
// Start custom common variables
@import "~@nativescript/theme/scss/variables/blue";
// End custom common variables

// Custom styles

</style>