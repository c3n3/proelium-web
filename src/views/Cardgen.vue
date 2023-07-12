<script setup lang="ts">
import CardQrGenerator from '../components/CardQrGenerator.vue'
</script>


<template>
  <div class="cardgen-container">
    <CardQrGenerator></CardQrGenerator>
  </div>
</template>

<style>
.cardgen-container {
  min-height: 100vh;
  display: flex;
  flex: 1;
  align-items: center;
}
</style>
