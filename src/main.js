import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "@/assets/main.scss";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faUser,
  faLock,
  faEnvelope,
  faIdCard,
  faSignOutAlt,
  faCircle,
  faHandPaper,
  faComment,
  faTrash,
  faCog,
  faThumbsUp,
  faThumbsDown,
  faTimes,
  faCheck,
  faEllipsisH
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faUser,
  faLock,
  faEnvelope,
  faIdCard,
  faSignOutAlt,
  faCircle,
  faHandPaper,
  faComment,
  faTrash,
  faCog,
  faThumbsUp,
  faThumbsDown,
  faTimes,
  faCheck,
  faEllipsisH
);

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
