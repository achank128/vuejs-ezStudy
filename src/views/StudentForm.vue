<script>
import studentService from "../services/students";
import classService from "../services/class";

export default {
  name: "StudentForm",
  data() {
    return {
      title: "Add Student",
      id: "",
      student: {
        id: Date.now(),
        name: "",
        birthDate: "",
        class: "",
      },
      nameRules: [
        (value) => {
          if (!value) return "Name is required.";
        },
        (value) => {
          if (value?.length < 4 || value?.length > 150)
            return "Name must be between 4 and 150 characters.";
        },
      ],
      classes: [],
    };
  },
  methods: {
    submitForm(student) {
      if (this.student.name.length >= 4 && this.student.name.length <= 150) {
        if (this.id) {
          //update
          studentService.updateStudent(student);
        } else {
          //create
          studentService.createStudent(student);
        }
        this.$router.push("/");
      }
    },
  },
  created() {
    this.classes = classService.getClasses();
    this.id = this.$route.params.id;
    if (this.id) {
      this.student = studentService.getStudentbyId(this.id);
      this.student.birthDate = new Date(this.student.birthDate)
        .toISOString()
        .substr(0, 10);
    }
  },
};
</script>
<template>
  <h2>{{ title }}</h2>
  <form @submit.prevent="submitForm(student)">
    <div class="field">
      <label>Name:</label>
      <v-text-field
        label="Full name"
        v-model="student.name"
        :rules="nameRules"
        required
      />
    </div>
    <div class="field">
      <label>Birth Date:</label>
      <v-text-field
        type="date"
        label="Birth Date"
        v-model="student.birthDate"
      />
    </div>
    <div class="field">
      <label>Class:</label>
      <v-select
        v-model="student.class"
        :items="classes"
        item-title="className"
        item-value="id"
        label="Class"
      ></v-select>
    </div>
    <v-btn color="primary" type="submit" class="me-4">Save</v-btn>
    <v-btn to="/student">Cancel</v-btn>
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
