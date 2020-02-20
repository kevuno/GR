<template lang="html">
    <StackLayout orientation="vertical">
        <Button class="big_button"text="Cerrar Sesion" @tap="onLogOutTap" />
    </StackLayout>
</template>

<script>
import Login from "./Login.vue";
export default {
    data: () => {
    },
    methods:{
        onLogOutTap(){
            console.log("Logging out...");
            var vue_ref = this;
            this.$backendService.logout().then(function(data){
                console.log("Logout Successful" + data);
                vue_ref.$navigateTo(Login);
            }).catch(function(error){
                console.log("Logout error" + error);
            });
        }
    }
}
</script>

<style lang="scss" scoped>
// Start custom common variables
@import "~@nativescript/theme/scss/variables/blue";
// End custom common variables
</style>