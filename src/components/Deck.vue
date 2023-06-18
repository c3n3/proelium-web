<script setup lang="ts">
import NumberSelector from '../components/NumberSelector.vue'
</script>

<template>
    <div>
      <div>
        <div>
          <div v-if="cards.length == 0" >No items in list</div>
          <div v-if="cards.length != 0" class="button" @click="download">Download Csv</div>
          <div class="item-list">
            <div class="header">
                <h3 class="title">Title</h3>
                <h3 class="mod">Count</h3>
                <h3 class="mod"></h3>
            </div>
              <div v-for="card in cards.length" :key="card" class="card">
                <div class="title">{{ cards[card-1].title }}</div>
                <div class="mod">
                    <div class="card-count">
                        {{ cards[card-1].count }}
                    </div>
                    <NumberSelector :display="false" :min="1" :max="1000" :value="1" @change="(x) => cards[card-1].count = x"></NumberSelector>
                </div>
                <div class="button-mods">
                    <div class="button-delete" @click="deleteCard(card-1)">&nbsp;X&nbsp;</div>
                    <div class="button" @click="modify(card-1)">&nbsp;⚙&nbsp;</div>
                </div>
              </div>
          </div>
      </div>
      </div>
    </div>
</template>


<style scoped>

.card-count {
    text-align: left;
}

.header {
    display: flex;
}

.button-mods {
    display: flex;
    width: 25%;
    justify-content: right;
}


.button {
  font-size: large;
  background-color: darkslateblue;
  border: 1px solid whitesmoke;
  margin: 5px;
  text-align: center;
  min-width: 30px;
  user-select: none; /* Standard syntax */
}

.button:hover {
    background-color: aliceblue;
    color: black;
}
.button-delete {
  font-size: large;
  background-color: red;
  color: black;
  border: 1px solid black;
  margin: 5px;
  text-align: center;
  min-width: 30px;
  user-select: none; /* Standard syntax */
}

.button-delete:hover {
  background-color: aliceblue;
  color: black;
}
.mod {
    display: flex;
    width: 25%;
    min-width: 100px;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-align: left;
}

.title {
    width: 50%;
    padding-right: 5px;
}

.card {
    border-top: whitesmoke 1px solid;
  display: flex;
  flex-grow: 1;
  width: 100%;
}

.card-list {
    display: flex;
    flex-grow: 1;
}

</style>

<script lang="ts">

import { parse, toString } from "./csv_parser";

import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Deck',
  props: {
    cards: [] as any
  },
  data() {
      return {
        cardlist: this.cards,
        title: "",
        description: "",
        result: "",
      }
  },
  methods: {
    downloadTxt(filename: string, text: string) {
      var element = document.createElement('a');
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
      element.setAttribute('download', filename);

      element.style.display = 'none';
      document.body.appendChild(element);

      element.click();

      document.body.removeChild(element);
    },
    download() {
       this.downloadTxt("cards.csv", this.generateCsv())
    },
    generateCsv()
    {
      return toString(this.cardlist);
    },
    deleteCard(index: number)
    {
      this.cards.splice(index, 1);
      this.$emit("remove", index);
    },
    modify(index: number)
    {
      this.$emit("modify", index);
    }
    // addCard(title: string, description: string, value: string)
    // {
    //   var add = {"title": title, "description": description, "value": value, 'count': 1};
    //   console.log(add);
    //   this.cards.push(add)
    // },
  }
})
</script>

