<script setup lang="ts">
import BaseButton from "../Base/BaseButton.vue";

export type TodoItemProps = {
  id: number;
  label: string;
  status: "in progress" | "finished" | "to do";
};

const emits = defineEmits<{
  (event: "onHandleDeleteTodoItem", id: number): void;
  (event: "onHandleUpdateTodoItem", id: number): void;
}>();

const props = defineProps<TodoItemProps>();

const handleDeleteTodoItem = () => {
  emits("onHandleDeleteTodoItem", props.id);
};

const handleUpdateTodoItem = () => {
  emits("onHandleUpdateTodoItem", props.id);
};
</script>

<template>
  <tr>
    <th scope="row">{{ props.id }}</th>
    <td>{{ props.label }}</td>
    <td>
      <span
        :onclick="handleUpdateTodoItem"
        class="btn bg-secondary text-white m-0 w-100"
        >{{ props.status }}</span
      >
    </td>
    <td>
      <BaseButton
        type="button"
        class-option="btn-danger me-3"
        title="Delete"
        @onClickButton="handleDeleteTodoItem"
      />
      <BaseButton
        type="button"
        class-option="btn-success ms-1r"
        title="Finished"
      />
    </td>
  </tr>
</template>
