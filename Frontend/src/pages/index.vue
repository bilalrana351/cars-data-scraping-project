<template>
  <main>
    <Navbar />
    <Loader v-if="loading" />

    <div class="title-nav">
      <div class="title">Search Filter</div>
      <v-btn class="button">Search Cars</v-btn>
    </div>
    <v-card class="card">
      <div class="card-heading">Filter</div>
      <div class="grid-filter">
        <v-responsive class="text">
          <v-select
            label="Make"
            id="make"
            :items="['All', 'Mess', 'Cleaner', 'CareTaker']"
            variant="outlined"
            color="red darken 3"
            v-model="make"
          ></v-select>
        </v-responsive>
        <v-responsive class="text">
          <v-select
            label="Model"
            id="model"
            :items="['All', 'Mess', 'Cleaner', 'CareTaker']"
            variant="outlined"
            color="red darken 3"
            v-model="model"
          ></v-select>
        </v-responsive>
        <v-responsive class="text">
          <v-select
            label="Distance"
            id="distance"
            :items="['All', 'Mess', 'Cleaner', 'CareTaker']"
            variant="outlined"
            color="red darken 3"
            v-model="distance"
          ></v-select>
        </v-responsive>
        <v-responsive class="text">
          <v-text-field
            label="Zip"
            id="zip"
            :items="['All', 'Mess', 'Cleaner', 'CareTaker']"
            variant="outlined"
            v-model="zip"
            color="red darken 3"
          ></v-text-field>
        </v-responsive>
      </div>
    </v-card>
    <div class="single-nav">
      <div class="title">Filtered Cars</div>
    </div>
    <div v-if="!loading" style="width: 100%">
      <br />
    </div>
  </main>
</template>

<script setup>
import Navbar from "../components/NavBar.vue";
import { defineProps, watch, onMounted, reactive, ref } from "vue";

const url = new URL(window.location.href);
const loading = ref(false);
const make = ref(null);
const model = ref(null);
const distance = ref(null);
const zip = ref(null);

const params = reactive({
  make: url.searchParams.get("make"),
  model: url.searchParams.get("model"),
  distance: url.searchParams.get("distance"),
  zip: url.searchParams.get("zip"),
});
</script>

<style scoped>
main {
  background-color: #f5f5f5;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.title {
  font-size: 26px;
  padding: 20px 0;
  font-weight: 600;
}

.card-heading {
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 10px;
}

.card {
  margin: 0 20px;
  padding: 20px;
  background-color: white;
  box-shadow: none !important;
  border: 1px solid #ababab;
  width: 100%;
  max-width: 1200px;
}

.text {
  padding-top: 13px;
  height: 70px;
}

.text2 {
  padding-top: 10px;
  height: 70px;
}

.divider {
  display: flex;
  gap: 20px;
}

.title-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1200px;
}

.single-nav {
  display: flex;
  justify-content: left;
  align-items: center;
  width: 100%;
  max-width: 1200px;
}

.button {
  background-color: var(--primary);
  color: white;
  height: 40px !important;
  width: 100%;
  max-width: 160px;
}

.grid-filter {
  display: grid;
  gap: 8px 20px;
  grid-template-areas: "make model distance zip";
  grid-template-columns: repeat(4, 1fr);
}

#make {
  grid-area: make;
  flex-grow: 1;
}

#model {
  grid-area: model;
}

#distance {
  grid-area: distance;
}

#zip {
  grid-area: zip;
}

@media (max-width: 1000px) {
  .grid-filter {
    grid-template-areas:
      "make model"
      "distance zip";
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .grid-filter {
    grid-template-areas:
      "make"
      "model"
      "distance"
      "zip";
    grid-template-columns: 1fr;
  }
}
</style>
