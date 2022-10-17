<script setup lang="ts">
import TodoItem from "./TodoItem.vue";
import type { TodoItemProps } from "./TodoItem.vue";

type TodoListProps = {
  list?: TodoItemProps[];
};
const emits = defineEmits<{
  (event: "onHandleDeleteTodoItem", id: number): void;
  (event: "onHandleUpdateTodoItem", id: number): void;
}>();

const props = withDefaults(defineProps<TodoListProps>(), {
  list: () => [],
});

const handleDeleteTodoItem = (id: number) => {
  emits("onHandleDeleteTodoItem", id);
};

const handleUpdateTodoItem = (id: number) => {
  emits("onHandleUpdateTodoItem", id);
};
</script>

<template>
  <table class="table mb-4">
    <thead>
      <tr>
        <th scope="col">No.</th>
        <th scope="col">Todo item</th>
        <th scope="col">Status</th>
        <th scope="col">Actions</th>
      </tr>
    </thead>
    <tbody>
      <TodoItem
        v-for="todoItem in props.list"
        :key="todoItem.id"
        :id="todoItem.id"
        :label="todoItem.label"
        :status="todoItem.status"
        @onHandleDeleteTodoItem="handleDeleteTodoItem"
        @onHandleUpdateTodoItem="handleUpdateTodoItem"
      />
    </tbody>
  </table>
</template>
