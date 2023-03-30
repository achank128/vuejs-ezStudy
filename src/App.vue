<script>
import Header from "./components/Header.vue";

export default {
  name: "App",
  components: {
    Header,
  },
};
</script>

<template>
  <main>
    <Header />
    <div class="container">
      <router-view msg="Hello"></router-view>
    </div>
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
