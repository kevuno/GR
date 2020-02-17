<template>
    <Page>
        <GridLayout rows="auto, *">
            <Label row="0" class="header" text="Reporte de Operaciones" />
            <ListView row="1" for="operation in operations" @itemTap="onOperationItemTap">
                <v-template>
                    <Label :text="operation.operation_type" />
                </v-template>
            </ListView>
        </GridLayout>
    </Page>
</template>

<script>
import firebase from 'nativescript-plugin-firebase';

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
        }

        
    }
};
</script>