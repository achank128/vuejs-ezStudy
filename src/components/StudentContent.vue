<script>
import studentService from "../services/students";
import classService from "../services/class";

export default {
  name: "StudentContent",
  data() {
    return {
      students: [],
      paginationLimit: 5,
      currentPage: 1,
      pageCount: 3,
      snackbar: false,
      snackbarText: `Successful`,
    };
  },
  methods: {
    getStudents() {
      this.students = studentService.getStudents();
    },

    getAge(birthdate) {
      var bd = new Date(birthdate);
      var diff_ms = Date.now() - bd.getTime();
      var age_dt = new Date(diff_ms);
      return Math.abs(age_dt.getUTCFullYear() - 1970);
    },

    getClassName(classId) {
      let className = classService.getClassbyId(classId)?.className;
      return className;
    },
    deleteStudent(id) {
      this.students = studentService.deleteStudent(id);
      this.setCurrentPage();
      this.setSnackBar("Delete student successful");
    },

    setSnackBar(text) {
      this.snackbar = true;
      setTimeout(() => {
        this.snackbar = false;
      }, 2000);
      this.snackbarText = text;
    },

    setCurrentPage() {
      this.pageCount = Math.ceil(
        studentService.getStudents()?.length / this.paginationLimit
      );

      const prevRange = (this.currentPage - 1) * this.paginationLimit;
      const currRange = this.currentPage * this.paginationLimit;

      this.students = studentService
        .getStudents()
        .filter(function (item, index) {
          if (index >= prevRange && index < currRange) {
            return item;
          }
        });
    },
  },
  created() {
    this.setCurrentPage();
  },
};
</script>

<template>
  <div class="top-bar">
    <h2>Student</h2>
    <v-btn to="/add-student" color="primary">Add Student</v-btn>
  </div>
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

  <v-snackbar v-model="snackbar">
    {{ snackbarText }}
    <template v-slot:actions>
      <v-btn color="red" variant="text" @click="snackbar = false">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<style scoped>
.top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

h2 {
  margin-bottom: 20px;
}
</style>
