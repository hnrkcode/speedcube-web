import {
  getStatsRequest,
  getProfileDataRequest,
  getUserDataRequest,
} from "@/scripts/apiRequests";

const namespaced = true;

const state = {
  times: [],
  info: null,
  stats: null,
};

const getters = {};

const mutations = {
  removeTime: (state, index) => {
    state.times.splice(index, 1);
  },
  fetchStats: (state, payload) => {
    state.stats = payload;
  },
  fetchProfileData: (state, payload) => {
    if (payload.success) {
      state.info = payload.info;
      state.stats = payload.stats;
      state.times = payload.times;
    }
  },
  fetchInfo: (state, payload) => {
    state.info = payload.user;
  }
};

const actions = {
  removeTime: (context, payload) => {
    context
      .dispatch("time/removeTime", payload, { root: true })
      .then(() => context.commit("removeTime", payload.index))
      .catch((error) => console.error(error));
  },
  fetchStats: (context) => {
    getStatsRequest().then((response) =>
      context.commit("fetchStats", response.data)
    );
  },
  fetchProfileData: (context) => {
    getProfileDataRequest().then((response) => {
      context.commit("fetchProfileData", response.data);
    });
  },
  fetchInfo: (context) => {
    getUserDataRequest().then((response) => {
      context.commit("fetchInfo", response.data);
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
