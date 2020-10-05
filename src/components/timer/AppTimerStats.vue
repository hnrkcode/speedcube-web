<template>
  <div class="column is-one-quarter">
    <h2 class="title">Statistics</h2>
    <p class="has-text-success">Best: {{ convertTime(bestTime) }}</p>
    <p class="has-text-danger">Worst: {{ convertTime(worstTime) }}</p>
    <p>Average: {{ convertTime(averageTime) }}</p>
    <p>Median: {{ convertTime(medianTime) }}</p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { convertTimeMixin } from "@/mixins/convertTimeMixin";

export default {
  name: "Statistics",
  mixins: [convertTimeMixin],
  computed: {
    ...mapGetters("time/", [
      "bestTime",
      "worstTime",
      "averageTime",
      "medianTime",
    ]),
  },
};
</script>
