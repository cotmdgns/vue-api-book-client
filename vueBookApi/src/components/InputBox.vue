<template>
  <div>
    <input
      class="inputBox"
      type="text"
      :value="modelDate"
      @input="updateModelDate"
      :placeholder="placeholder"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  modelDate: String,
  placeholder: String,
});
const emit = defineEmits(["update:modelDate"]);

// input 값이 변경될 때 update:modelDate 이벤트를 emit
const updateModelDate = (event) => {
  emit("update:modelDate", event.target.value);
};
</script>

<style scoped></style>
