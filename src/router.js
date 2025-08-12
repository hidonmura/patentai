import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from './pages/Dashboard.vue'
import NewProject from './pages/NewProject.vue'
import StrategicProject from './pages/StrategicProject.vue'
import SampleReport from './pages/SampleReport.vue'

const routes = [
  { path: '/', name: 'dashboard', component: Dashboard },
  { path: '/projects/new', name: 'new-project', component: NewProject },
  { path: '/projects/new/strategic', name: 'strategic-project', component: StrategicProject },
  { path: '/reports/sample', name: 'sample-report', component: SampleReport } 
]

export default createRouter({
  history: createWebHistory(),
  routes
})