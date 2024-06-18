<template>
  <main>
    <Navbar />
    <Loader />
  </main>
</template>

<script setup>
import Navbar from "../components/NavBar.vue";
import { defineProps, watch, onMounted, reactive } from "vue";

const url = new URL(window.location.href);

const params = reactive({
  make: url.searchParams.get("make"),
  model: url.searchParams.get("model"),
  distance: url.searchParams.get("distance"),
  zip: url.searchParams.get("zip"),
});
</script>

<style>
main {
  background-color: #f0f0f0;
  height: 100vh;
}
</style>
