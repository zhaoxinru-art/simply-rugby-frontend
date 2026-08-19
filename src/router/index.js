import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import ClubAdminPage from '../views/ClubAdminPage.vue'
import FixturePage from '../views/FixturePage.vue'
import AssignmentPage from '../views/AssignmentPage.vue'

const routes = [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/clubAdmin', component: ClubAdminPage },
    { path: '/fixture', component: FixturePage },
    { path: '/assignment', component: AssignmentPage },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const role = localStorage.getItem('role')
    if (to.path === '/login' || to.path === '/register') {
        next()
    } else if (!role) {
        next('/login')
    } else {
        next()
    }
})

export default router