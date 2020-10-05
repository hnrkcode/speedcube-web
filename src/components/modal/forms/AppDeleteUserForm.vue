<template>
  <div id="app-time-form">
    <header class="modal-card-head"></header>
    <section class="modal-card-body">
      <div class="field">
        <h1 class="title">Warning!</h1>
        <p>
          This will permanently delete your account and all it's data. You can't
          restore your account after the account has been succesfully deleted.
        </p>
        <br />
        <p>Confirm by enter you password and press delete:</p>
      </div>
      <div class="field">
        <p class="help is-danger" v-if="errorMessage">
          {{ errorMessage }}
        </p>
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
      <div class="field is-grouped">
        <div class="control">
          <button class="button is-danger" @click="deleteUser">Delete</button>
        </div>
        <div class="control">
          <button class="button is-link is-light" @click="closeModal">
            Cancel
          </button>
        </div>
      </div>
    </section>
    <footer class="modal-card-foot"></footer>
  </div>
</template>

<script>
import { deleteUserRequest } from "@/scripts/apiRequests";
import { mapActions } from "vuex";

export default {
  name: "AppDeleteUserForm",
  data() {
    return {
      password: "",
      errorMessage: "",
    };
  },
  methods: {
    ...mapActions("modal/", ["closeModal"]),
    ...mapActions("auth/", ["signOut"]),
    deleteUser() {
      deleteUserRequest({ password: this.password }).then((response) => {
        // Sign out user after the account has been deleted otherwise theu user
        // will still be authenticated and see the parts that are protected by
        // authentication, however any requests that the user sends won't work
        // because the user doesn't exist. 
        if (response.data.success) {
          this.signOut();
          this.closeModal();
        } else {
          // User entered wrong password.
          this.errorMessage = response.data.message;
        }
      });
    },
  },
};
</script>
