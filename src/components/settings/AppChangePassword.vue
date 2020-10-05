<template>
  <div>
    <h1 class="title">Change Password</h1>
    <p class="help is-danger" v-if="errorMessage">{{ errorMessage }}</p>
    <form @submit.prevent="changePassword">
      <div class="field">
        <label class="label">Current Password</label>
        <div class="control">
          <input
            class="input"
            type="password"
            name="currentPassword"
            v-model="currentPassword"
          />
        </div>
      </div>
      <div class="field">
        <label class="label">New Password</label>
        <div class="control">
          <input
            class="input"
            type="password"
            name="newPassword"
            v-model="newPassword"
          />
        </div>
      </div>
      <div class="field">
        <label class="label">Confirmation</label>
        <div class="control">
          <input
            class="input"
            type="password"
            name="confirmation"
            v-model="confirmation"
          />
        </div>
      </div>
      <div class="field">
        <div class="control">
          <button class="button is-success" type="submit">
            Change Password
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { changePasswordRequest } from "@/scripts/apiRequests";

export default {
  data() {
    return {
      currentPassword: "",
      newPassword: "",
      confirmation: "",
      errorMessage: "",
    };
  },
  methods: {
    changePassword() {
      changePasswordRequest({
        currentPassword: this.currentPassword,
        newPassword: this.newPassword,
        confirmation: this.confirmation,
      }).then((response) => {
        if (response.data.success) {
          this.errorMessage = "";
        } else {
          this.errorMessage = response.data.message;
        }
      });
    },
  },
};
</script>
