<script setup lang="ts">
import CardPrinter from '../components/CardPrinter.vue'
import NumberSelector from '../components/NumberSelector.vue'
</script>


<template>
  <div class="input-items">
    <div>
      <div>
        Upload Deck:
      </div>
      <input type="file" @change="onDrop">
    </div>
    <div class="selectors">
      Columns: <NumberSelector :min="1" :max="10" :value="3" @change="(x) => columns = x"></NumberSelector>
      Rows per page: <NumberSelector :min="1" :max="10" :value="3" @change="(x) => rowsPerPage = x"></NumberSelector>
    </div>
    <div class="button" @click="downloadAll()">Download all</div>
  </div>
  <div id="section-to-print">
    <div class="row pagebreak">Do not print this page</div>
    <div v-for="row in rows" :class="'row ' + ((row % rowsPerPage) == 0 ? 'pagebreak' : '')" :key="row">
      <div v-for="card in columns" :key="card">
        <Card v-if="(card - 1) + (row - 1) * columns < csvRes.length"
        :title="csvRes[(card - 1) + (row - 1) * columns]['title']"
        :description="csvRes[(card - 1) + (row - 1) * columns]['description']"
        :value="csvRes[(card - 1) + (row - 1) * columns]['value']" :output="shouldDownload"></Card>
      </div>
    </div>
  </div>
</template>


<style scoped>
.button:hover {
  background-color: aliceblue;
  color: black;
}

@page {
  size: auto;
  margin-top: 15px;
}

@media print {
  .pagebreak {
    clear: both;
    page-break-after: always;
  }
}

.button {
  background-color: darkslateblue;
  border: 1px solid whitesmoke;
  margin: 5px;
  text-align: center;
  min-width: 30px;
  padding: 4px;
  height: 70%;
  user-select: none;
  /* Standard syntax */
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

.row {
  display: flex;
}

.card {
  border: black 2px solid;
  width: 2.2in;
  height: 3.43in;
  color: black;
  background-color: white;
  padding: 10px;
}

.card :hover {
  cursor: pointer;
}

.card-title {
  font-weight: bold;
}

.card-description {
  border: white 1px solid;
  font-weight: bold;
  margin-top: 3px;
  width: 190px;
  height: 75px;
}

.qr-container {
  display: flex;
  margin-top: 10px;
  justify-content: center;
  align-items: center;
}
</style>


<script lang="ts">

import { parse } from "./csv_parser";

import { defineComponent } from 'vue'

import Card from '../components/Card.vue'

export default defineComponent({
  name: 'CardPrinter',
  data() {
    return {
      csvRes: [] as any,
      columns: 3,
      rowsPerPage: 3,
      shouldDownload: false,
      fileIn: [] as any,
    }
  },
  methods: {
    onDrop(e: any) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) {
        return;
      }
      let promise = new Promise((resolve, reject) => {
        var reader = new FileReader();
        var vm = this;
        reader.onload = e => {
          resolve((vm.fileIn = parse(reader.result as string)));
        };
        reader.readAsText(files[0]);
      });

      promise.then(
        result => {
          /* handle a successful result */
          console.log("Converting", this.fileIn);
          this.csvRes = [] as any;
          for (var i = 0; i < this.fileIn.length; i++) {
            for (var j = 0; j < Number(this.fileIn[i].count); j++) {
              this.csvRes.push(this.fileIn[i])
            }
          }
          console.log("Result = ", this.csvRes)
        },
        error => {
          /* handle an error */
          console.log(error);
        }
      );
    },
    updateColumn(x: number) {
      this.columns = x;
    },
    update(e: any) {
      this.$forceUpdate();
    },
    downloadAll() {
      this.shouldDownload = true;
      var self = this;
      setTimeout(function () {
        self.shouldDownload = false;
      }, 500)
    }

  },
  created() {
  },
  mounted() {
    console.log("mount")
  },
  computed: {
    rows() {
      var ret = Math.ceil(this.csvRes.length / this.columns);
      console.log("Rows", ret)
      return ret
    }
  }
})
</script>
