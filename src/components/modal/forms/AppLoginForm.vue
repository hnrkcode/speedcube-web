<template>
  <div id="app-login-form">
    <header class="modal-card-head"></header>
    <section class="modal-card-body">
      <form @submit.prevent="login">
        <div class="field">
          <h1 class="title">Login</h1>
        </div>
        <p class="help is-danger" v-if="errorMessage">
          {{ errorMessage }}
        </p>
        <div class="field">
          <p class="control has-icons-left has-icons-right">
            <input
              class="input"
              type="text"
              name="username"
              placeholder="Username"
              v-model="username"
            />
            <span class="icon is-small is-left">
              <font-awesome-icon icon="user" />
            </span>
          </p>
        </div>

        <div class="field">
          <p class="control has-icons-left">
            <input
              class="input"
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
          <div class="control">
            <button class="button is-success is-fullwidth" type="submit">
              Login
            </button>
          </div>
        </div>
        <div class="field">
          <p class="has-text-centered">
            Not registered?
            <a @click="switchModal({ modal: 'register' })"
              >Create an account.</a
            >
          </p>
        </div>
      </form>
    </section>
    <footer class="modal-card-foot"></footer>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { signInRequest } from "@/scripts/apiRequests";

export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      errorMessage: "",
    };
  },
  methods: {
    ...mapActions("modal/", ["switchModal", "closeModal"]),
    login() {
      signInRequest({
        username: this.username,
        password: this.password,
      })
        // Get tokens from server.
        .then((repsonse) => repsonse.data)
        // Store tokens in localStorage.
        .then((data) => this.$store.dispatch("auth/signIn", data))
        // Close the login modal.
        .then(() => this.closeModal())
        .catch(
          () =>
            (this.errorMessage =
              "The username or password you entered are incorrect.")
        );
    },
  },
};
</script>
