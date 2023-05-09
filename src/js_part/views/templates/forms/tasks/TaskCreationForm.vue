
<template>

    <div>
      <form-template
              :method="properties.method"
              :sign-header="properties.signHeader"
              :sign-button="properties.signButton"
              :link="properties.link"
              :signLink="properties.signLink"
              @submit.prevent="createTask"
      >

          <div
            v-for="m in modes"
            :key="m"
          >
            <input type="radio"
                   :value="m"
                   name="modes"
                   :id="m"
                   @input="changeMode(m)"
            >
            <label :for="m"> {{ m }} </label>

          </div>

          <div class="input-form">
              <input
                      type="text"
                      v-model.trim="form.title"
                      placeholder="Task title"
                      :class= "`input-form__login ${v$.form.title.$dirty && v$.form.title.$error ? 'input-form_station_error' : ''}`"
                      name="title"
              >
              <form-errors
                      v-show="v$.form.title.$dirty && v$.form.title.$error"
                      :errors="v$.form.title.$errors"
              />
          </div>
          <div class="input-form">
              <input
                      type="text"
                      v-model.trim="form.description"
                      placeholder="Description"
                      :class= "`input-form__login ${v$.form.description.$dirty && v$.form.description.$error ? 'input-form_station_error' : ''}`"
                      name="description"
              >
              <form-errors
                      v-show="v$.form.description.$dirty && v$.form.description.$error"
                      :errors="v$.form.description.$errors"
              />
          </div>

          <div class="input-form" v-show="mode !== modes.recommendation">
              <input
                      type="text"
                      v-model.trim="form.rightAnswer"
                      placeholder="Right answer"
                      class= "input-form__login"
                      name="rightAnswer"
              >
          </div>

          <div v-show="mode === modes.test">
            <div class="input-form">
                <input
                        type="text"
                        v-model.trim="form.variant1"
                        placeholder="First answer variant"
                        class= "input-form__login"
                        name="variant1"
                >
            </div>
              <div class="input-form">
                  <input
                          type="text"
                          v-model.trim="form.variant2"
                          placeholder="Second answer variant"
                          class= "input-form__login"
                          name="variant2"
                  >

              </div>
              <div class="input-form">
                  <input
                          type="text"
                          v-model.trim="form.variant3"
                          placeholder="Third answer variant"
                          class= "input-form__login"
                          name="variant3"
                  >

              </div>
          </div>
          <form-violations
                  v-show="!violations.empty"
                  :violations="violations"
          />

      </form-template>
    </div>

</template>

<script>
import {defineComponent} from 'vue'
import FormTemplate from "@/js_part/views/templates/forms/FormTemplate.vue";
import FormErrors from "@/js_part/views/templates/forms/errors/FormErrors.vue";
import {useVuelidate} from "@vuelidate/core";
import {required} from "@vuelidate/validators";
import store from "@/js_part/data/store/storages";
import router from "@/js_part/routing/router";
import FormViolations from "@/js_part/views/templates/forms/errors/FormViolations.vue";

export default defineComponent({
    name: "TaskCreationForm",
    setup: () => ({ v$: useVuelidate() }),
    components: {FormViolations, FormErrors, FormTemplate},
    data() {
        return {
          form: {
              title: '',
              description: '',
              rightAnswer: '',
              variant1: '',
              variant2: '',
              variant3: '',
          },
        modes: {
            recommendation: 'recommendation',
            test: 'test',
            question: 'question',
        },
         mode: 'recommendation',
         violations: [],
        properties: {
            signButton: "Create",
            signHeader: "Create a task",
            method: "POST",
        },
        }
    },
    methods: {
      createTask() {

          if(!this.validation()) {
              return
          }

          this.violations = []

          this.$tasksat.tasks.create(this.form, this.mode)
              .then(res => res.json())
              .then(res => {
                  if(!res['success']) {
                      this.violations.push('Task with this title already exists')
                  }
              })
              .then(() => {
                  if(this.violations.length === 0)
                      this.formClear()
              })
      },
      changeMode(mode) {
        this.mode=mode
      },
      formClear() {
        this.form.title = ''
        this.form.description = ''
        this.form.rightAnswer = ''
        this.form.variant1 = ''
        this.form.variant2 = ''
        this.form.variant3 = ''
      },
      validation() {

          this.v$.form.$touch()

          console.log(this.v$.form);
          return !this.v$.form.$error
      }
    },
    created() {

        if(store.getters.userMode) {
            router.push({alias: '/user'})
        }
        if(store.getters.adminMode) {
            router.push({alias: '/admin'})
        }
    },
    validations() {

        return {

            form: {
                title: {
                    required,
                },
                description: {
                    required,
                },
            },
        }
    },
})
</script>

<style scoped>

</style>