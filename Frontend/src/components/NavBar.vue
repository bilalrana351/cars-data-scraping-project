<template>
  <v-app-bar class="container" :elevation="2">
    <div class="box">
      <div class="holder">
        <div class="data">Cars Scraping Project</div>
        <v-spacer></v-spacer>
        <div class="data data2">Page {{ props.page }}</div>
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn icon="mdi-dots-vertical" v-bind="props"></v-btn>
          </template>
          <v-list class="list">
            <v-btn
              :prepend-icon="item.icon"
              @click="item.onClick"
              v-for="(item, i) in items"
              :key="i"
              class="button"
              variant="text"
              >{{ item.title }}
            </v-btn>
          </v-list>
        </v-menu>
      </div>
    </div>
  </v-app-bar>
</template>

<script setup>
import { defineEmits, defineProps, onMounted, watch } from "vue";
import router from "../router";

const props = defineProps({
  page: Number,
});

const items = [
  {
    title: "Reload Page",
    onClick: () => {
      router.go(0);
    },
    icon: "mdi-restart",
  },
];
</script>

<style scoped>
.container {
  background-color: var(--primary-dark) !important;
  color: white !important;
  box-shadow: none !important;
  border: none !important;
}

.box {
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 0 20px;
}

.list {
  display: flex;
  flex-direction: column;
}

.button {
  height: 50px !important;
  border-radius: 0%;
  text-transform: none;
  font-weight: 400;
  font-size: 18px;
  letter-spacing: 0px;
  justify-content: start;
  width: 220px !important;
  gap: 10px;
}

.data {
  margin-right: 30px;
  font-size: 1.2rem;
  text-overflow: ellipsis;
}

.holder {
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 1200px;
}

@media screen and (max-width: 600px) {
  .shifticon {
    display: none;
  }

  .data2 {
    display: none;
  }
}
</style>
