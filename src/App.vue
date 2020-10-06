<template>
  <div id="app">
    <div class="app-content">
      <AppNavbar />
      <div class="mt-5">
        <router-view />
      </div>
      <AppModal />
    </div>
    <AppFooter />
  </div>
</template>

<script>
import AppModal from "@/components/modal/AppModal.vue";
import AppNavbar from "@/components/AppNavbar.vue";
import AppFooter from "@/components/AppFooter.vue";

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
    AppFooter,
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

/* Keep footer at bottom */
html,
body {
  height: 100%;
}

#app {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.app-content {
  flex: 1 0 auto;
  /* Prevent Chrome, Opera, and Safari from letting these items shrink to smaller than their content's default minimum size. */
  padding: 20px;
}

.footer {
  flex-shrink: 0;
  /* Prevent Chrome, Opera, and Safari from letting these items shrink to smaller than their content's default minimum size. */
  padding: 20px;
}

body {
  margin: 0;
}
</style>
