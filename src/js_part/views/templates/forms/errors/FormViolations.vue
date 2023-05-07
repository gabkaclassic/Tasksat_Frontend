<template>

    <label class="label label_station_error">
        <li v-for="(violation, id) in violations.slice(0, maxElements)"
            :key="id"
        >
            <div>{{ violation }}</div>
        </li>
    </label>

</template>

<script>
import Integer from "vuelidate/lib/validators/integer";

export default {
    name: "FormsViolations",
    props: {
        violations: {
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