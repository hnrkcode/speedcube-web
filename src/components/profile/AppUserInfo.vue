<template>
  <div class="tile is-parent is-vertical" v-if="user !== null">
    <article class="tile is-child">
      <h2 class="title">Info</h2>
      <p v-if="user.username">
        Username:
        <strong> {{ user.username }}</strong>
      </p>
      <p v-if="user.first_name || user.last_name">
        Name:
        <strong> {{ user.first_name }} {{ user.last_name }}</strong>
      </p>
      <p v-if="user.email">
        E-mail:
        <strong> {{ user.email }}</strong>
      </p>
      <p>
        Joined:
        <strong> {{ dateJoined }}</strong>
      </p>
    </article>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { formatDate } from "@/scripts/formatHelpers";

export default {
  name: "UserInfo",
  computed: {
    ...mapState("profile/", { user: (state) => state.info }),
    dateJoined() {
      return formatDate(this.user.date_joined, {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      });
    },
  },
};
</script>
