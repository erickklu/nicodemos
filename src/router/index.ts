import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue'
import LoginPage from '../views/LoginPage.vue';
import InfoApp from '../views/InfoApp.vue'


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage
  },
  {
    path: '/info',
    name: 'Info',
    component: InfoApp
  },
  {
    path: '/tabs/',
    name: 'tabs', 
    component: TabsPage,
    children: [
      {
        path: '',
        name: 'tabsp',
        redirect: '/tabs/tab1'
      },
      {
        path: 'tab1',
        component: () => import('@/views/Tab1Page.vue')
      },
      {
        path: 'login',
        component: () => import('@/views/LoginPage.vue')
      }
    ]
  }
];


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

// axios.defaults.baseURL = 'http://localhost:3000';  

export default router;