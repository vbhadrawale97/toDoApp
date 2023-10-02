<template>
    <div>
  <input type="text" v-model="task"/>
  <button @click="addTask">Add Task</button>
</div>
</template>

<script>
export default {
    data() {
        return {
            task: ""
        }
    },
    methods: {
        addTask() {
            this.$emit("add-task", this.task);
        }
    }
}
</script>

<style>

</style>