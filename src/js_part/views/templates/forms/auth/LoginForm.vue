<template>

    <form-template
            :method="properties.method"
            :sign-header="properties.signHeader"
            :sign-button="properties.signButton"
            :link="properties.link"
            :signLink="properties.signLink"
            @referer="referer"
            @submit.prevent="signIn"
    >
        <div class="input-form">
            <input
                    type="text"
                    v-model.trim="form.login"
                    placeholder="Login"
                    :class= "`input-form__login ${v$.form.login.$dirty && v$.form.login.$error ? 'input-form_station_error' : ''}`"
                    name="login"
            >
            <form-errors
                    v-show="v$.form.login.$dirty && v$.form.login.$error"
                    :errors="v$.form.login.$errors"
            />
        </div>
        <div class="input-form">
            <input
                    type="password"
                    v-model.trim=form.password
                    placeholder="Password"
                    :class= "`input-form__password ${v$.form.password.$dirty && v$.form.password.$error ? 'input-form_station_error' : ''}`"
                    name="password">
            <form-errors
                    v-show="v$.form.password.$dirty && v$.form.password.$error"
                    :errors="v$.form.password.$errors"
            />
        </div>

        <div
            v-for="(variant, key) in [appModes.admin, appModes.user, appModes.worker]"
            :key="key"
        >
            <input
                type="radio"
                @input="iamSelect(variant)"
                name="iam"
                :id="variant"
                :value="variant"
            />
            <label :for="variant">Login like {{ variant.toLowerCase() }}</label>
        </div>
        <form-violations
                v-show="!violations.empty"
                :violations="violations"
        />

    </form-template>

</template>

<script>
import {useVuelidate} from "@vuelidate/core";
import {required} from "@vuelidate/validators";
import FormTemplate from "../FormTemplate.vue";
import FormErrors from "../errors/FormErrors.vue";
import FormViolations from "../errors/FormViolations.vue";
import appModes from "../../../../data/values/modes/appModes";
import router from "@/js_part/routing/router";
import store from "@/js_part/data/store/storages";


export default {
    name: "LoginForm",
    computed: {
        appModes() {
            return appModes
        }
    },
    components: {FormErrors, FormViolations, FormTemplate},
    setup: () => ({ v$: useVuelidate() }),
    props: {

        iamList: {
            default: []
        }
    },
    data() {
        return {
            form: {
                login: '',
                password: '',
                iam: appModes.user
            },
            properties: {
                signButton: "Sign in",
                signHeader: "Login",
                method: "GET",
                signLink: "Haven't a account? Sign up",
                link: "/home",
            },
            violations: []
        }
    },
    methods: {

        signIn() {

            if(!this.validation())
                return

            this.$tasksat.auth.login({
                login: this.form.login,
                password: this.form.password,
                iam: this.form.iam,
            }).then(res => {

                    return res.json()
                }
            ).then(t => t['token'])
                .then(token => {
                    this.$api.login(token, this.form.iam)
                })
                .then(() => {
                    console.log(this.violations);
                    if(this.violations.length > 0)
                        return

                    console.log(this.form.iam);
                    if(this.form.iam === appModes.user)
                        router.push({path: '/tasks'})
                    if(this.form.iam === appModes.worker)
                        router.push({path: '/workspace'})
                    if(this.form.iam === appModes.admin)
                        router.push({path: '/accounts'})
            })
        },
        iamSelect(variant) {
          this.form.iam = variant
        },
        referer() {

            this.$modes.setMainPageRegistrationMode()
        },
        validation() {

            this.v$.form.$touch()

            return !this.v$.form.$error
        }
    },
    validations() {

        return {

            form: {
                login: {
                    required,
                },
                password: {
                    required,
                },
            },
        }
    },
}
</script>

<style scoped>
  @import "@/css_part/components/form.css";
</style>