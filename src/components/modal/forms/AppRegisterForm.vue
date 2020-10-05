<template>
  <div id="app-register-form">
    <header class="modal-card-head"></header>
    <section class="modal-card-body">
      <form @submit.prevent="register">
        <h1 class="title">Register</h1>
        <div class="field">
          <p class="help is-danger" v-if="errorMessage.type === 'username'">
            {{ errorMessage.message }}
          </p>
          <p
            class="control has-icons-left has-icons-right"
            :class="{
              'is-loading': usernameValidation() === 'loading',
            }"
          >
            <input
              class="input"
              :class="{ 'is-danger': errorMessage.type === 'username' }"
              type="text"
              name="username"
              placeholder="Username"
              v-model="username"
              @keydown.tab="stoppedTypingPressedTab"
              @keyup="stoppedTyping"
              @keydown="startedTyping"
            />
            <span class="icon is-small is-left">
              <font-awesome-icon icon="user" />
            </span>
            <span
              class="icon is-small is-right has-text-danger"
              v-if="usernameValidation() === 'unavailable'"
            >
              <font-awesome-icon icon="times" />
            </span>
            <span
              class="icon is-small is-right has-text-success"
              v-if="usernameValidation() === 'available'"
            >
              <font-awesome-icon icon="check" />
            </span>
          </p>
        </div>
        <p class="help is-danger" v-if="errorMessage.type === 'password'">
          {{ errorMessage.message }}
        </p>
        <div class="field">
          <p class="control has-icons-left has-icons-right">
            <input
              class="input"
              :class="{ 'is-danger': errorMessage.type === 'password' }"
              type="password"
              name="password"
              placeholder="Password"
              v-model="password"
            />
            <span class="icon is-small is-left">
              <font-awesome-icon icon="lock" />
            </span>
          </p>
        </div>
        <div class="field">
          <p class="control has-icons-left has-icons-right">
            <input
              class="input"
              :class="{ 'is-danger': errorMessage.type === 'password' }"
              type="password"
              name="confirmation"
              placeholder="Confirm Password"
              v-model="confirmation"
            />
            <span class="icon is-small is-left">
              <font-awesome-icon icon="lock" />
            </span>
          </p>
        </div>
        <div class="field">
          <div class="control">
            <button class="button is-success is-fullwidth">
              Register
            </button>
          </div>
        </div>
        <div class="field">
          <p class="has-text-centered">
            Already have an account?
            <a @click="switchModal({ modal: 'login' })">Log In here.</a>
          </p>
        </div>
      </form>
    </section>
    <footer class="modal-card-foot"></footer>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import {
  registerRequest,
  signInRequest,
  checkUsernameRequest,
} from "@/scripts/apiRequests";

export default {
  name: "Register",
  data() {
    return {
      username: "",
      password: "",
      confirmation: "",
      errorMessage: "",
      usernameTaken: false,

      isTyping: false,
      typing: null,
      typingInterval: 500,
    };
  },
  methods: {
    usernameValidation() {
      if (this.isTyping && this.username) {
        return "loading";
      }

      if (this.usernameTaken && !this.isTyping) {
        return "unavailable";
      }

      if (this.username && !this.usernameTaken && !this.isTyping) {
        if (this.errorMessage.type === "username") {
          this.errorMessage = "";
        }
        return "available";
      }

      return "idle";
    },
    ...mapActions("modal/", ["switchModal", "closeModal"]),
    // Prevent loading from getting stuck and never check username if 'tab' is pressed.
    stoppedTypingPressedTab() {
      clearTimeout(this.typing);
      this.checkUsername();
    },
    stoppedTyping() {
      clearTimeout(this.typing);
      this.typing = setTimeout(this.checkUsername, this.typingInterval);
    },
    startedTyping() {
      clearTimeout(this.typing);
      this.isTyping = true;
    },
    checkUsername() {
      if (this.username) {
        checkUsernameRequest({ username: this.username }).then((response) => {
          this.usernameTaken = response.data.taken;
          this.isTyping = false;
        });
      }
    },
    register() {
      registerRequest({
        username: this.username,
        password: this.password,
        confirmation: this.confirmation,
      }).then((response) => {
        // Automatically sign in user after successful registration.
        if (response.data.success) {
          signInRequest({
            username: this.username,
            password: this.password,
          })
            // Get tokens from server.
            .then((repsonse) => repsonse.data)
            // Store tokens in localStorage.
            .then((data) => this.$store.dispatch("auth/signIn", data))
            // Close the login modal.
            .then(() => this.closeModal());
        } else {
          // Give error message in modal.
          const message = response.data.message;
          const usernameError = message.toLowerCase().includes("username");
          const type = usernameError ? "username" : "password";
          this.errorMessage = { type, message };
        }
      });
    },
  },
};
</script>
