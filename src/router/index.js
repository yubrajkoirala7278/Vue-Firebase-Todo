// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/admin',
    name:"private",
    component: () => import('@/layouts/frontend/app_layout.vue'),
    children: [
      {
        path: '/projects',
        name: 'Home',
        component: () => import('@/modules/projects/Project.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
