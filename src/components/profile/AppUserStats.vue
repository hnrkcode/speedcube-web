<template>
  <div class="tile is-parent">
    <template v-if="stats !== null">
      <transition name="stats">
        <div v-if="stats.total">
          <article class="tile is-child has-text-centered-mobile">
            <h2 class="title">Stats</h2>
            <p class="title is-size-5">
              Total:
              <span>{{
                stats.total > 1 ? `${stats.total} times` : `${stats.total} time`
              }}</span>
            </p>
            <p>
              Best time:
              <strong
                >{{ convertTime(stats.statistics.best) }}
                <span class="is-size-7"
                  >({{ stats.statistics.best }} ms)</span
                ></strong
              >
            </p>
            <p>
              Worst time:
              <strong
                >{{ convertTime(stats.statistics.worst) }}
                <span class="is-size-7"
                  >({{ stats.statistics.worst }} ms)</span
                ></strong
              >
            </p>
            <p>
              Average time:
              <strong
                >{{ convertTime(stats.statistics.average) }}
                <span class="is-size-7"
                  >({{ stats.statistics.average }} ms)</span
                ></strong
              >
            </p>
            <p>
              Median time:
              <strong
                >{{ convertTime(stats.statistics.median) }}
                <span class="is-size-7"
                  >({{ stats.statistics.median }} ms)</span
                ></strong
              >
            </p>
          </article>
        </div>
      </transition>
    </template>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { convertTimeMixin } from "@/mixins/convertTimeMixin";

export default {
  name: "UserStats",
  mixins: [convertTimeMixin],
  computed: {
    ...mapState("profile/", { stats: (state) => state.stats }),
  },
};
</script>
