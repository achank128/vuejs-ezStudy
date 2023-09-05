<script>
import studentService from "../services/students";
import classService from "../services/class";

export default {
  name: "StudentContent",
  props: {
    showSnackBar: Function,
  },
  data() {
    return {
      search: "",
      students: [],
      classes: [],
      studentsData: [],
      paginationLimit: 5,
      currentPage: 1,
      pageCount: 3,
    };
  },
  methods: {
    async getStudents() {
      this.studentsData = await studentService.getStudents();
      this.setCurrentPage();
    },

    async getClasses() {
      this.classes = await classService.getClasses();
    },
    async deleteStudent(id) {
      await studentService.deleteStudent(id);
      this.getStudents();
      this.showSnackBar("Delete student successful");
    },

    async searchStudent(search) {
      this.studentsData = await studentService.searchStudent(search);
      this.setCurrentPage();
    },

    setCurrentPage() {
      this.pageCount = Math.ceil(
        this.studentsData.length / this.paginationLimit
      );

      const prevRange = (this.currentPage - 1) * this.paginationLimit;
      const currRange = this.currentPage * this.paginationLimit;

      this.students = this.studentsData.filter(function (item, index) {
        if (index >= prevRange && index < currRange) {
          return item;
        }
      });
    },

    getAge(birthdate) {
      var bd = new Date(birthdate);
      var diff_ms = Date.now() - bd.getTime();
      var age_dt = new Date(diff_ms);
      return Math.abs(age_dt.getUTCFullYear() - 1970);
    },

    getClassName(classId) {
      return this.classes.find((c) => c.id == classId)?.className;
    },
  },
  created() {
    this.getStudents();
    this.getClasses();
  },
};
</script>

<template>
  <div class="top-bar">
    <h2>Student</h2>
    <v-btn to="/add-student" color="primary">Add Student</v-btn>
  </div>

  <form @submit.prevent="searchStudent(search)">
    <v-text-field label="Search" v-model="search" style="max-width: 500px" />
  </form>
  <v-table>
    <thead>
      <tr>
        <th class="text-left">#</th>
        <th class="text-left">Full Name</th>
        <th class="text-left">Age</th>
        <th class="text-left">Class</th>
        <th class="text-left">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(student, index) in students" :key="student.id">
        <td>{{ index + (currentPage - 1) * paginationLimit + 1 }}</td>
        <td>{{ student.name }}</td>
        <td>{{ getAge(student.birthDate) }}</td>
        <td>{{ getClassName(student.class) }}</td>
        <td>
          <v-btn
            :to="`/update-student/${student.id}`"
            color="success"
            style="margin-right: 10px"
          >
            Edit
          </v-btn>

          <v-btn color="red" @click="deleteStudent(student.id)">Delete</v-btn>
        </td>
      </tr>
    </tbody>
  </v-table>
  <v-pagination
    v-model="currentPage"
    :length="pageCount"
    @click="setCurrentPage()"
  />
</template>

<style lang="scss" scoped>
.top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  h2 {
    margin-bottom: 20px;
  }
}
</style>
