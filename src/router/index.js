// import Vue from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '../views/MainPage.vue';
import RegisterUser from '../views/RegisterUser'
import Login from '../views/Login';
import WaitingRoom from '../views/WaitingRoom.vue'
import BingoGame from '../views/BingoGame'

const routes = [
  {path: '/',name: 'MainPage',component: MainPage,},
  {path: '/register', component:RegisterUser},
  {path: '/login', component:Login},
  {path: '/waiting-room', component: WaitingRoom},
  {path: '/bingo-game', component:BingoGame},

];

const router = new createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
