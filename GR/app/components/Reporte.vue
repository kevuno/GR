<template>
    <Page>
        <GridLayout rows="auto, *">
            <Label row="0" class="header" text="Reporte de Operaciones" />
            <ListView row="1" for="operation in operations" @itemTap="onOperationItemTap">
                <v-template>
                    <GridLayout columns="40*, 40*, 7*, 13*" rows="auto, auto">
                        <Label row="0" col="0" rowSpan="2" :text="timestampToDateString(operation.timestamp)" />
                        <Label row="0" col="1" class="tanque_title" :text="operation.operation_type.toUpperCase()"></Label>
                        <Label row="1" col="1" :text="operation.operador"></Label>
                        <Label row="0" col="2" rowSpan="2" v-if="operation.operation_type == 'carga'" text="-" fontWeight="Bold" class="h2" />
                        <Label row="0" col="2" rowSpan="2" v-else text="+" fontWeight="Bold" class="h2" />
                        <Label row="0" col="3" rowSpan="2" :text="operation.total_litros_cargados_from_tanques" />
                    </GridLayout>
                </v-template>
            </ListView>
        </GridLayout>
    </Page>
</template>

<script>
import firebase from 'nativescript-plugin-firebase';
import OperationDetails from './OperationDetails.vue';

export default {
    props: ["context"],

    data: () => {
        return {
            operations: []
        }
    },
    mounted: function () {
        console.log("Reading operaciones from DB");
        firebase.getValue('/operations')
            .then(result => {
                // Save each tanque obj into the array of tanques
                let operations_list_obj = result.value;
                for(var operation_key in operations_list_obj) {
                    if(operations_list_obj.hasOwnProperty(operation_key)) {
                        // Save tanque obj into Vue list of tanques
                        let operation_obj = operations_list_obj[operation_key];
                        operation_obj.id = operation_key; // Add ID property for easy queryings
                        this.operations.push(operation_obj);
                    }
                }
                
            })
            .catch(error => console.log("Error: " + error));
    },
    computed: {
        
    },
    methods: {
        onOperationItemTap(operation){
            console.log("Tapped on operation: " + operation);
            console.dir(operation.item);
            this.$showModal(OperationDetails, {
                transition: {
                    name:'fade',
                    duration: 300
                },
                props: {
                    context: operation.item
                }
            }).then(msg => console.log(msg)).catch(error => console.log(error));
            console.log("Modal oppened? " + operation);

        },

        timestampToDateString(timestamp){
            return new Date(timestamp).toDateString();
        }


        
    }
};
</script>