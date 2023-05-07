
<template>

    <div class="task-form">

      <p class="table__task-name" >{{ task.title }}</p>
      <p class="table__task-description"> Type: {{ task.type.toLowerCase() }} </p>
      <div class="table__type-block">
          <div class="table__type-row">
              <div class="table__main-type">Description:  {{ task.description }}</div>
          </div>
      </div>

        <solving-part
                :task="task"
                @right="rightAnswer(task)"
        />


        <button @click="toAllMode"> Go back </button>
    </div>

</template>

<script>
import {defineComponent} from 'vue'
import store from '@/js_part/data/store/storages'
import SolvingPart from "@/js_part/views/templates/tasks/SolvingPart.vue";

export default defineComponent({
    name: "CertainTask",
    components: {SolvingPart},
    data() {
        return {
            store: store,
            task: store.getters.currentTask,
        }
    },
    methods: {
        toAllMode() {
            this.$modes.setTaskPageAllMode()
            this.$tasks.clearCurrentTask()
        },
        rightAnswer(task) {
            this.$emit('right', task)
            this.toAllMode()
        },
    }
})
</script>

<style scoped>

</style>