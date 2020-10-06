<template>
  <div id="profile">
    <AppHeaderData :title="title" />
    <div class="container">
      <transition name="fade" appear>
        <div class="tile is-ancestor">
          <div class="tile is-vertical">
            <div class="tile is-parent">
              <article class="tile is-child notification" v-if="user !== null">
                <h1 class="title has-text-centered-mobile">{{ user.username }}</h1>
              </article>
            </div>
            <div class="tile">
              <div class="tile is-parent is-vertical is-4">
                <article class="tile is-child notification">
                  <AppUserInfo />
                  <AppUserStats />
                </article>
              </div>
              <div class="tile is-parent is-vertical">
                <article class="tile is-child notification">
                  <AppUserTimes />
                </article>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import AppUserInfo from "@/components/profile/AppUserInfo.vue";
import AppUserStats from "@/components/profile/AppUserStats.vue";
import AppUserTimes from "@/components/profile/AppUserTimes.vue";
import AppHeaderData from "@/components/header/AppHeaderData.vue";
import { mapState, mapActions } from "vuex";

export default {
  name: "Profile",
  data() {
    return {
      title: "Profile",
    };
  },
  computed: {
    ...mapState("profile/", { user: (state) => state.info }),
  },
  methods: {
    ...mapActions("profile/", ["fetchProfileData"]),
  },
  components: {
    AppUserInfo,
    AppUserStats,
    AppUserTimes,
    AppHeaderData,
  },
  beforeMount() {
    this.fetchProfileData();
  }
};
</script>
