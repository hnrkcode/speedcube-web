import {
  addTimeRequest,
  removeTimeRequest,
  toggleRequest,
  updateTimeRequest,
} from "@/scripts/apiRequests";

import { v4 as uuidv4 } from "uuid";

const namespaced = true;

const state = {
  times: [],
};

const getters = {
  hasTimes: (state) => {
    if (state.times.length) {
      return true;
    }

    return false;
  },
  bestTime: (state) => {
    return state.times.length
      ? Math.min(...state.times.map((time) => time.time))
      : null;
  },
  worstTime: (state) => {
    return state.times.length
      ? Math.max(...state.times.map((time) => time.time))
      : null;
  },
  averageTime: (state) => {
    if (state.times.length) {
      const times = [...state.times.map((time) => time.time)];
      const average =
        times.reduce((accumulator, time) => accumulator + time) / times.length;

      return Math.round(average);
    }

    return null;
  },
  medianTime: (state) => {
    if (state.times.length) {
      const times = [...state.times.map((time) => time.time)].sort(
        (a, b) => a - b
      );
      const mid = Math.floor(times.length / 2);
      const median =
        times.length % 2 ? times[mid] : (times[mid - 1] + times[mid]) / 2;

      return Math.round(median);
    }

    return null;
  },
};

const mutations = {
  toggleDNF: (state, index) => {
    state.times[index].dnf = !state.times[index].dnf;
  },
  togglePenalty: (state, index) => {
    state.times[index].penalty = !state.times[index].penalty;

    // Add two-second penalty to time.
    state.times[index].penalty
      ? (state.times[index].time += 2000)
      : (state.times[index].time -= 2000);
  },
  addTime: (state, payload) => {
    state.times.push(payload);
  },
  updateTime: (state, payload) => {
    const i = payload.index;

    Object.keys(state.times[i]).forEach(
      (key) => (state.times[i][key] = payload.data[key])
    );
  },
  removeTime: (state, payload) => {
    state.times = state.times.filter((time) => time.id !== payload.id);
  },
  resetTimeData: (state) => {
    state.times = [];
  },
};

const actions = {
  toggleData: ({ commit, rootState }, { index, toggle }) => {
    const timeData = rootState.time.times[index];
    const promise = new Promise((resolve, reject) => {
      // Update 'DNF' in store.
      if (toggle === "toggleDNF") {
        commit(toggle, index);
        resolve({
          id: timeData.id,
          data: { dnf: timeData.dnf },
        });
        // Update 'penalty' and 'time' in store.
      } else if (toggle === "togglePenalty") {
        commit(toggle, index);
        resolve({
          id: timeData.id,
          data: {
            time: timeData.time,
            penalty: timeData.penalty,
          },
        });
      } else {
        reject(`Error: There are no mutation named "${toggle}".`);
      }
    });

    // Patch changes on the server if user is authenticated.
    promise
      .then((data) => {
        if (rootState.auth.isAuthenticated) toggleRequest(data);
      })
      .catch((error) => console.error(error));
  },
  addTime: (context, payload) => {
    if (context.rootState.auth.isAuthenticated) {
      addTimeRequest(payload)
        .then((response) => context.commit("addTime", response.data))
        .catch((error) => console.error(error));
    } else {
      /* Give times a unique local id to prevent issues when using the v-for directive.
      Is only necessary when unauthenticated because the server will otherwise create
      the id when posting the data to the server. */
      const id = uuidv4().replace(/-/g, "");
      payload["id"] = id;

      context.commit("addTime", payload);
    }
  },
  updateTime: (context, payload) => {
    // Update data in the store.
    const promise = new Promise((resolve, reject) => {
      context.commit("updateTime", payload);
      resolve(payload);
    });

    // Update changes on the server if user is authenticated.
    promise
      .then((response) => {
        if (context.rootState.auth.isAuthenticated) {
          updateTimeRequest(response.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  },
  removeTime: (context, payload) => {
    // Remove data from the store.
    context.commit("removeTime", payload);

    // Remove data from the server.
    if (context.rootState.auth.isAuthenticated) {
      removeTimeRequest(payload.id)
        .then(() => {
          // Only send request for updated time statistics if on profile page.
          // The statistics on the timer page are calculated on the client side
          // and only needs times recorded at the current session that are stored
          // in locally.
          if (payload.page === "profile") {
            context.dispatch("profile/fetchStats", null, { root: true });
          }
        })
        .catch((error) => console.error(error));
    }
  },
  resetTimeData: (context) => {
    context.commit("resetTimeData");
  },
};

export default {
  namespaced,
  state,
  getters,
  mutations,
  actions,
};
