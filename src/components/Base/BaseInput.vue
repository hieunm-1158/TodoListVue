<script setup lang="ts">
type BaseInputProps = {
  type?:
    | "button"
    | "checkbox"
    | "color"
    | "date"
    | "datetime-local"
    | "email"
    | "file"
    | "hidden"
    | "image"
    | "month"
    | "number"
    | "password"
    | "radio"
    | "range"
    | "reset"
    | "search"
    | "submit"
    | "tel"
    | "text"
    | "time"
    | "url"
    | "week";
  classOption?: string;
  name?: string;
  id?: string;
  placeHolder?: string;
  value: string;
};

const emits = defineEmits<{
  (event: "onHandleChangeInput", payload: Event): void;
}>();

const props = withDefaults(defineProps<BaseInputProps>(), {
  type: "text",
});

const handleChangeInput = (event: Event) => {
  emits("onHandleChangeInput", event);
};
</script>
<template>
  <input
    :type="props.type"
    :id="props.id"
    :class="`form-control ${props.classOption}`"
    :placeholder="props.placeHolder"
    :name="props.name"
    :value="props.value"
    @input="handleChangeInput"
  />
</template>
