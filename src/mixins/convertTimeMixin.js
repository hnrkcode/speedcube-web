import { formatTime } from "@/scripts/formatHelpers";

export const convertTimeMixin = {
  methods: {
    convertTime(ms) {
      return formatTime(ms);
    },
  },
};
