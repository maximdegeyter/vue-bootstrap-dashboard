<script setup>
const pages = [
  {
    name: "Ontvangsten",
    path: "/",
  },
  {
    name: "Ontvangstregels",
    path: "/ontvangstregels",
  },
];
</script>

<template>
  <header class="sidebar px-3">
    <img
      style="width: 4rem; height: 1.75rem"
      src="https://www.sellyourapple.be/assets/images/logo.png"
      alt="SellYourApple"
    />
    <nav class="flex-grow-1">
      <ul class="nav">
        <li v-for="page in pages" class="nav-item">
          <router-link
            :to="page.path"
            class="nav-link text-muted"
            >{{ page.name }}
          </router-link>
        </li>
      </ul>
    </nav>
    <div class="sidebar__avatar">MD</div>
  </header>
</template>
