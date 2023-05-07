<template>

    <section class="modal">
        <form
                class="form"
                method="{{ method }}"
        >
            <h2 class="form__registration">{{ signHeader }}</h2>

            <slot />

            <div class="input-form">
                <input
                        type="submit"
                        :value=signButton
                        class = "input-form__bottom_registration"
                >
                <a href="{{ link }}" class="link link_active_sign-in" @click.prevent="referer"> {{ signLink }} </a>
            </div>
        </form>
    </section>

</template>

<script>

export default {

    name: "FormTemplate",
    props: {
        link: {
            type: String,
            default: '/home'
        },
        signLink: {
            type: String,
            default: 'Go to homepage'
        },
        signButton: {
            type: String,
            required: true
        },
        signHeader: {
            type: String,
            required: true
        },
        method: {
            type: String,
            required: true
        },
    },
    methods: {
        referer() {
            this.$emit('referer')
        }
    }

}
</script>

<style scoped>

    @import "@/css_part/components/form.css";
    @import "@/css_part/components/modal.css";
</style>