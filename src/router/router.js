import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/Home.vue";
import Student from "../views/Student.vue";
import StudentForm from "../views/StudentForm.vue";
import Class from "../views/Class.vue";
import ClassForm from "../views/ClassForm.vue";
import Teacher from "../views/Teacher.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/student",
    name: "Student",
    component: Student,
  },
  {
    path: "/add-student",
    name: "AddStudent",
    component: StudentForm,
  },
  {
    path: "/update-student/:id",
    name: "UpdateStudent",
    component: StudentForm,
  },
  {
    path: "/class",
    name: "Class",
    component: Class,
  },
  {
    path: "/add-class",
    name: "AddClass",
    component: ClassForm,
  },
  {
    path: "/update-class/:id",
    name: "UpdateClass",
    component: ClassForm,
  },
  {
    path: "/teacher",
    name: "Teacher",
    component: Teacher,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
