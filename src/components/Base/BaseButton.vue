<script setup lang="ts">
type BaseButtonProps = {
  type?: "button" | "submit" | "reset";
  classOption?: string;
  title?: string;
};

const changeEmitName = "onClickButton";
const emits = defineEmits<{ (event: typeof changeEmitName): void }>();

const handleClick = () => {
  emits("onClickButton");
};

const props = withDefaults(defineProps<BaseButtonProps>(), {
  type: "button",
  classOption: "",
  title: "",
});
</script>

<template>
  <button
    :type="props.type"
    :class="`btn ${props.classOption}`"
    @click="handleClick"
  >
    {{ title }}
  </button>
</template>
