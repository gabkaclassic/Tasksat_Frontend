<template>

  <login-form v-show="store.getters.loginMode" />

  <registration-form v-show="store.getters.registrationMode" />

</template>

<script>

import LoginForm from "@/js_part/views/templates/forms/auth/LoginForm.vue";
import RegistrationForm from "@/js_part/views/templates/forms/auth/RegistrationForm.vue";
import store from '@/js_part/data/store/storages'
export default {

    name: "HomePage",
    components: {LoginForm, RegistrationForm},
    data() {
        return {
            store: store
        }
    }

}

</script>

<style scoped>

</style>