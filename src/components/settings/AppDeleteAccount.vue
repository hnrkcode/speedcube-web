<template>
  <div>
    <h1 class="title">Account</h1>
    <button
      class="button is-danger"
      @click="toggleModal({ modal: 'delete-user' })"
    >
      Delete account
    </button>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  methods: {
    ...mapActions("modal/", ["toggleModal"]),
  },
};
</script>
