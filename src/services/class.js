import { CLASS } from "./mockData";

export default {
  classesData: JSON.parse(localStorage.getItem("classes")),

  getClasses() {
    return this.classesData;
  },

  getClassbyId(id) {
    return this.classesData.find(function (s) {
      return s.id == id;
    });
  },

  getClassbyGrade(id) {
    return this.classesData.filter(function (s) {
      return s.parent == id;
    });
  },

  getGrade() {
    return this.classesData.filter(function (s) {
      return s.parent == null;
    });
  },

  searchClass(search) {
    return this.classesData.filter(function (s) {
      return s.className.toLowerCase().includes(search);
    });
  },

  createClass(c) {
    this.classesData.push(c);
    localStorage.setItem("classes", JSON.stringify(this.classesData));
    return this.classesData;
  },

  deleteClass(id) {
    this.classesData = this.classesData.filter(function (s) {
      return s.id !== id;
    });
    localStorage.setItem("classes", JSON.stringify(this.classesData));
    return this.classesData;
  },

  updateClass(classUpdate) {
    this.classesData.map(function (c) {
      return c.id === classUpdate.id ? classUpdate : c;
    });
    localStorage.setItem("classes", JSON.stringify(this.classesData));
    return this.classesData;
  },
};
