// import Vue from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '../views/MainPage.vue';
import RegisterUser from '../views/RegisterUser'

const routes = [
  {path: '/',name: 'MainPage',component: MainPage,},
  {path: '/register', component:RegisterUser},
];

const router = new createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
