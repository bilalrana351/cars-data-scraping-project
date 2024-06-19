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
          <v-autocomplete
            label="Make"
            id="make"
            :items="currentMakes"
            variant="outlined"
            color="red darken 3"
            v-model="make"
          ></v-autocomplete>
        </v-responsive>
        <v-responsive class="text">
          <v-autocomplete
            label="Model"
            id="model"
            :items="currentModels"
            variant="outlined"
            color="red darken 3"
            v-model="model"
          ></v-autocomplete>
        </v-responsive>
        <v-responsive class="text">
          <v-autocomplete
            label="Distance"
            id="distance"
            :items="currentDistances"
            variant="outlined"
            color="red darken 3"
            v-model="distance"
          ></v-autocomplete>
        </v-responsive>
        <v-responsive class="text">
          <v-text-field
            label="Zip"
            id="zip"
            variant="outlined"
            v-model="zip"
            type="number"
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
import { filters, distances } from "../filters";

const url = new URL(window.location.href);
const loading = ref(false);
const make = ref(null);
const model = ref(null);
const distance = ref(null);
const zip = ref(null);

const currentModels = ref([]);
const currentMakes = ref([]);
const currentDistances = ref([]);

const zipCodeRegex =
  /^(?:\d{5}(?:-\d{4})?|[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d|(?:[A-Za-z]{1,2}\d[A-Za-z\d]? \d[A-Za-z]{2}|GIR 0AA))$/;

function validateZipCode(zipCode) {
  return zipCodeRegex.test(zipCode);
}

const params = reactive({
  make: url.searchParams.get("make"),
  model: url.searchParams.get("model"),
  distance: url.searchParams.get("distance"),
  zip: url.searchParams.get("zip"),
});

watch(make, (value) => {
  const filter = filters.find((f) => f.make === value);
  currentModels.value = filter ? filter.models : [];
  if (!params.model) {
    model.value = "All Models";
  }
});

onMounted(() => {
  currentMakes.value = filters.map((f) => f.make);
  let temp = distances.map((d) => d + " Miles");
  currentDistances.value = ["All Distances", ...temp];

  if (params.make) {
    const lowerCaseMake = params.make.toLowerCase();
    const foundMake = currentMakes.value.find(
      (m) => m.toLowerCase() === lowerCaseMake
    );

    if (foundMake) {
      make.value = foundMake;
      currentModels.value = filters.find((f) => f.make === foundMake).models;
    } else {
      make.value = null;
    }
  } else {
    make.value = null;
  }

  if (params.distance) {
    const lowerCaseDistance = params.distance;
    const foundDistance = currentDistances.value.find((d) =>
      d.includes(lowerCaseDistance)
    );

    if (foundDistance) {
      distance.value = foundDistance;
    } else {
      distance.value = "All Distances";
    }
  } else {
    distance.value = null;
  }

  if (params.zip) {
    const zipCode = params.zip;
    if (validateZipCode(zipCode)) {
      zip.value = zipCode;
    } else {
      zip.value = null;
    }
  } else {
    zip.value = null;
  }

  if (params.model && make.value) {
    const lowerCaseModel = params.model.toLowerCase();
    const foundModel = currentModels.value.find(
      (m) => m.toLowerCase() === lowerCaseModel
    );

    if (foundModel !== undefined) {
      model.value = foundModel;
    } else {
      model.value = "All Mode2ls";
    }
  } else {
    model.value = null;
  }
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
  background-color: var(--primary-mid);
  color: white;
  height: 40px !important;
  width: 100%;
  text-transform: none;
  font-weight: 500;
  letter-spacing: 0px;
  font-size: 16px;
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
