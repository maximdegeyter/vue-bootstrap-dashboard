<script setup>
import { ref, onMounted, computed } from "vue";
import Badge from "@/components/Badge.vue";
import Table from "@/components/Table.vue";
import { getOffers } from "@/services/api";
import { tableHeaders } from "@/data/ontvangsten";

const tableData = ref(null);
const loading = ref(true);
const error = ref(false);
const searchTerm = ref(null);
const filters = ref({
  status: { name: "Status", value: null },
  startdate: { name: "StartDate", value: null },
  enddate: { name: "EndDate", value: null },
});

const filteredTableData = computed(() => {
  if (tableData.value === null) {
    return null;
  }

  return tableData.value.filter((item) => {
    const matchesStatus =
      !filters.value.status.value || item.Status === filters.value.status.value;
    const matchesSearch =
      !searchTerm.value ||
      item.Naam.toLowerCase().includes(searchTerm.value.toLowerCase());
    const matchesDate =
      (!filters.value.startdate.value ||
        new Date(item.Datum) >= new Date(filters.value.startdate.value)) &&
      (!filters.value.enddate.value ||
        new Date(item.Datum) <= new Date(filters.value.enddate.value));
    return matchesStatus && matchesSearch && matchesDate;
  });
});

const isAnyFilterActive = computed(() => {
  return Object.values(filters.value).some((filter) => filter.value !== null);
});

const activeFilters = computed(() => {
  return Object.values(filters.value).filter((filter) => filter.value !== null);
});

onMounted(async () => {
  tableData.value = await getOffers();
  loading.value = false;

  if (tableData.value === null) {
    error.value = true;
  }
});

const setStatusFilter = (status) => {
  filters.value.status = { name: "Status", value: status };
};

const removeFilter = (filterName) => {
  if (filters.value[filterName.toLowerCase()]) {
    filters.value[filterName.toLowerCase()].value = null;
  }
};
</script>

<template>
  <div class="container-md my-5">
    <h1>Ontvangsten</h1>
    <div class="row justify-content-end mb-3">
      <div class="col-2">
        <div class="dropdown">
          <button
            class="btn btn-outline-secondary btn-sm dropdown-toggle"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Status
          </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li
              class="dropdown-item"
              :class="{ active: filters.status.value === 'Actief' }"
              @click="setStatusFilter('Actief')"
            >
              Actief
            </li>
            <li
              class="dropdown-item"
              :class="{
                active: filters.status.value === 'Handmatig afgehandeld',
              }"
              @click="setStatusFilter('Handmatig afgehandeld')"
            >
              Handmatig afgehandeld
            </li>
          </ul>
        </div>
      </div>
      <div class="col-2">
        <input
          type="date"
          v-model="filters.startdate.value"
          class="form-control mb-3"
        />
      </div>
      <div class="col-2">
        <input
          type="date"
          v-model="filters.enddate.value"
          class="form-control mb-3"
        />
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-6">
        <div v-if="isAnyFilterActive" class="d-flex flex-wrap">
          <Badge
            v-for="(filter, index) in activeFilters"
            :key="index"
            :name="filter.name"
            :value="filter.value"
            @remove-filter="removeFilter(filter.name)"
          />
        </div>
      </div>
      <form class="col-6">
        <input
          type="search"
          v-model="searchTerm"
          placeholder="Search..."
          aria-label="Search"
          class="form-control mb-3"
        />
      </form>
    </div>
    <div class="row mb-3">
      <div class="col">
        <Table
          :data="filteredTableData"
          :headers="tableHeaders"
          :is-loading="loading"
          :has-error="error"
        />
      </div>
    </div>
  </div>
</template>
