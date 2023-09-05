import { request } from "./apiService";

export default {
  // classesData: JSON.parse(localStorage.getItem("classes")),

  async getClasses() {
    try {
      const res = await request.get("/classes");
      return res.data;
    } catch (error) {
      console.log(error);
    }
  },

  async getClassbyId(id) {
    try {
      const res = await request.get("/classes/" + id);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  },

  async getClassbyGrade(id) {
    const classesData = await this.getClasses();
    return classesData.filter(function (s) {
      return s.parent == id;
    });
  },

  async getGrade() {
    const classesData = await this.getClasses();
    return classesData.filter(function (s) {
      return s.parent == null;
    });
  },

  async searchClass(search) {
    const classesData = await this.getClasses();
    return classesData.filter(function (s) {
      return s.className.toLowerCase().includes(search);
    });
  },

  async createClass(c) {
    try {
      const res = await request.post("/classes", c);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  },

  async deleteClass(id) {
    try {
      const res = await request.delete("/classes/" + id);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  },

  async updateClass(c) {
    try {
      const res = await request.put("/classes/" + c.id, c);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  },
};
