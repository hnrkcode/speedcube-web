import Vue from "vue";
import Vuex from "vuex";
import auth from "@/store/modules/auth";
import modal from "@/store/modules/modal";
import profile from "@/store/modules/profile";
import time from "@/store/modules/time";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    modal,
    profile,
    time,
  },
  plugins: [createPersistedState()],
});
