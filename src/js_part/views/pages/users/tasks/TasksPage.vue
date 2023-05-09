<template>

    <div>
      <div class="menu">
        <ul>
            <li @click="loadTasks('recommendation')">Recommendations</li>
            <li @click="loadTasks('test')">Tests</li>
            <li @click="loadTasks('question')">Questions</li>
            <li> <button @click="loadPage(currentType)"> Reload </button>  </li>
            <li> <button @click="scoreBoard"> Go to score board </button>  </li>
        </ul>
      </div>

      <span class="mock" v-if="store.getters.allTaskMode && tasks !== null && tasks.length === 0">Tasks not found :(</span>
      <div v-else-if="store.getters.allTaskMode">

        <section class="content__tasks" >
            <ul class="table">
               <li class="table__cell"
                   v-for="task in tasks"
                   :key="task"
               >
                <task-view
                  :task="task"
                />
               </li>
            </ul>
        </section>
      </div>
    <certain-task
            v-else
            @right="task => removeTask(task)"
    />
    </div>
</template>


<script>
import {defineComponent, toRaw} from 'vue'
import TaskView from "@/js_part/views/templates/tasks/TaskView.vue";
import store from '@/js_part/data/store/storages'
import CertainTask from "@/js_part/views/templates/tasks/CertainTask.vue";
import router from "@/js_part/routing/router";
export default defineComponent({
    name: "TasksPage",
    components: {CertainTask, TaskView},
    data() {
      return {
          tasks: [],
          currentType: 'recommendation',
          store: store,
      }
    },
    methods: {
        loadTasks(type) {
            this.currentType = type
            this.$modes.setTaskPageAllMode()
            this.$tasks.clearCurrentTask()
            this.$tasksat.tasks.all(type)
                .then(res => res.json())
                .then(res => {
                    this.tasks = toRaw(res)
                })
        },
        removeTask(task) {
            const ind = this.tasks.indexOf(task)
            if(ind >= 0)
                this.tasks.splice(ind, 1)
        },
        scoreBoard() {
          this.$tasks.clearCurrentTask()
          router.push({path: '/scoreboard'})
        },
        loadPage(type) {
            this.loadTasks(type)
            this.$modes.setTaskPageAllMode()
        }
    },
    created() {

      if(store.getters.workerMode) {
          router.push({path: '/workspace'})
      }
      if(store.getters.adminMode) {
          router.push({path: '/accounts'})
      }

        if(!store.getters.userMode)
            router.push({path: '/'})

      this.loadTasks(this.currentType)
    }
})
</script>


<style scoped>
  @import "@/css_part/components/menu.css";
</style>