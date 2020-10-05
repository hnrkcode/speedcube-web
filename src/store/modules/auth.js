import router from "@/router";
import { isAuthenticated } from "@/scripts/token";
import { updateUserDataRequest } from "@/scripts/apiRequests";

const namespaced = true;

const state = {
  isAuthenticated: false,
};

const getters = {};

const mutations = {
  setAuthStatus: (state, payload) => {
    state.isAuthenticated = payload;
  },
  signIn: (state, payload) => {
    localStorage.setItem("accessToken", payload.access);
    localStorage.setItem("refreshToken", payload.refresh);
    state.isAuthenticated = true;
  },
  signOut: (state) => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    state.isAuthenticated = false;
  },
};

const actions = {
  setAuthStatus: (context, payload) => {
    context.commit("setAuthStatus", isAuthenticated(payload));
  },
  signIn: (context, payload) => {
    context.commit("signIn", payload);
    context.dispatch("time/resetTimeData", null, { root: true }).then(() => {
      // Update last login field on login.
      updateUserDataRequest({ last_login: new Date() });
    });
  },
  signOut: (context) => {
    context.commit("signOut");
    context.dispatch("time/resetTimeData", null, { root: true }).then(() => {
      // Redirect to home page after signed out.
      if (router.currentRoute.name !== "HomePage") {
        router.push({ name: "HomePage" });
      }
    });
  },
};

export default {
  namespaced,
  state,
  getters,
  mutations,
  actions,
};
