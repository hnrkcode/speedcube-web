<template>
  <div id="app-modal" class="modal">
    <div class="modal-background" @click="closeModal"></div>
    <div class="modal-card">
      <transition name="flip" mode="out-in">
        <component :is="mode"></component>
      </transition>
    </div>
    <button
      class="modal-close is-large"
      aria-label="closeModal"
      @click="closeModal"
    ></button>
  </div>
</template>

<script>
import AppLoginForm from "@/components/modal/forms/AppLoginForm.vue";
import AppRegisterForm from "@/components/modal/forms/AppRegisterForm.vue";
import AppTimeForm from "@/components/modal/forms/AppTimeForm.vue";
import AppDeleteUserForm from "@/components/modal/forms/AppDeleteUserForm.vue";
import { mapActions, mapState } from "vuex";

export default {
  name: "Modal",
  components: {
    AppLoginForm,
    AppRegisterForm,
    AppTimeForm,
    AppDeleteUserForm,
  },
  computed: {
    ...mapState("modal/", { activeModal: (state) => state.activeModal }),
    mode() {
      if (this.activeModal === "login") {
        return "app-login-form";
      }

      if (this.activeModal === "register") {
        return "app-register-form";
      }

      if (this.activeModal === "edit-time") {
        return "app-time-form";
      }

      if (this.activeModal === "delete-user") {
        return "app-delete-user-form";
      }

      return null;
    },
  },
  methods: {
    ...mapActions("modal/", ["closeModal"]),
  },
};
</script>

<style scoped>
/* Makes the register button fullwidth */
.modal-card-foot {
  display: block;
}

.flip-enter {
}

.flip-enter-active {
  animation: flip-in 0.25s ease-out forwards;
}

.flip-leave {
}

.flip-leave-active {
  animation: flip-out 0.25s ease-out forwards;
}

@keyframes flip-out {
  from {
    transform: rotateY(0deg);
  }
  to {
    transform: rotateY(90deg);
  }
}
@keyframes flip-in {
  from {
    transform: rotateY(90deg);
  }
  to {
    transform: rotateY(0deg);
  }
}
</style>
