<template>
  <div id="app" class="container mt-5">
  <b-jumbotron header="To Do App" lead="Bootstrap v4 Components for Vue.js 2" >
    <AddTask @add-task="addTask"/>
    <ShowTasks :tasks="tasks" @delete-task="deleteTask"/>
    <AddTask @add-task="addTask"/>
    <ShowTasks :tasks="tasks" @delete-task="deleteTask"/>
    <AddTask @add-task="addTask"/>
    <ShowTasks :tasks="tasks" @delete-task="deleteTask"/>
    <AddTask @add-task="addTask"/>
    <ShowTasks :tasks="tasks" @delete-task="deleteTask"/>
    <AddTask @add-task="addTask"/>
    <ShowTasks :tasks="tasks" @delete-task="deleteTask"/>
    <AddTask @add-task="addTask"/>
    <ShowTasks :tasks="tasks" @delete-task="deleteTask"/>
  </b-jumbotron>
</div>
   
  
</template>

<script>
import axios from "axios";
import ShowTasks from './components/ShowTasks.vue'
import AddTask from './components/AddTask.vue';
import 'bootstrap/dist/css/bootstrap.min.css';

export default {
  name: 'App',
  data() {
    return {
      tasks: []
    }
  },
  components: {
    ShowTasks,
    AddTask
  },
  created() {
    this.getTasks();
  },
  methods: {
    addTask(taskTitle) {
      let url = "http://localhost:5000/add-task";
      const formData = new FormData();
      formData.append("taskTitle", taskTitle);
      axios.post(url, formData).then((response) => {
        console.log("add task response", response);
        this.getTasks();
      })
      .catch((error) => {
        console.log(error);
      })
    },
    deleteTask(id) {
      let url = `http://localhost:5000/delete-task?id=${id}`;
      axios.delete(url).then(response => {
        console.log("delete task response", response);
        this.getTasks();
      })
      .catch(error => {
        console.log(error);
      })
    },
    getTasks() {
            let url = "http://localhost:5000/get-tasks";
            axios.get(url).then(({ data }) => {
                this.tasks = data;
            })
            .catch((error) => {
                console.log(error);
            })
        }
  }
}
</script>

<style>
body {
  background-color: #FFF5FF;
}
</style>
