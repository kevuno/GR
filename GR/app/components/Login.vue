<template>
    <Page actionBarHidden="true">
        <FlexboxLayout class="page">
            <StackLayout class="form">
                <Image class="logo" src="~/images/logo_small.jpg"></Image>
                

                <GridLayout rows="auto, auto, auto">
                    <StackLayout row="0" class="input-field">
                        <TextField class="input" hint="Email" :isEnabled="!processing"
                            keyboardType="email" autocorrect="false"
                            autocapitalizationType="none" v-model="user.email"
                            returnKeyType="next" @returnPress="focusPassword"></TextField>
                        <StackLayout class="hr-light"></StackLayout>
                    </StackLayout>

                    <StackLayout row="1" class="input-field">
                        <TextField class="input" ref="password" :isEnabled="!processing"
                            hint="Password" secure="true" v-model="user.password"
                            returnKeyType="done"
                            @returnPress="focusConfirmPassword"></TextField>
                        <StackLayout class="hr-light"></StackLayout>
                    </StackLayout>

                    <ActivityIndicator rowSpan="3" :busy="processing"></ActivityIndicator>
                </GridLayout>

                <Button text="Iniciar Sesión" :isEnabled="!processing"
                    @tap="submit" class="btn btn-primary m-t-20"></Button>
            </StackLayout>
        </FlexboxLayout>
    </Page>
</template>

<script>
    import routes from "../routes/";

    export default {
        data() {
            return {
                processing: false,
                user: {
                    email: "",
                    password: "",
                    confirmPassword: ""
                }
            };
        },
        methods: {

            submit() {
                if (!this.user.email || !this.user.password) {
                    this.alert(
                        "Porfavor, proporcione un correo y una contraseña."
                    );
                    return;
                }

                this.processing = true;
                this.login();
            },

            login() {
                var vue_ref = this;

                this.$backendService
                    .login(this.user.email, this.user.password)
                    .then(() => {
                        console.log("Call resolved");
                        console.log("Call 2");
                        console.log("Call 3");
                        vue_ref.processing = false;
                        vue_ref.$navigateTo(routes.home);

                        console.log("This shit is not navigating, why????");

                    })
                    .catch(() => {
                        console.log("Call failed");
                        vue_ref.processing = false;
                        vue_ref.alert(
                            "Unfortunately we could not find your account."
                        );
                    });
            },

            focusPassword() {
                this.$refs.password.nativeView.focus();
            },

            alert(message) {
                return alert({
                    title: "GR",
                    okButtonText: "OK",
                    message: message
                });
            }
        }
    };
</script>

<style scoped>
    .page {
        align-items: center;
        flex-direction: column;
    }

    .form {
        margin-left: 30;
        margin-right: 30;
        flex-grow: 2;
        vertical-align: middle;
    }

    .logo {
        margin-bottom: 12;
        height: 90;
        font-weight: bold;
    }

    .header {
        horizontal-align: center;
        font-size: 25;
        font-weight: 600;
        margin-bottom: 70;
        text-align: center;
        color: #D51A1A;
    }

    .input-field {
        margin-bottom: 25;
    }

    .input {
        font-size: 18;
        placeholder-color: #A8A8A8;
    }

    .input:disabled {
        background-color: white;
        opacity: 0.5;
    }

    .btn-primary {
        margin: 30 5 15 5;
    }

    .login-label {
        horizontal-align: center;
        color: #A8A8A8;
        font-size: 16;
    }

    .sign-up-label {
        margin-bottom: 20;
    }

    .bold {
        color: #000000;
    }
</style>
