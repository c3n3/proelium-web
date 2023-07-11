<script setup lang="ts"></script>
<template>
    <div>
        Selector
        <div v-for="item in settings">
            {{ item }}
        </div>
    </div>
</template>

<style scoped>
</style>


<script lang="ts">

let uid = 0;

import { defineComponent } from 'vue'
import * as qrcodegen from "./qrcodegen";

import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';

import * as download from 'downloadjs'


function hash(str: string) {
  var hash = 0,
    i, chr;
  if (str.length === 0) return hash;
  for (i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}

export default defineComponent({
  name: 'selector',
  props: [
    'settings'
  ],
  data() {
      return {
          actions: 0,
          qr: document.createElement("canvas"),
          outputElem: document.getElementById("box1-qr") as HTMLElement,
          unique: 0,
          scale: 1,
      }
  },
  methods: {
    download()
    {
    }
  },
  created() {
  },
  mounted() {
  },
  watch: {
  },
  computed: {
    width() : number {
        return 1.7 * this.scale;
    },
  },
})
</script>
