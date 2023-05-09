<template>

    <form-template
            :method="properties.method"
            :sign-header="(store.getters.adminMode) ? 'Creation account' : properties.signHeader"
            :sign-button="(store.getters.adminMode) ? 'Create account' : properties.signButton"
            :link="(store.getters.adminMode) ? '/panel' : properties.link"
            :signLink="(store.getters.adminMode) ? 'Go to panel' :properties.signLink"
            @referer="referer"
            @submit.prevent="signUp"
    >
        <div class="input-form">
            <input
                    v-if="store.getters.unauthorizedMode"
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
        <div v-if="store.getters.adminMode">
            <div
                v-for="(variant, key) in creationModes"
                :key="key">
                    <input
                        type="radio"
                        @input="iamSelect(variant)"
                        name="iam"
                        :value="variant"
                    />
                <label for="iam" >Create a {{ variant.toLowerCase() }} </label>
            </div>
        </div>
        <form-violations
                v-show="!violations.empty"
                :violations="violations"
        />
    </form-template>

</template>

<script>
import FormTemplate from "@/js_part/views/templates/forms/FormTemplate.vue";
import {useVuelidate} from "@vuelidate/core";
import {helpers, email, maxLength, minLength, required} from "@vuelidate/validators";
import FormErrors from "@/js_part/views/templates/forms/errors/FormErrors.vue";
import FormViolations from "@/js_part/views/templates/forms/errors/FormViolations.vue";
import store from '@/js_part/data/store/storages'
import creationModes from "@/js_part/data/values/modes/creationModes";
import appModes from "@/js_part/data/values/modes/appModes";
import router from "@/js_part/routing/router";

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
                iam: appModes.user,
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
                .then(res => res.json()).then(res => {
                this.violations = res['violations']
            })
                .then(() => {

                    if(this.violations.length === 0) {
                        this.$modes.setMainPageLoginMode()
                    }
                })

        },
        referer() {
            if(store.getters.adminMode) {
                router.push({path: '/accounts'})

            }

            this.$modes.setMainPageLoginMode()
        },
        success() {
            this.$modes.setMainPageLoginMode()
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
                    validEmail: helpers.withMessage('Invalid email', (value) => {
                        return !store.getters.adminMode && email && required ||
                            store.getters.adminMode
                    })
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
    created() {
        if(store.getters.userMode)
            router.push({alias: '/user'})
        if(store.getters.workerMode)
            router.push({alias: '/worker'})
    }
}
</script>

<style scoped>

  @import "@/css_part/components/form.css";


</style>