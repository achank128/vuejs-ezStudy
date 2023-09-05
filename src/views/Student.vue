<script>
import StudentContent from "../components/StudentContent.vue";
export default {
  name: "Student",
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
