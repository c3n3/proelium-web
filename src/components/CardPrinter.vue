<script setup lang="ts">
import CardPrinter from '../components/CardPrinter.vue'
import NumberSelector from '../components/NumberSelector.vue'
</script>


<template>
    <div class="input-items">
        <input type="file" @change="onDrop">
        <NumberSelector :min="1" :max="10" :value="3" @change="(x) => columns = x"></NumberSelector>
        <div class="button" @click="downloadAll()">Download all</div>
    </div>
    <div id="section-to-print">
        <div v-for="row in rows" class="row" :key="row">
            <div v-for="card in columns" :key="card">
                <Card
                    v-if="(card - 1) + (row-1) * columns < csvRes.__length__"
                    :title="csvRes['title'][(card - 1) + (row-1) * columns]"
                    :description="csvRes['description'][(card - 1) + (row-1) * columns]"
                    :value="csvRes['value'][(card - 1) + (row-1) * columns]"
                    :output="shouldDownload"
                ></Card>
            </div>
        </div>
    </div>

</template>


<style scoped>
.button:hover {
  background-color: aliceblue;
  color: black;
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
        csvRes: {"__length__": 0} as any,
        columns: 3,
        shouldDownload: false,
      }
  },
  methods: {
    onDrop(e: any)
    {
        var files = e.target.files || e.dataTransfer.files;
        if (!files.length) {
            return;
        }
        let promise = new Promise((resolve, reject) => {
        var reader = new FileReader();
        var vm = this;
        reader.onload = e => {
          resolve((vm.csvRes = parse(reader.result as string)));
        };
        reader.readAsText(files[0]);
      });

      promise.then(
        result => {
          /* handle a successful result */
          console.log(this.csvRes);
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
    update(e: any)
    {
        this.$forceUpdate();
    },
    downloadAll()
    {
        this.shouldDownload = true;
        var self = this;
        setTimeout(function() {
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
    rows()
    {
        var ret = Math.ceil(this.csvRes.__length__ / this.columns);
        console.log("Rows", ret)
        return ret
    }
  }
})
</script>
