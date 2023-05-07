<template>

    <form-template
            :method="properties.method"
            :sign-header="properties.signHeader"
            :sign-button="properties.signButton"
            :link="properties.link"
            :signLink="properties.signLink"
            @referer="referer"
            @submit.prevent="signUp"
    >
        <div class="input-form">
            <input
                    v-if="store.getters.userMode"
                    type="text"
                    v-model.trim=form.email placeholder="Email"
                    :class= "`input-form__email ${v$.form.email.$dirty && v$.form.email.$error ? 'input-form_station_error' : ''}`"
                    name="email"
            >
            <form-errors
                    v-show="v$.form.email.$dirty && v$.form.email.$error"
                    :errors="v$.form.email.$errors"
            />
        </div>

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
                    v-model.trim=form.password placeholder="Password"
                    :class= "`input-form__password ${v$.form.password.$dirty && v$.form.password.$error ? 'input-form_station_error' : ''}`"
                    name="password">
            <form-errors
                    v-show="v$.form.password.$dirty && v$.form.password.$error"
                    :errors="v$.form.password.$errors"
            />
        </div>

        <div class="input-form">
            <input
                    type="password"
                    v-model.trim=form.confirmPassword placeholder="Confirm password"
                    :class= "`input-form__password ${v$.form.password.$dirty && v$.form.password.$error ? 'input-form_station_error' : ''}`"
                    name="confirmPassword"
            >
            <form-errors
                    v-show="v$.form.confirmPassword.$dirty && v$.form.confirmPassword.$error"
                    :errors="v$.form.confirmPassword.$errors"
            />

        </div>
        <div v-if="!store.getters.userMode">
        <input
            type="radio"
            v-for="(variant, key) in creationModes"
            :key="key"
            @select="iamSelect(variant)"
            name="iam"
            :value="variant"
        />
        </div>
        <form-violations
                v-show="!violations.empty"
                :violations="violations"
        />
    </form-template>

</template>

<script>
import FormTemplate from "../FormTemplate.vue";
import {useVuelidate} from "@vuelidate/core";
import {helpers, email, maxLength, minLength, required} from "@vuelidate/validators";
import FormErrors from "../errors/FormErrors.vue";
import FormViolations from "../errors/FormViolations.vue";
import store from '../../../../data/store/storages'
import creationModes from "../../../../data/values/modes/creationModes";
import appModes from "../../../../data/values/modes/appModes";

export default {
    name: "RegistrationForm",
    computed: {
        creationModes() {
            return creationModes
        }
    },
    components: {FormErrors, FormViolations, FormTemplate},
    setup: () => ({ v$: useVuelidate() }),
    data() {
        return {
            form: {
                login: '',
                password: '',
                confirmPassword: '',
                email: '',
                iam: (store.getters.userMode) ? appModes.user : '',
            },
            properties: {
                signButton: "Sign up",
                signHeader: "Registration",
                signLink: "Have a account? Sign in",
                link: "/home",
                method: "POST"
            },
            violations: [],
            store: store
        }
    },
    methods: {
        signUp() {

            if(!this.validation())
                return

            this.$tasksat.auth.registration({
                login: this.form.login,
                email: this.form.email,
                password: this.form.password,
                iam: this.form.iam
            })
                .then(res => res.text()).then(body => {
                this.violations = []
                this.violations = JSON.parse(body)['violations']

                if(this.violations.length !== 0) {
                    return;
                }

                this.$emit('success')
            })

        },
        referer() {
            this.$modes.setMainPageLoginMode()
        },
        success() {

        },
        validation() {

            this.v$.form.$touch()

            return !this.v$.form.$error
        },
        iamSelect(variant) {
            this.form.iam = variant
        },
    },
    validations() {

        return {

            form: {
                login: {
                    required,
                    maxLength: maxLength(32),

                },
                email: {
                    required, email
                },
                password: {
                    required,
                    minLength: minLength(8),
                    validPassword: helpers.withMessage("Password must contains 1 lower and 1 upper register character, 1 cipher and 1 special symbol", helpers.regex(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!,?./])(?=\S+$).{8,}$/))
                },
                confirmPassword: {
                    validConfirm: helpers.withMessage("Passwords must be equal", (value) => value === this.form.password)
                }
            },
        }
    },
}
</script>

<style scoped>

  @import "../../../../../css_part/components/form.css";


</style>