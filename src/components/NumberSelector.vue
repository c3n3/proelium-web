<script setup lang="ts">
</script>


<template>
  <div class="number-selector">
      <label v-if="name != undefined" class="number-label">{{name}}:</label>
      <div v-if="shouldDisplay" class="number-value">{{ v }}</div>
      <div class="button" @click="update(1)">+</div>
      <div class="button" @click="update(-1)">-</div>
  </div>
</template>


<style scoped>
.button:hover {
  background-color: aliceblue;
  color: black;
}

.button {
  font-size: large;
  background-color: darkslateblue;
  border: 1px solid whitesmoke;
  margin: 5px;
  text-align: center;
  min-width: 25px;
  user-select: none; /* Standard syntax */
}


.number-label {
  margin-right: 15px;
}

.number-value {
  min-width: 25px;
  text-align: center;
}

.number-selector {
  display: flex;
}

.input-items {
    display: flex;

}

</style>


<script lang="ts">

import { defineComponent } from 'vue'

export default defineComponent({
  name: 'NumberSelector',
  props: {
    min: Number,
    display: Boolean,
    max: Number,
    name: String,
    value: Number
  },
  data() {
      return {
        shouldDisplay: this.display != undefined ? this.display : true,
        csvRes: {"__length__": 0},
        columns: 3,
        v: Number(this.value)
      }
  },
  methods: {
    update(x: number) {
      this.v = Number(this.v) + Number(x);
      if (this.v < Number(this.min)) {
        this.v = Number(this.min)
      }
      if (this.v > Number(this.max)) {
        this.v = Number(this.max)
      }
      this.$emit('change', this.v)
    },
  }
})
</script>
