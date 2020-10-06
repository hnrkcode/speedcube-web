<template>
  <div class="column is-half has-text-centered-mobile">
    <h2 class="title">Times</h2>
    <transition-group tag="ul" name="fade">
      <li
        class="py-3 px-2"
        v-for="(time, index) in times.slice().reverse()"
        :key="time.id"
        :class="{
          'has-background-success': time.time === bestTime && times.length > 1,
          'has-background-danger': time.time === worstTime && times.length > 1,
        }"
      >
        <div class="level is-mobile">
          <div class="level-left">
            <div class="level-item">No. {{ reversedIndex(index) + 1 }}</div>
            <template v-if="times.length > 1">
              <div class="level-item" v-if="time.time === bestTime">
                <font-awesome-icon icon="thumbs-up" title="Best time" />
              </div>
              <div class="level-item" v-if="time.time === worstTime">
                <font-awesome-icon icon="thumbs-down" title="Worst time" />
              </div>
            </template>
          </div>
          <div class="level-right">
            <div class="level-item is-hidden-touch" v-if="time.comment">
              <p class="pr-5" :title="`${time.comment.slice(0, 150)}...`">
                {{ time.comment.slice(0, 10) }}...
              </p>
            </div>
            <div class="level-item pl-5">
              {{ convertTime(time.time) }}
            </div>
            <div
              class="level-item dnf"
              :class="{
                activated: time.dnf,
              }"
              @click="
                toggleData({ index: reversedIndex(index), toggle: 'toggleDNF' })
              "
            >
              <p title="Did Not Finish">DNF</p>
            </div>
            <div
              class="level-item penalty"
              :class="{
                activated: time.penalty,
              }"
              @click="
                toggleData({
                  index: reversedIndex(index),
                  toggle: 'togglePenalty',
                })
              "
            >
              <p title="Two-Second Penalty">+2</p>
            </div>
            <div class="level-item">
              <font-awesome-icon
                :icon="time.comment ? 'comment' : 'ellipsis-h'"
                title="Add comment"
                @click="
                  toggleModal({
                    modal: 'edit-time',
                    data: reversedIndex(index),
                  })
                "
              />
            </div>
            <div class="level-item">
              <font-awesome-icon
                icon="trash"
                title="Remove time"
                @click="
                  removeTime({
                    index: reversedIndex(index),
                    id: time.id,
                    page: 'timer',
                  })
                "
              />
            </div>
          </div>
        </div>
      </li>
    </transition-group>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import { convertTimeMixin } from "@/mixins/convertTimeMixin";

export default {
  name: "Times",
  mixins: [convertTimeMixin],
  computed: {
    ...mapState("time/", { times: (state) => state.times }),
    ...mapGetters("time/", ["hasTimes", "bestTime", "worstTime"]),
  },
  methods: {
    ...mapActions("modal/", ["toggleModal"]),
    ...mapActions("time/", ["toggleData", "removeTime"]),
    reversedIndex(i) {
      return this.times.length - i - 1;
    },
  },
};
</script>

<style lang="scss">
@import "~bulma";

li {
  border-bottom: thin solid;
}

.activated {
  border: solid $light 1px;
  border-radius: 10px;
  background-color: $warning;
  color: $dark;
  font-weight: bold;
}

.dnf:hover,
.penalty:hover,
.fa-comment:hover,
.fa-trash:hover,
.fa-ellipsis-h:hover {
  transform: scale(2, 0.5);
  cursor: pointer;
}
.dnf,
.penalty,
.fa-trash,
.fa-comment,
.fa-ellipsis-h {
  transition: transform 0.5s ease 0s;
}
</style>
