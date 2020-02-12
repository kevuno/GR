<template lang="html">
    <GridLayout>
        <Button text="Tap sadkjansibadiabidaj!" @tap="goboigo"></Button>
    </GridLayout>
</template>

<script>
import routes from "../routes/";
import ModificarTanque from './ModificarTanque.vue';
export default {
    data: () => {
        return {
            message: "Informacion de los precios"
        };
    },
    methods:{
        goboigo(){
            console.log("Trying to navigateefdad");
            this.$navigateTo(ModificarTanque, {
                transition: {
                    name:'fade',
                    duration: 300
                },
                props: {
                    context: {}
                }
            }).then(function(data){
                console.log("Navigated" + data);
            }).catch(function(error){
                console.log("Navigation error" + error);
            });
        }
    }
}

import {request} from 'http';


</script>

<style lang="scss" scoped>
// Start custom common variables
@import "~@nativescript/theme/scss/variables/blue";
// End custom common variables

// Custom styles

</style>