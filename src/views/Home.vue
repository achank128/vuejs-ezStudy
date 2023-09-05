<script>
import StudentContent from "../components/StudentContent.vue";
export default {
  name: "Home",
  props: {
    showSnackBar: Function,
  },
  components: {
    StudentContent,
  },
};
</script>

<template>
  <StudentContent :showSnackBar="showSnackBar" />
</template>
