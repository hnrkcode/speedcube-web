import Vue from "vue";
import VueRouter from "vue-router";
import HomePage from "../views/HomePage.vue";
import store from "@/store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "HomePage",
    component: HomePage,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/settings",
    name: "SettingsPage",
    component: () =>
      import(/* webpackChunkName: "settings" */ "../views/SettingsPage.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/profile",
    name: "ProfilePage",
    // route level code-splitting
    // this generates a separate chunk (profile.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "profile" */ "../views/ProfilePage.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "*",
    name: "NotFoundPage",
    component: () =>
      import(/* webpackChunkName: "404" */ "../views/NotFoundPage.vue"),
    meta: {
      requiresAuth: false,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.state.auth.isAuthenticated) {
      next({ name: "HomePage" });
    }
    next();
  } else {
    next();
  }
});

export default router;
