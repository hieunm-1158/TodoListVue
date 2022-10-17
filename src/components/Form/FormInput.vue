<script setup lang="ts">
import BaseInput from "../Base/BaseInput.vue";

type FormInputProps = {
  value: string;
};

const emits = defineEmits<{
  (event: "onHandleChangeInput", payload: Event): void;
}>();

const props = defineProps<FormInputProps>();

const handleChangeInput = (event: Event) => {
  emits("onHandleChangeInput", event);
};
</script>
<template>
  <div class="form-outline">
    <BaseInput
      id="form1"
      :value="props.value"
      @onHandleChangeInput="handleChangeInput"
    />
  </div>
</template>
