<template>

        <div class="table__column" >
            <a class="table__task-name" @click="selectTask">{{ task.title }}</a>
            <p class="table__task-description"> {{ (task.description.length > 50) ? task.description.substring(0, 50) + '...' : task.description }} </p>
        </div>
        <div class="table__type-block">
            <div class="table__type-row">
<!--                <div class="table__main-type"> {{ task.type }} </div>-->
            </div>
        </div>

</template>


<script>
import {defineComponent} from 'vue'

export default defineComponent({
    name: "TaskView",
    props: {
        task: {
            required: true,
            type: Object
        }
    },
    methods: {
        color(level) {
          return `rgb(${level*85},${level*50},${level*25})`
        },
        selectTask() {
            this.$modes.setTaskPageCertainMode()
            this.$tasks.setCurrentTask(this.task)
        }
    }

})
</script>

<style scoped>
  @import "@/css_part/components/tasks.css";
</style>