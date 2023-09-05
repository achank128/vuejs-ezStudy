<script>
import classService from "../services/class";

export default {
  name: "ClassForm",
  props: {
    showSnackBar: Function,
  },
  data() {
    return {
      title: "Add Class",
      id: "",
      classForm: {
        id: Date.now(),
        className: "",
        parent: "",
      },
      nameRules: [
        (value) => {
          if (!value) return "Class Name is required.";
        },
        (value) => {
          if (value?.length < 4 || value?.length > 100)
            return "Class Name must be between 4 and 100 characters.";
        },
      ],
      grade: [],
    };
  },
  methods: {
    async submitForm(c) {
      if (this.id) {
        //update
        await classService.updateClass(c);
        this.showSnackBar("Class has been updated!");
      } else {
        //create
        await classService.createClass(c);
        this.showSnackBar("Class has been created!");
      }
      this.$router.push("/class");
    },

    async getClass() {
      this.classForm = await classService.getClassbyId(this.id);
    },

    async getGrade() {
      this.grade = await classService.getGrade();
    },
  },
  created() {
    this.getGrade();
    this.id = this.$route.params.id;
    if (this.id) {
      this.title = "Edit Class";
      this.getClass();
    }
  },
};
</script>
<template>
  <h2>{{ title }}</h2>
  <form @submit.prevent="submitForm(classForm)">
    <div class="field">
      <label>Class Name:</label>
      <v-text-field
        label="Class name"
        v-model="classForm.className"
        :rules="nameRules"
        required
      />
    </div>
    <div class="field">
      <label>Grade:</label>
      <v-select
        v-model="classForm.parent"
        :items="grade"
        item-title="className"
        item-value="id"
        label="Class"
      ></v-select>
    </div>
    <v-btn color="primary" type="submit" class="me-4">Save</v-btn>
    <v-btn to="/class">Cancel</v-btn>
  </form>
</template>

<style scoped>
h2 {
  margin-bottom: 20px;
}
.field {
  max-width: 500px;
}
</style>
