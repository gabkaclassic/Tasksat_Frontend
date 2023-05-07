<template>

    <label class="label label_station_error">
        <li v-for="error in errors.slice(0, maxElements)" :key="error">
            {{ error.$message }}
        </li>
    </label>

</template>

<script>
import Integer from "vuelidate/lib/validators/integer";

export default {
    name: "FormErrors",
    props: {
        errors: {
            type: Array,
            required: true,
            default: () => [],
        },
        maxElements: {
            type: Integer,
            default: 1,
        }
    }
}
</script>

<style scoped>
  @import "../../../../../css_part/components/form.css";

</style>