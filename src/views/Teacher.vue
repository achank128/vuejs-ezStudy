<script>
import axios from "axios";
import { request } from "../services/apiService";
export default {
  name: "Teacher",
  data() {
    return {
      teachers: [],
    };
  },
  methods: {
    async getApi() {
      try {
        const res = await axios.get("https://reqres.in/api/users?page=1");
        this.teachers = res.data.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.getApi();
  },
};
</script>

<template>
  <h2>Teacher</h2>
  <v-container>
    <v-row>
      <v-col v-for="t in teachers" :key="t.id" cols="12" sm="3">
        <v-card class="mx-auto">
          <v-img :src="t.avatar" height="200px" cover></v-img>
          <v-card-title> {{ t.first_name + " " + t.last_name }} </v-card-title>
          <v-card-text> {{ t.email }} </v-card-text>
          <v-card-actions>
            <v-btn>Detail</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style>
.item {
  background-color: #c7c7c7;
  border: 1px solid #333;
  padding: 20px;
  margin-bottom: 20px;
}
</style>
