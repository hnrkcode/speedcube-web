<template>
  <div id="app">
    <AppNavbar />
    <div class="mt-5">
      <router-view />
    </div>
    <AppModal />
  </div>
</template>

<script>
import AppModal from "@/components/modal/AppModal.vue";
import AppNavbar from "@/components/AppNavbar.vue";

export default {
  name: "App",
  data() {
    return {
      authStatus: null,
    };
  },
  components: {
    AppNavbar,
    AppModal,
  },
  methods: {
    // Check if user is authenticated every N milliseconds.
    checkAuthentication(intervall) {
      this.authStatus = setInterval(() => {
        this.$store.dispatch(
          "auth/setAuthStatus",
          localStorage.getItem("accessToken")
        );
      }, intervall);
    },
  },
  created() {
    this.checkAuthentication(10000);
  },
  beforeDestroy() {
    clearInterval(this.authStatus);
  },
};
</script>

<style>
.fade-enter {
  opacity: 0;
}
.fade-enter-active {
  transition: opacity 1s;
}
.fade-leave-active {
  opacity: 0;
  position: absolute;
}
.fade-move {
  transition: transform 1s;
}

/* Fade out statistics box if all times are removed. */
.stats-enter {
  opacity: 0;
}
.stats-enter-active {
  transition: opacity 1s;
}
.stats-leave-active {
  transition: opacity 1s;
  opacity: 0;
}
</style>
