<script>
export default {
  name: "SnackBar",
  data() {
    return {
      snackbar: false,
      snackbarText: `Successful`,
    };
  },
  methods: {
    showSnackBar(text) {
      this.snackbar = true;
      setTimeout(() => {
        this.snackbar = false;
      }, 2000);
      this.snackbarText = text;
    },
  },
  emits: ["show-snackbar"],
  created() {
    this.$emit("show-snackbar", this.showSnackBar);
  },
};
</script>
<template>
  <v-snackbar v-model="snackbar">
    {{ snackbarText }}
    <template v-slot:actions>
      <v-btn color="red" variant="text" @click="snackbar = false">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>
