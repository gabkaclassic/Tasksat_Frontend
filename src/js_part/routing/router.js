import { createRouter, createWebHistory } from 'vue-router'
import HomePage from "@/js_part/views/pages/general/HomePage.vue";
import UsersPage from "@/js_part/views/pages/admins/UsersPage.vue";
import NotFoundPage from "@/js_part/views/pages/general/NotFoundPage.vue";
import TasksPage from "@/js_part/views/pages/users/tasks/TasksPage.vue";
import WorkspacePage from "@/js_part/views/pages/workers/WorkspacePage.vue";
import ScoreBoard from "@/js_part/views/pages/users/ScoreBoard.vue";

const router = createRouter({
  mode: history,
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: HomePage,
      alias: '/home'
    },
    {
      path: '/tasks',
      component: TasksPage,
      alias: '/user'
    },
    {
      path: '/scoreboard',
      component: ScoreBoard,
      alias: '/scoreboard'
    },
    {
      path: '/users',
      component: UsersPage,
      alias: '/admin'
    },
    {
      path: '/workspace',
      component: WorkspacePage,
      alias: '/worker'
    },
    {
      path: '/:pathMatch(.*)*',
      component: NotFoundPage,
      alias: '/notFound'
    },
  ]
})

export default router
