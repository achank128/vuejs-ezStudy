<script>
import Header from "./components/Header.vue";
import SnackBar from "./components/SnackBar.vue";

export default {
  name: "App",
  components: {
    Header,
    SnackBar,
  },
  data() {
    return {
      snackbar: false,
      snackbarText: `Successful`,
      showSnackBar: Function,
    };
  },
  methods: {
    //showSnackBar(show) {},
  },
};
</script>

<template>
  <main>
    <Header />
    <div class="container">
      <router-view :showSnackBar="showSnackBar"></router-view>
    </div>
    <SnackBar @show-snackbar="(show) => (showSnackBar = show)" />
  </main>
</template>

<style>
* {
  margin: 0;
  padding: auto;
  box-sizing: border-box;
}

body {
  font-family: Arial, Helvetica, sans-serif;
}

.container {
  padding: 30px;
}
</style>
