<script>
import ClassContent from "../components/ClassContent.vue";
export default {
  name: "Class",
  props: {
    showSnackBar: Function,
  },
  components: {
    ClassContent,
  },
};
</script>

<template>
  <ClassContent :showSnackBar="showSnackBar" />
</template>
