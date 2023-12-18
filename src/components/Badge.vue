<script setup>
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["removeFilter"]);

const onClick = () => {
  emit("removeFilter", props.name);
};
</script>

<template>
  <div class="badge text-dark border shadow-sm me-2 mb-2">
    {{ props.name }}: {{ props.value }}
    <button
      type="button"
      class="btn-close"
      aria-label="Close"
      @click="onClick"
    ></button>
  </div>
</template>
