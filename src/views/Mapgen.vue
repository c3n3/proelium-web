<script setup lang="ts">
import QrCreator from '../components/QrCreator.vue'
</script>


<template>
  <div class="container">
    <QrCreator></QrCreator>
  </div>
</template>

<style>
.container {
  min-height: 100vh;
  display: flex;
  flex: 1;
  flex-direction: column;
}

</style>
