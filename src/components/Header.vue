<script>
export default {
  name: "Header",
};
</script>

<template>
  <header class="header bg-primary">
    <router-link to="/">
      <h1>ezStudy</h1>
    </router-link>
    <v-tabs v-model="tab" bg-color="primary">
      <v-tab to="/student">Student</v-tab>
      <v-tab to="/class">Class</v-tab>
    </v-tabs>
  </header>
</template>

<style scoped>
.header {
  padding: 10px 30px;
  display: flex;
  align-items: center;
}
h1 {
  color: white;
}
a {
  margin-right: 20px;
  color: white;
  text-decoration: none;
}
</style>
