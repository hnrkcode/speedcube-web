<template>
  <div v-if="user !== null">
    <h1 class="title">Information</h1>
    <form @submit.prevent="updateInfo">
      <div class="field">
        <label class="label">Username</label>
        <p class="help is-danger" v-if="errorMessage">
          {{ errorMessage }}
        </p>
        <div class="control">
          <input
            class="input"
            type="text"
            name="username"
            :value="user.username"
          />
        </div>
      </div>
      <div class="field">
        <label class="label">E-mail</label>
        <p class="help is-danger" v-if="errorMessage">
          {{ errorMessage }}
        </p>
        <div class="control">
          <input class="input" type="email" name="email" :value="user.email" />
        </div>
      </div>
      <div class="columns">
        <div class="column">
          <div class="field">
            <label class="label">First name</label>
            <div class="control">
              <input
                class="input"
                type="text"
                name="firstName"
                :value="user.first_name"
              />
            </div>
          </div>
        </div>
        <div class="column">
          <div class="field">
            <label class="label">Last name</label>
            <div class="control">
              <input
                class="input"
                type="text"
                name="lastName"
                :value="user.last_name"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="field">
        <div class="control">
          <button class="button is-success" type="submit">
            Update information
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { updateUserDataRequest } from "@/scripts/apiRequests";

export default {
  data() {
    return {
      errorMessage: "",
    };
  },
  computed: {
    ...mapState("profile/", { user: (state) => state.info }),
  },
  methods: {
    ...mapActions("profile/", ["fetchInfo"]),
    updateInfo(submitEvent) {
      const username = submitEvent.target.elements.username.value;
      const email = submitEvent.target.elements.email.value;
      const first_name = submitEvent.target.elements.firstName.value;
      const last_name = submitEvent.target.elements.lastName.value;

      const data = {
        username,
        email,
        first_name,
        last_name,
      };

      updateUserDataRequest(data);
    },
  },
  beforeMount() {
    // Get user information to pre-populate the forms if there is no data in the store.
    if (this.user === null) {
      this.fetchInfo();
    }
  },
};
</script>
