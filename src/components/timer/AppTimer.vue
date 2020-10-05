<template>
  <div id="app-timer">
    <div class="columns is-centered">
      <div class="column is-one-quarter">
        <span class="fa-stack fa-6x" v-on="timerHandlers">
          <font-awesome-icon
            id="start-button"
            icon="circle"
            class="fa-stack-2x has-text-grey-light"
          />
          <font-awesome-icon icon="hand-paper" class="fa-stack-1x" />
        </span>
      </div>
    </div>
    <div class="columns is-centered">
      <div class="column is-one-quarter">
        <label id="timer-time">{{ formatDuration }}</label>
      </div>
    </div>
    <transition name="stats">
      <div class="columns is-centered" v-if="hasTimes">
        <AppTimerStats />
        <AppTimerTimes />
      </div>
    </transition>
  </div>
</template>

<script>
import AppTimerStats from "@/components/timer/AppTimerStats.vue";
import AppTimerTimes from "@/components/timer/AppTimerTimes.vue";
import { timerMixin } from "@/mixins/timerMixin";
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  name: "Timer",
  data() {
    const vm = this;
    return {
      buttonStatus: 0,
      timeout: null,
      timerHandlers: {
        mousedown: vm.buttonDown,
        mouseup: vm.buttonUp,
      },
    };
  },
  components: {
    AppTimerStats,
    AppTimerTimes,
  },
  mixins: [timerMixin],
  computed: {
    ...mapGetters("time/", ["hasTimes"]),
    // Timer button can only be used when modal isn't active,
    // which prevents keyboard inputs from activating the timer when
    // modal is active.
    ...mapState("modal/", { activeModal: (state) => state.activeModal }),
  },
  methods: {
    ...mapActions("time/", ["addTime"]),
    logTime() {
      this.addTime({
        //user: this.userData,
        time: this.duration,
        dnf: false,
        penalty: false,
        comment: "",
      });
    },
    changeSignal(from, to) {
      const startBtn = document.getElementById("start-button");
      startBtn.classList.toggle(from);
      startBtn.classList.toggle(to);
    },
    buttonDown() {
      if (!this.activeModal) {
        if (event.type === "mousedown" || event.type === "keydown") {
          // Get ready to start timer.
          if (this.buttonStatus === 0) {
            this.changeSignal("has-text-grey-light", "has-text-warning");
            this.buttonStatus = 1;

            this.timeout = setTimeout(() => {
              if (this.buttonStatus === 1) {
                this.changeSignal("has-text-warning", "has-text-success");
                this.buttonStatus = 2;
              }
            }, 500);
          }

          // Stop the timer.
          if (this.buttonStatus === 3) {
            this.changeSignal("has-text-danger", "has-text-grey-light");
            this.buttonStatus = 0;
            this.stopTimer();
            this.logTime();
          }
        }
      }
    },
    buttonUp() {
      if (!this.activeModal) {
        if (event.type === "mouseup" || event.type === "keyup") {
          // Cancel before timer starts.
          if (this.buttonStatus === 1) {
            this.changeSignal("has-text-warning", "has-text-grey-light");
            this.buttonStatus = 0;
          }

          // Start timer.
          if (this.buttonStatus === 2) {
            this.changeSignal("has-text-success", "has-text-danger");
            this.buttonStatus = 3;
            this.startTimer();
          }
        }

        if (this.timeout !== null) {
          clearTimeout(this.timeout);
          this.timeout = null;
        }
      }
    },
  },
  beforeMount() {
    // Start and stop timer with any keyboard keypress.
    window.addEventListener("keydown", this.buttonDown);
    window.addEventListener("keyup", this.buttonUp);
  },
  beforeDestroy() {
    // Remove events when leaving the timer page.
    window.removeEventListener("keydown", this.buttonDown);
    window.removeEventListener("keyup", this.buttonUp);
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Anton&family=Montserrat&family=Orbitron:wght@900&display=swap");

#timer-time {
  font-size: 5em;
  font-family: "Orbitron", sans-serif;
}
</style>

<style>
.fa-stack:hover {
  transform: scale(0.75, 0.75);
  cursor: pointer;
}
.fa-stack {
  transition: transform 0.5s ease 0s;
}
</style>