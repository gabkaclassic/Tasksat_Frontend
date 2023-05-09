
<template>

    <div v-if="task.type === 'QUESTION'">
        <input
                type="text"
                v-model.trim=form.answer placeholder="Your answer"
                :class= "`input-form__password ${wrong ? 'input-form_station_error' : ''}`"
                name="answer">
    </div>
    <div v-else-if="task.type === 'TEST'">

        <div
            v-for="(value, key) in toRaw(task.variants)"
            :key="key"
        >
            <input
                type="radio"
                @input="variantSelect(value)"
                name="variant"
                :id="key"
                :value="value"
            />
            <label :for="variant">{{ value }}</label>
        </div>
    </div>

    <button @click="checkSolve"> Submit </button>

</template>

<script>
import {defineComponent, toRaw} from 'vue'

export default defineComponent({
    name: "SolvingPart",
    props: {
      task: {
          required: true,
      }
    },
    data() {
        return {
            form: {
                answer: '',
                taskId: this.task.id,
                taskType: this.task.type,
            },
            wrong: false,
        }
    },
    methods: {
        toRaw,

        checkSolve() {

            if(this.task.type === 'TEST' && this.form.answer.length === 0) {
                this.wrong = true
                return
            }

            this.$tasksat.tasks.check(this.form)
                .then(res => res.json())
                .then(res => {
                    this.wrong = !res['right']
                })
                .then(() => {

                    if(!this.wrong) {
                        this.$emit('right')
                    }
                })
        },
        variantSelect(variant) {
            this.form.answer = variant
        },
    },
})
</script>



<style scoped>
  @import "@/css_part/components/form.css";
</style>