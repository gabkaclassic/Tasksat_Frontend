<template>

  <login-form v-if="store.getters.loginMode" />

  <registration-form v-else />

</template>

<script>

import LoginForm from "@/js_part/views/templates/forms/auth/LoginForm.vue";
import RegistrationForm from "@/js_part/views/templates/forms/auth/RegistrationForm.vue";
import store from '@/js_part/data/store/storages'
export default {

    name: "FormTemplate",
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