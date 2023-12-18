<script setup>
const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
  headers: {
    type: Array,
    required: true,
  },
  isLoading: Boolean,
  hasError: Boolean,
});
</script>

<template>
  <table class="table table-responsive border rounded shadow-sm">
    <thead class="table-light rounded-top position-sticky top-0">
      <tr class="align-middle">
        <th v-for="(header, index) in props.headers" :key="index" scope="col">
          {{ header }}
        </th>
      </tr>
    </thead>
    <tbody v-if="!props.isLoading && !props.hasError && props.data.length > 0">
      <tr v-for="(item, index) in props.data" :key="index" class="align-middle">
        <td>{{ new Date(item.Datum).toLocaleDateString("en-GB") }}</td>
        <td>{{ item.Factuurtotaal }}</td>
        <td>{{ item.Group }}</td>
        <td>{{ item.Magazijn }}</td>
        <td>{{ item.Naam }}</td>
        <td>{{ item.Nummer }}</td>
        <td>{{ item.Nummer_crediteur }}</td>
        <td>{{ item.Status }}</td>
        <td>{{ item.Totaalbedrag_exclusief }}</td>
        <td>{{ item.Type_order }}</td>
        <td>{{ item.Valuta }}</td>
      </tr>
    </tbody>
    <div
      v-else-if="props.isLoading && !props.hasError"
      class="table__body--loading"
    >
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <div v-else-if="props.hasError" class="table__body--error">
      <p>There was an error loading the data.</p>
    </div>
    <div v-else-if="props.data.length == 0" class="table__body--error">
      <p>There are no results.</p>
    </div>
  </table>
</template>
