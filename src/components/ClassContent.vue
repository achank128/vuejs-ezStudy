<script>
import classService from "../services/class";

export default {
  name: "ClassContent",
  data() {
    return {
      classes: [],
      paginationLimit: 5,
      currentPage: 1,
      pageCount: 3,
      snackbar: false,
      snackbarText: `Successful`,
    };
  },
  methods: {
    getGrade(id) {
      return classService.getClassbyId(id)?.className;
    },

    deleteClass(id) {
      this.classes = classService.deleteClass(id);
      this.setCurrentPage();
      this.setSnackBar("Delete class successful");
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
        classService.getClasses().length / this.paginationLimit
      );

      const prevRange = (this.currentPage - 1) * this.paginationLimit;
      const currRange = this.currentPage * this.paginationLimit;

      this.classes = classService.getClasses().filter(function (item, index) {
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
    <h2>Class</h2>
    <v-btn color="primary" to="/add-class">Add Class</v-btn>
  </div>
  <v-table>
    <thead>
      <tr>
        <th>#</th>
        <th>Class Name</th>
        <th>Grade</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(c, index) in classes" :key="c.id">
        <td>{{ index + (currentPage - 1) * paginationLimit + 1 }}</td>
        <td>{{ c.className }}</td>
        <td>{{ c.parent ? getGrade(c.parent) : "--" }}</td>
        <td>
          <v-btn
            color="success"
            :to="`/update-class/${c.id}`"
            style="margin-right: 10px"
            >Edit</v-btn
          >
          <v-btn color="red" @click="deleteClass(c.id)">Delete</v-btn>
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
