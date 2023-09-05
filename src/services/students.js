import { request } from "./apiService";

export default {
  async getStudents() {
    try {
      const res = await request.get("/students");
      return res.data;
    } catch (error) {
      console.log(error);
    }
  },

  async getStudentbyId(id) {
    try {
      const res = await request.get("/students/" + id);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  },

  async createStudent(student) {
    try {
      const res = await request.post("/students", student);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  },

  async deleteStudent(id) {
    try {
      const res = await request.delete("/students/" + id);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  },

  async updateStudent(student) {
    try {
      const res = await request.put("/students/" + student.id, student);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  },

  async searchStudent(search) {
    try {
      const res = await request.get("/students");
      return res.data.filter(function (s) {
        return s.name.toLowerCase().includes(search);
      });
    } catch (error) {
      console.log(error);
    }
  },
};
