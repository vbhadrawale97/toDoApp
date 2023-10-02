<template>
    <div>
        <p v-for="(task, index) in tasks" :key="index">
            {{ task.taskTitle }} <button @click="deleteTask(task.id)">Delete Task</button>
        </p>
    </div>
</template>

<script>
export default {
    props: ["tasks"],
    methods: {
        deleteTask(id) {
            this.$emit("delete-task", id);
        }
    }
}
</script>