<template>
  <div class="tile is-ancestor">
    <div class="tile is-parent">
      <article class="tile is-child">
        <h2 class="title">Times</h2>
        <template v-if="times.length">
          <transition-group name="fade">
            <div
              class="message has-text-dark"
              v-for="(time, index) in times"
              :key="time.id"
            >
              <div class="message-header">
                <p>Time #{{ times.length - index }}</p>
                <button
                  class="delete"
                  @click="removeTime({ index: index, id: time.id, page: 'profile' })"
                ></button>
              </div>
              <div class="message-body">
                <p>
                  Time: {{ convertTime(time.time) }}
                  <span class="is-size-7">({{ time.time }} ms)</span>
                </p>
                <p class="pt-2" v-if="time.dnf || time.penalty">
                  <strong v-if="time.dnf">DNF</strong>
                  <strong v-if="time.penalty">+2</strong>
                </p>
                <div class="message pt-5" v-if="time.comment">
                  <div class="message-body">
                    <p class="comment">{{ time.comment }}</p>
                  </div>
                </div>
                <p>
                  <i class="is-size-7"
                    >Created: {{ dateCreated(time.created) }}</i
                  >
                </p>
              </div>
            </div>
          </transition-group>
        </template>
        <template v-else>
          <p>No saved times.</p>
        </template>
      </article>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { formatDate, formatTime } from "@/scripts/formatHelpers";
import { convertTimeMixin } from "@/mixins/convertTimeMixin";

export default {
  name: "UserTimes",
  computed: {
    ...mapState("profile/", { times: (state) => state.times }),
  },
  mixins: [convertTimeMixin],
  methods: {
    ...mapActions("profile/", ["removeTime"]),
    dateCreated(date) {
      return formatDate(date);
    },
    convertMillisec(ms) {
      return formatTime(ms);
    },
  },
};
</script>

<style>
p {
  overflow-wrap: anywhere;
}
</style>
