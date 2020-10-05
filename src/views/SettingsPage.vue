<template>
  <div id="settings">
    <AppHeaderData :title="title" />
    <div class="container">
      <transition name="fade" appear>
        <div class="tile is-ancestor">
          <div class="tile is-vertical">
            <div class="tile is-parent">
              <article class="tile is-child notification">
                <h1 class="title">Settings</h1>
              </article>
            </div>
            <div class="tile">
              <div class="tile is-parent is-vertical is-4">
                <article class="tile is-child notification"></article>
              </div>
              <div class="tile is-parent is-vertical">
                <article class="tile is-child notification">
                  <AppUpdateUserInfo />
                </article>
                <article class="tile is-child notification">
                  <AppChangePassword />
                </article>
                <article class="tile is-child notification">
                  <AppDeleteAccount />
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
import AppHeaderData from "@/components/header/AppHeaderData.vue";
import AppUpdateUserInfo from "@/components/settings/AppUpdateUserInfo.vue";
import AppDeleteAccount from "@/components/settings/AppDeleteAccount.vue";
import AppChangePassword from "@/components/settings/AppChangePassword.vue";

export default {
  name: "Settings",
  data() {
    return {
      title: "Settings",
    };
  },
  components: {
    AppHeaderData,
    AppUpdateUserInfo,
    AppDeleteAccount,
    AppChangePassword,
  },
};
</script>
