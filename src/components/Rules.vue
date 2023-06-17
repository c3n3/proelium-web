<script setup lang="ts">
</script>

<template>
<div class="top">
    <h1>Introduction</h1>
    <!-- Rule long description -->
    <p>Proelium is a board game built from a grid of lights.
        Each player will control his troops (represented by the individual lights)
        and try to eliminate the players’ troops that are not on his team. </p>
    <h2>Types of Troops:</h2>
    <p>There are three types of troops: Infantry, Calvalry, and Artillery</p>
    <ul>
        <!-- Troop List -->
        <li>
            <!-- Infantry items -->
            <h2>Infantry</h2>
            <ul>
                <li>Moves average distances</li>
                <li>Attack range = 2 spaces</li>
                <ul>
                    <li>Can gain collateral kills</li>
                    <li>The attack can and will shoot ‘through’ troops up to the range specified</li>
                </ul>
                <li>Dim lights</li>
            </ul>
        </li>
        <li>
            <!-- Calvalry items -->
            <h2>Calvalry</h2>
            <ul>
                <li>Moves long distances</li>
                <li>Attack range = 1 spaces</li>
                <li>Bright lights</li>
            </ul>
        </li>

        <li>
            <!-- Artillery items -->
            <h2>Artillery</h2>
            <ul>
                <li>Moves short distances</li>
                <li>Attack range = 4 spaces</li>
                <ul>
                    <li>Attack produces explosion in the shape of a + symbol</li>
                    <li>Kills any troops hit by explosion</li>
                    <li>Can gain collateral kills</li>
                </ul>
                <li>Pulsating lights</li>
            </ul>
        </li>
    </ul>
</div>
</template>

<style scoped>

</style>

<script lang="ts">

import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Rules',
  props: {

  },
  data() {

  },
  methods: {

  }
})
</script>
