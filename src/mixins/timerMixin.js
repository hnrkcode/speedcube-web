import { formatTime } from "@/scripts/formatHelpers";

export const timerMixin = {
  data() {
    return {
      start: 0,
      now: 0,
      tick: 0,
      duration: 0,
    };
  },
  computed: {
    formatDuration() {
      return formatTime(this.duration);
    },
  },
  methods: {
    startTimer() {
      // Can only start the timer if it isn't already running.
      if (!this.tick) {
        this.duration = 0;
        this.start = this.now = new Date().valueOf();
        this.tick = setInterval(this.timerFunction, 1);
      }
    },
    stopTimer() {
      clearInterval(this.tick);
      this.tick = 0;
    },
    // Calculates number of milliseconds passed since the timer started.
    timerFunction() {
      this.now = new Date().valueOf();
      this.duration = this.now - this.start;
    },
  },
};
