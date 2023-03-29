export default {
  studentsData: JSON.parse(localStorage.getItem("students")),

  getStudents() {
    return this.studentsData;
  },

  getStudentbyId(id) {
    return this.studentsData.find(function (s) {
      return s.id == id;
    });
  },
  searchStudent(search) {
    return this.studentsData.filter(function (s) {
      return s.name.toLowerCase().includes(search);
    });
  },
  createStudent(student) {
    this.studentsData = [student, ...this.studentsData];
    localStorage.setItem("students", JSON.stringify(this.studentsData));
    return this.studentsData;
  },
  deleteStudent(id) {
    this.studentsData = this.studentsData.filter(function (s) {
      return s.id !== id;
    });
    localStorage.setItem("students", JSON.stringify(this.studentsData));
    return this.studentsData;
  },
  updateStudent(student) {
    this.studentsData.map(function (s) {
      return s.id === student.id ? student : s;
    });
    localStorage.setItem("students", JSON.stringify(this.studentsData));
    return this.studentsData;
  },
};
