<template>
  <div id="app-time-form">
    <header class="modal-card-head"></header>
    <section class="modal-card-body">
      <div class="field">
        <h1 class="title">Edit</h1>
      </div>
      <div class="field">
        <p class="is-size-5">
          Time: {{ convertTime(tempData.time) }}
          <i class="is-size-7">({{ tempData.time }} ms)</i>
        </p>
      </div>
      <div class="field is-grouped">
        <div class="control">
          <label class="checkbox"
            ><input
              type="checkbox"
              v-model="tempData.dnf"
              @click="tempData.dnf = !tempData.dnf"
            />
            DNF</label
          >
        </div>
        <div class="control">
          <label class="checkbox"
            ><input
              type="checkbox"
              v-model="tempData.penalty"
              @click="togglePenaltyLocally"
            />
            +2</label
          >
        </div>
      </div>
      <div class="field">
        <label class="label">Comment</label>
        <div class="control">
          <textarea
            class="textarea"
            placeholder="Comment..."
            v-model="tempData.comment"
          ></textarea>
        </div>
      </div>
      <div class="field is-grouped">
        <div class="control">
          <button class="button is-link" @click="save()">Save</button>
        </div>
        <div class="control">
          <button class="button is-link is-light" @click="closeModal()">
            Cancel
          </button>
        </div>
      </div>
    </section>
    <footer class="modal-card-foot"></footer>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { convertTimeMixin } from "@/mixins/convertTimeMixin";

export default {
  data() {
    return {
      tempData: null,
    };
  },
  mixins: [convertTimeMixin],
  computed: {
    ...mapState("modal/", { i: (state) => state.data }),
    ...mapState("time/", { times: (state) => state.times }),
  },
  methods: {
    ...mapActions("modal/", ["closeModal"]),
    ...mapActions("time/", ["toggleDNF", "togglePenalty", "updateTime"]),
    // Save all changes done in the modal to the store.
    save() {
      this.updateTime({
        index: this.i,
        data: JSON.parse(JSON.stringify(this.tempData)),
      });
      this.closeModal();
    },
    // Only works on checkbox in the modal to discard all changes if not save.
    togglePenaltyLocally() {
      this.tempData.penalty = !this.tempData.penalty;

      // Add two-second penalty to time.
      this.tempData.penalty
        ? (this.tempData.time += 2000)
        : (this.tempData.time -= 2000);
    },
  },
  beforeMount() {
    // Copy without reference to the original data.
    this.tempData = JSON.parse(JSON.stringify(this.times[this.i]));
  },
};
</script>
