<template>
  <main>
    <Navbar :page="page" />
    <div class="content">
      <div v-if="!loading" class="title-nav">
        <div class="title">Search Filter</div>
        <v-btn class="button" @click="fetchCars">Search Cars</v-btn>
      </div>
      <v-card v-if="!loading" class="card">
        <div class="card-heading">Filter</div>
        <div class="grid-filter">
          <v-responsive class="text" id="make">
            <v-autocomplete
              label="Make"
              :items="currentMakes"
              variant="outlined"
              color="red darken 3"
              v-model="make"
            ></v-autocomplete>
          </v-responsive>
          <v-responsive class="text" id="model">
            <v-autocomplete
              label="Model"
              :items="currentModels"
              variant="outlined"
              color="red darken 3"
              v-model="model"
            ></v-autocomplete>
          </v-responsive>
          <v-responsive class="text" id="distance">
            <v-autocomplete
              label="Distance"
              :items="currentDistances"
              variant="outlined"
              color="red darken 3"
              v-model="distance"
            ></v-autocomplete>
          </v-responsive>
          <v-responsive class="text" id="trim">
            <v-text-field
              label="trim"
              variant="outlined"
              v-model="trim"
              color="red darken 3"
            ></v-text-field>
          </v-responsive>
          <v-responsive class="text" id="zip">
            <v-text-field
              label="Zip"
              variant="outlined"
              v-model="zip"
              type="number"
              color="red darken 3"
            ></v-text-field>
          </v-responsive>
        </div>
      </v-card>
      <div v-if="!loading" class="single-nav">
        <div class="title">Filtered Cars</div>
        <div class="button-panel">
          <v-btn class="button" @click="prev">Previous Page</v-btn>
          <v-btn class="button" @click="next">Next Page</v-btn>
        </div>
      </div>
      <div v-show="loading" class="loading">
        <Loader />
      </div>
      <br />
      <v-card class="card2" v-for="(item, index) in carsData" :key="index">
        <div class="divider">
          <div class="text2">
            <h3>{{ item["description"] }}</h3>
            <div>
              <span>Mileage: </span>
              {{ item["mileage"] }}
              miles
            </div>
            <div>
              <span>Price: </span>
              {{ item["price"] }}
              USD
            </div>
            <div>
              <a :href="item['mainUrl']" target="_blank">View Original URL</a>
            </div>
          </div>
          <img :src="item['imageUrl']" alt="car" />
        </div>
      </v-card>
      <br v-if="!loading" />
      <br v-if="!loading" />
      <br v-if="!loading" />
      <br v-if="!loading" />
    </div>
  </main>
</template>

<script setup>
import Navbar from "../components/NavBar.vue";
import { defineProps, watch, onMounted, reactive, ref } from "vue";
import { filters, distances } from "../filters";
import router from "../router";

const url = new URL(window.location.href);
const loading = ref(true);
const make = ref(null);
const model = ref(null);
const distance = ref(null);
const zip = ref(null);
const trim = ref(null);
const page = ref(null);
const carsData = ref([]);

const currentModels = ref([]);
const currentMakes = ref([]);
const currentDistances = ref([]);
const count = ref(0);

const prev = () => {
  if (page.value == "1") {
    return;
  }
  page.value = (Number(page.value) - 1).toString();
  fetchCars();
};

const next = () => {
  page.value = (Number(page.value) + 1).toString();
  fetchCars();
};

const zipCodeRegex =
  /^(?:\d{5}(?:-\d{4})?|[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d|(?:[A-Za-z]{1,2}\d[A-Za-z\d]? \d[A-Za-z]{2}|GIR 0AA))$/;

function validateZipCode(zipCode) {
  return zipCodeRegex.test(zipCode);
}

const params = reactive({
  make: url.searchParams.get("make"),
  model: url.searchParams.get("model"),
  distance: url.searchParams.get("distance"),
  trim: url.searchParams.get("trim"),
  zip: url.searchParams.get("zip"),
  page: url.searchParams.get("page"),
});

watch(make, (value) => {
  const filter = filters.find((f) => f.make === value);
  currentModels.value = filter ? filter.models : [];
  if (!params.model || !currentModels.value.includes(params.model)) {
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

  if (params.trim) {
    trim.value = params.trim;
  } else {
    trim.value = null;
  }

  if (params.page) {
    page.value = params.page;
  } else {
    page.value = 1;
  }

  scrapeCars();
});

const checkResult = (data) => {
  count.value += 1;
  if (data.length > 0) {
    loading.value = false;
  }
  data = data.filter((e) => {
    if (e != undefined) {
      return e;
    }
  });
  carsData.value = carsData.value.concat(data);
  console.log(carsData.value);
};

const getWebData = async (site) => {
  console.log("REQUESTING: " + site);
  try {
    const response = await fetch(
      "http://localhost:5000/api/cars?website=" + site,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          make: make.value,
          model: model.value,
          distance: distance.value,
          zip: zip.value,
          trim: trim.value,
          page: Number(page.value),
        }),
      }
    );
    const data = await response.json();
    console.log(data);
    console.log("DATA RECIEVED: " + site);
    checkResult(data.data);
  } catch {
    console.log("DATA ERROR: " + site);
    checkResult([]);
  }
};

const scrapeCars = () => {
  loading.value = true;

  if (!page.value) {
    page.value = 1;
  }

  if (!make.value) {
    loading.value = false;
    return;
  }

  getWebData("autotrader");
  getWebData("carbravo");
  getWebData("carfax");
  getWebData("carguru");
  getWebData("carmax");
  getWebData("cars");
  getWebData("edmund");
  getWebData("truecar");
};

const fetchCars = () => {
  const newUrl = new URL(window.location.href);
  if (make.value) {
    newUrl.searchParams.set("make", make.value);
  } else {
    newUrl.searchParams.delete("make");
  }
  if (model.value) {
    newUrl.searchParams.set("model", model.value);
  } else {
    newUrl.searchParams.delete("model");
  }
  if (distance.value) {
    newUrl.searchParams.set("distance", distance.value);
  } else {
    newUrl.searchParams.delete("distance");
  }
  if (trim.value) {
    newUrl.searchParams.set("trim", trim.value);
  } else {
    newUrl.searchParams.delete("trim");
  }
  if (zip.value) {
    newUrl.searchParams.set("zip", zip.value);
  } else {
    newUrl.searchParams.delete("zip");
  }
  if (page.value) {
    newUrl.searchParams.set("page", page.value);
  } else {
    newUrl.searchParams.delete("page");
  }

  window.history.pushState({}, "", newUrl);
  window.location.reload();
};
</script>

<style scoped>
main {
  background-color: #f5f5f5;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.content {
  background-color: #f5f5f5;
  padding: 20px;
  overflow-y: auto;
  width: 100%;
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
  margin: auto;
}

.card {
  margin: 0 auto 0 auto;
  padding: 20px;
  background-color: white;
  box-shadow: none !important;
  border: 1px solid #ababab;
  width: 100%;
  max-width: 1200px;
}

.card2 {
  margin: 0 auto 40px auto;
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
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1200px;
}

.single-nav {
  margin: auto;
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
  grid-template-areas: "make model distance trim zip";
  grid-template-columns: repeat(5, 1fr);
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

#trim {
  grid-area: trim;
}

@media (max-width: 1000px) {
  .grid-filter {
    grid-template-areas:
      "make model model"
      "distance trim zip";
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 600px) {
  .grid-filter {
    grid-template-areas:
      "make"
      "model"
      "distance"
      "trim"
      "zip";
    grid-template-columns: 1fr;
  }
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90%;
  width: 100%;
}

.card2 img {
  height: 300px;
  min-width: 400px;
  max-width: 400px;
  object-fit: cover;
  border: 1px solid #333;
}

.card2 h3 {
  margin-bottom: 20px;
}

.card2 .divider {
  display: flex;
  gap: 20px;
  justify-content: space-between;
}

.card2 text {
  display: flex;
  flex-direction: column;
}

.text2 {
  font-size: 20px;
}

.text2 div {
  margin: 20px 0;
}

.text2 span {
  font-weight: bold;
}

.button-panel {
  display: flex;
  gap: 20px;
}
</style>
