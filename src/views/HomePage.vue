<template>
  <div id="home">
    <AppHeaderData :title="title" />
    <div class="container">
      <transition name="fade" appear>
        <AppTimer />
      </transition>
    </div>
  </div>
</template>

<script>
import AppTimer from "@/components/timer/AppTimer.vue";
import AppHeaderData from "@/components/header/AppHeaderData.vue";

export default {
  name: "Home",
  data() {
    return {
      title: "Home",
    };
  },
  components: {
    AppTimer,
    AppHeaderData,
  },
};
</script>
