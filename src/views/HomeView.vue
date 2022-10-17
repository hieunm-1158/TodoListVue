<script setup lang="ts">
import TodoList from "../components/Todo/TodoList.vue";
import FormInput from "../components/Form/FormInput.vue";
import BaseButton from "../components/Base/BaseButton.vue";
import { onMounted, reactive } from "vue";
import type { TodoItemProps } from "@/components/Todo/TodoItem.vue";
import { http } from "@/api/http";
import type { AxiosResponse } from "axios";
import { handleError } from "@/utils/common";

let todoState: { list: TodoItemProps[]; todoText: string } = reactive({
  list: [],
  todoText: "",
});

const getTodoList = async () => {
  http
    .get("/todoList")
    .then((res: AxiosResponse) => {
      todoState.list = res.data;
    })
    .catch((error) => {
      handleError(error);
    });
};

const handleChangeTodoText = (event: Event) => {
  const { value } = event.target as HTMLInputElement;
  todoState.todoText = value;
};

const handleCreateTodoItem = () => {
  http
    .post("/todoList", {
      label: todoState.todoText,
      status: "to do",
    })
    .then((res: AxiosResponse) => {
      todoState.list.push(res.data);
      resetTodoText();
    })
    .catch((error) => {
      handleError(error);
    });
};

const handleDeleteTodoItem = (id: number) => {
  http
    .delete(`/todoList/${id}`)
    .then(() => {
      deleteTodoItem(id);
    })
    .catch((error) => {
      handleError(error);
    });
};

const handleUpdateTodoItem = (id: number) => {
  http
    .patch(`/todoList/${id}`, {
      status: "in progress",
    })
    .then(() => {
      updateStatusTodo(id);
    })
    .catch((error) => {
      handleError(error);
    });
};

const deleteTodoItem = (id: number) => {
  const newTodoList = [...todoState.list].filter((todoItem) => {
    return todoItem.id !== id;
  });
  todoState.list = newTodoList;
};

const updateStatusTodo = (id: number) => {
  [...todoState.list].map((todoItem) => {
    if (todoItem.id === id) {
      todoItem.status = "in progress";
    }
  });
};

const resetTodoText = () => {
  todoState.todoText = "";
};

onMounted(() => {
  getTodoList();
});
</script>

<template>
  <main>
    <section class="vh-100" style="background-color: #eee">
      <div class="container py-5 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col col-lg-9 col-xl-7">
            <div class="card rounded-3">
              <div class="card-body p-4">
                <h4 class="text-center my-3 pb-3">To Do App</h4>
                <form
                  class="row row-cols-lg-auto g-3 justify-content-center align-items-center mb-4 pb-2"
                >
                  <div class="col-12">
                    <FormInput
                      :value="todoState.todoText"
                      @onHandleChangeInput="handleChangeTodoText"
                    />
                  </div>

                  <div class="col-12">
                    <BaseButton
                      class-option="btn-primary"
                      title="Save"
                      @onClickButton="handleCreateTodoItem"
                    />
                  </div>

                  <div class="col-12">
                    <BaseButton class-option="btn-warning" title="Get tasks" />
                  </div>
                </form>
                <TodoList
                  :list="todoState.list"
                  @onHandleDeleteTodoItem="handleDeleteTodoItem"
                  @onHandleUpdateTodoItem="handleUpdateTodoItem"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
