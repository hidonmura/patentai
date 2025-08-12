import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from './pages/Dashboard.vue'
import NewProject from './pages/NewProject.vue'
import StrategicProject from './pages/StrategicProject.vue'

const routes = [
  { path: '/', name: 'dashboard', component: Dashboard },
  { path: '/projects/new', name: 'new-project', component: NewProject },
  { path: '/projects/new/strategic', name: 'strategic-project', component: StrategicProject }
]

export default createRouter({
  history: createWebHistory(),
  routes
})