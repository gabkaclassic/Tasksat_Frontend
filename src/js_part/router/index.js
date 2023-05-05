import { createRouter, createWebHistory } from 'vue-router'
import HomePage from "../views/pages/HomePage.vue";
import NotFoundPage from "../views/pages/NotFoundPage.vue";

const router = createRouter({
  mode: history,
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: HomePage,
      alias: '/home'
    },
    // {
    //   path: '/task/all',
    //   component: TasksPage,
    //   alias: '/task'
    // },
    // {
    //   path: '/task/:title',
    //   component: Taskpage,
    //   alias: 'task/:title'
    // },
    {
      path: '/:pathMatch(.*)*',
      component: NotFoundPage,
      alias: '/notFound'
    },
  ]
})

export default router
