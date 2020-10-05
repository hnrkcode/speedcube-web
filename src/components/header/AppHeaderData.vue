<script>
export default {
  name: "HeaderData",
  props: ["title"],
  watch: {
    title: {
      immediate: true,
      handler() {
        document.title = this.title;
      },
    },
  },
  render() {
    return "";
  },
};
</script>
