<template>
  <main>
    <section>
      <span></span>
      <img src="../assets/icon.png" alt="" />
    </section>
  </main>
</template>

<script setup></script>

<style scoped>
section {
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
}
span {
  position: absolute;
  border: 3px solid var(--text);
  padding: 30px;
  border-radius: 50%;
  overflow: hidden;
  width: 200px;
  height: 200px;
  border-top-color: var(--primary);
  animation: spin 1s linear infinite;
}
img {
  width: 120px;
  height: 120px;
  margin-top: 5px;
  user-select: none;
}
main {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
