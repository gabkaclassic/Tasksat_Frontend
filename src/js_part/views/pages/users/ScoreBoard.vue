<template>

    <div>
        <div class="menu">
            <ul>
                <li> <button @click="toTasks"> Go to tasks list </button>  </li>
                <li> <button @click="forceLoadStatistics"> Update </button>  </li>

            </ul>
        </div>
    </div>

  <main class="scoreboard-page">

      <section class="content__tasks" >
          <ul class="table">
              <li class="table__cell">
                  <div class="statistics">
                      <div class="statistics">
                          {{ `You have completed ${percentRecommendations()}% all recommendations` }}
                      </div>
                  </div>
              </li>
              <li class="table__cell">
                  <div class="statistics">
                      <div class="statistics">
                          {{ `You have completed ${percentQuestions()}% all questions` }}
                      </div>
                  </div>
              </li>
              <li class="table__cell">
                  <div class="statistics">
                      {{ `You have completed ${percentTests()}% all tests` }}
                  </div>
              </li>
              <li class="table__cell form">
                  <div class="statistics">
                      {{ `Your completed recommendations number is ${recommendationAverage()} average` }}
                  </div>
              </li>
              <li class="table__cell">
                  <div class="statistics">
                      {{ `Your completed questions number is ${questionAverage()} average` }}
                  </div>
              </li>
              <li class="table__cell">
                  <div class="statistics">
                      {{ `Your completed tests number is ${testAverage()} average` }}
                  </div>
              </li>
          </ul>
      </section>

  </main>


</template>

<script>
import {defineComponent} from 'vue'
import store from '@/js_part/data/store/storages'
import router from "@/js_part/routing/router";
import {round} from "@popperjs/core/lib/utils/math";
export default defineComponent({
    name: "ScoreBoard",
    data() {
        return {
            statistics: store.getters.statistics,
        }
    },
    methods: {
        round,
        loadStatistics() {
          if(!store.getters.statisticsSaved)
              this.forceLoadStatistics()
        },
      forceLoadStatistics() {
        this.$tasksat.statistics.load()
            .then(res => res.json())
            .then(res => {

                return {
                    usersCount: res['usersCount'],
                    recommendationTasksCount: res['recommendationTasksCount'],
                    questionTasksCount: res['questionTasksCount'],
                    testTasksCount: res['testTasksCount'],
                    completedRecommendationTasksCount: res['completedRecommendationTasksCount'],
                    completedQuestionTasksCount: res['completedQuestionTasksCount'],
                    completedTestTasksCount: res['completedTestTasksCount'],
                    generalCompletedRecommendationTasksCount: res['generalCompletedRecommendationTasksCount'],
                    generalCompletedQuestionTasksCount: res['generalCompletedQuestionTasksCount'],
                    generalCompletedTestTasksCount: res['generalCompletedTestTasksCount'],
                }
            })
            .then(res => {
                this.$statistics.saveStatistics(res)
                this.statistics = res
        })
      },
        belowOrAbove(value) {
            return (value > 0) ? 'above' : 'below'
        },
        percentRecommendations() {

            if(this.statistics.recommendationTasksCount === 0)
                return 100

            return round(this.statistics.completedRecommendationTasksCount*100/this.statistics.recommendationTasksCount)

        },
        percentQuestions() {
            if(this.statistics.questionTasksCount === 0)
                return 100
            return round(this.statistics.completedQuestionTasksCount*100/this.statistics.questionTasksCount)
        },
        percentTests() {
            if(this.statistics.testTasksCount === 0)
                return 100
            return round(this.statistics.completedTestTasksCount*100/this.statistics.testTasksCount)
        },
        recommendationAverage() {
            const p = this.statistics.completedRecommendationTasksCount - this.statistics.generalCompletedRecommendationTasksCount / this.statistics.usersCount

            if(p === 0)
                return 'equal'
            return p + ' ' + this.belowOrAbove(p)
        },
        questionAverage() {
            const p = this.statistics.completedQuestionTasksCount - this.statistics.generalCompletedQuestionTasksCount/this.statistics.usersCount

            if(p === 0)
                return 'equal'
            return p + ' ' + this.belowOrAbove(p)
        },
        testAverage() {
            const p = this.statistics.completedTestTasksCount - this.statistics.generalCompletedTestTasksCount/this.statistics.usersCount

            if(p === 0)
                return 'equal'
            return p + ' ' + this.belowOrAbove(p)
        },
        toTasks() {
          router.push({path: '/tasks'})
        },
    },
    created() {

        if(store.getters.adminMode) {
            router.push({alias: '/admin'})
        }
        if(store.getters.adminMode) {
            router.push({alias: '/worker'})
        }

        this.loadStatistics()

        setInterval(this.forceLoadStatistics, 360000)
    },
})
</script>


<style scoped>
  @import "@/css_part/components/form.css";
  @import "@/css_part/components/table.css";
  @import "@/css_part/components/tasks.css";
  @import "@/css_part/pages/scoreboard-page.css";
</style>