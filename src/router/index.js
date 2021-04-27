import Vue from "vue";
import Router from "vue-router";
import Home from "../views/Home";
import Login from "../views/Login";
import Register from "@/views/register";
//import User from "@/components/User";
import Admin from "@/views/Admin";

import VueJwtDecode from "vue-jwt-decode";

Vue.use(Router);

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
      meta: {
        requiresAuth:true,
      }
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
      meta: {
        guest: true,
      },
    },
    {
      path: "/register",
      name: "Register",
      component: Register,
      meta: {
        guest: true,
      },
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      meta: {
          requiresAuth: true,
          admin:true  
      }
  },
  ],
});

router.beforeEach((to,from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (localStorage.getItem("usertoken") == null) {
      next({
        path: "/login",
        params: { nextUrl: to.fullPath },
      });
    } else {
      let token = localStorage.getItem("usertoken");
      if (token) {
        let decoded = VueJwtDecode.decode(token);
        let user = decoded;
        if (user) next();
      }
    }
  } else if (to.matched.some((record) => record.meta.guest)) {
    if (localStorage.getItem("usertoken") == null) {
      next();
    }
  } else if(to.matched.some((record) => record.meta.admin)) {
    if (localStorage.getItem("usertoken") == null) {
      next({
        path: "/login",
        params: { nextUrl: to.fullPath },
      });
    } else {
      let token = localStorage.getItem("usertoken");
      if (token) {
        let decoded = VueJwtDecode.decode(token);
        let user = decoded;
        if (user.isAdmin === true) next();
      }
    }
  }
  else {
    next();
  }
});

export default router;