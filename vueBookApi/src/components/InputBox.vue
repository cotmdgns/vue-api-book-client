<template>
  <input
    class="inputBox"
    :type="inputType"
    :value="modelValue"
    @input="updateModelDate"
    :placeholder="placeholder"
    @keydown.enter="$emit('enter')"
  />
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  inputType: { type: String, default: "text" },
  modelValue: String,
  placeholder: String,
});

// 이렇게 설명해야 부모에도 전달가능
const emit = defineEmits(["update:modelValue", "enter"]);
// input 값이 변경될 때 update:modelDate 이벤트를 emit
const updateModelDate = (event) => {
  emit("update:modelValue", event.target.value);
};
</script>

<style scoped>
input {
  padding: 10px;
  border: 1px solid rgb(196, 196, 196);
  border-radius: 5px;
  margin: 5px 0px 5px 0px;
  width: 100%;
  min-width: 300px;
}
</style>
