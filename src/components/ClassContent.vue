<script>
import classService from "../services/class";

export default {
  name: "ClassContent",
  props: {
    showSnackBar: Function,
  },
  data() {
    return {
      classes: [],
      classesData: [],
      paginationLimit: 5,
      currentPage: 1,
      pageCount: 3,
    };
  },
  methods: {
    async getClasses() {
      this.classesData = await classService.getClasses();
      this.setCurrentPage();
    },

    async deleteClass(id) {
      await classService.deleteClass(id);
      this.getClasses();
      this.showSnackBar("Delete class successful");
    },

    setCurrentPage() {
      this.pageCount = Math.ceil(
        this.classesData.length / this.paginationLimit
      );

      const prevRange = (this.currentPage - 1) * this.paginationLimit;
      const currRange = this.currentPage * this.paginationLimit;

      this.classes = this.classesData.filter(function (item, index) {
        if (index >= prevRange && index < currRange) {
          return item;
        }
      });
    },

    getGrade(id) {
      const grade = this.classesData.find((c) => c.id == id);
      return grade.className;
    },
  },
  created() {
    this.getClasses();
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
