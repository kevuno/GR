<template>
    <Page>
        <GridLayout rows="auto, *">
            <Label row="0" class="header" text="Detalles de la Operacion" />

            <GridLayout row="1" columns="40*, 40*, 7*, 13*" rows="auto, auto">
                <Label row="0" col="0" rowSpan="2" :text="timestampToDateString(operation.timestamp)" />
                <Label row="0" col="1" class="tanque_title" :text="operation.operation_type.toUpperCase()"></Label>
                <Label row="1" col="1" :text="operation.operador"></Label>
                <Label row="0" col="2" rowSpan="2" v-if="operation.operation_type == 'carga'" text="-" fontWeight="Bold" class="h2" />
                <Label row="0" col="2" rowSpan="2" v-else text="+" fontWeight="Bold" class="h2" />
                <Label row="0" col="3" rowSpan="2" :text="operation.total_litros_cargados_from_tanques" />
            </GridLayout>
        </GridLayout>
    </Page>
</template>

<script>
export default {
    props: ["context"],

    computed: {
        operation() {
            return this.context || {};
        }
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