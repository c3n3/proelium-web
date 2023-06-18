<script setup lang="ts">
import Deck from '../components/Deck.vue'
</script>

<template>
  <div class="top">
    
    <div class="map-and-list">
      <div class="map">
        <div class="selector">
          <div class="selector-div">
            <div class="selector-label">Selector:</div>
          </div>
          <div style="min-width: 50px;" class="qr-item" @click="changeSelectorUnit()"> {{ unitArray[currentUnit] }}</div>
          <div :style="'min-width: 50px;' + getColor(byteToName[getCurrentUnit()])" class="qr-item" @click="changePlayer()"> {{
            playerArray[currentPlayer] }}</div>
          <div style="min-width: 100px;" class="clear" @click="clear()">Clear</div>
        </div>
        <h1>{{ title == "" ? "[Give the map a title]" : title }}</h1>
        <div class="qr-grid">
          <div v-for="i in length" :key="i" class="qr-row">
            <div v-for="j in length" :key="j + redraw" class="qr-item" @click="change(i - 1, j - 1)" :style="getColor(byteToName[getItem(i - 1, j - 1)])
              + item_style">
              {{ byteToName[getItem(i - 1, j - 1)] }}
            </div>
          </div>
        </div>
      </div>
      <div class="list">
        <div class="info">
          <h1 v-if="modifyMap == -1">Add map</h1>
          <h1 v-if="modifyMap != -1">Modify map</h1>
          
          <div>
            <div>Title:</div>
            <textarea v-model="title"></textarea><br>
          </div>
          <div>
            <div>Description:</div>
            <textarea v-model="description"></textarea>
          </div>
          <div class="button" @click="addCard()">Done</div>
        </div>
        <div class="deck">
          <h1>Map deck</h1>
          <Deck :cards="cards" @modify="modify" @remove="deleteCard"></Deck>
          <h3 class="upload-title">Upload map a deck</h3>
          <input type="file" @change="onDrop">
        </div>
      </div>
    </div>
    <div id="output">
    </div>
  </div>
</template>

<style scoped>
.upload-title {
  margin-top: 15px;
  border-top: 10px solid whitesmoke;
  padding-top: 10px;
}

.info {
  margin: 25px;
  border-bottom: solid whitesmoke 10px;
  padding: 15px;
}

.list {
  display: flex;
  flex-direction: column;
  width: 25%;

}
.deck {
  margin-left: 25px;
}

.map-and-list {
  display: flex;
  flex-direction: row;
}

.selector {
  display: flex;
  margin-bottom: 25px;
  font-size: 35px;
}

.button {
  background-color: rgb(57, 241, 57);
  border: 1px solid whitesmoke;
  color: black;
  font-size: x-large;
  margin: 5px;
  text-align: center;
  min-width: 30px;
  user-select: none; /* Standard syntax */
}

.button:hover {
  background-color: aliceblue;
  color: black;
}

.selector-label {
  text-align: center;
  vertical-align: middle;
  flex-grow: 0;
}

.selector-div {
  display: flex;
  align-items: center;
  margin-right: 35px;
}

.top {
  display: flex;
  flex-grow: 1;
  align-items: center;
  flex-direction: column;
}

.qr-grid {
  display: flex;
  justify-content: center;
  /* width: 50%;
  height: 50%; */
  padding: 15px;
  border-left: blue solid 5px;
  border-top: purple solid 5px;
  border-right: red solid 5px;
  border-bottom: green solid 5px;
  margin-bottom: 50px;
  margin-top: 50px;
}

.qr-row {
  display: flex;
  flex-direction: column;
}

.qr-item {
  font-family: "Times New Roman", Times, serif;
  /* min-width: 35px; */
  /* min-height: 35px; */
  text-align: center;
  margin: 5px;
  border: 1px solid white;
  user-select: none;
  /* Standard syntax */
}

.clear {
  font-family: "Times New Roman", Times, serif;
  /* min-width: 35px; */
  /* min-height: 35px; */
  text-align: center;
  margin: 5px;
  border: 1px solid white;
  user-select: none;
  /* Standard syntax */
}

.clear:hover {
  background-color: whitesmoke;
  color: black;
}
</style>
<script lang="ts">

import { defineComponent } from 'vue'
import * as qrcodegen from "./qrcodegen";

import { parse } from "./csv_parser";


import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';

export default defineComponent({
  props: ['propdata'],
  name: 'QrCreator',
  data() {
    return {
      devices: this.propdata,
      qrId: "0123", 
      length: 16,
      count: Array<Array<qrcodegen.byte>>(),
      currentUnit: 0,
      currentPlayer: 0,
      outputElem: document.getElementById("output") as HTMLElement,
      redraw: 0,
      modifyMap: -1,
      title: "",
      description: "",
      nameToByte: {} as any,
      byteToName: {} as any,
      fileIn: [] as any,
      cards: [] as any,
      qr: document.createElement("canvas"),
      unitArray: ["I", "C", "A", "W", ""],
      playerArray: ["1", "2", "3", "4"],
      item_style: this.getWidthStyle((window.innerHeight < window.innerWidth ? window.innerHeight : window.innerWidth) * 0.022),
    }
  },
  methods: {
    appendCanvas(caption: string): HTMLCanvasElement {
      if (this.qr) {
        this.qr.remove()
      }
      this.qr = document.createElement("canvas");
      this.outputElem.appendChild(this.qr);
      return this.qr;
    },
    getPlayer(item: string): number {
      if (item[1] == "1") {
        return 0;
      }
      if (item[1] == "2") {
        return 1;
      }
      if (item[1] == "3") {
        return 2;
      }
      if (item[1] == "4") {
        return 3;
      }
      return 0
    },
    getByte(item: string): qrcodegen.byte {
      var ret: qrcodegen.byte = 32;
      if (item == "") {
        return ret;
        // return " ";
      }
      if (item[0] == "W") {
        ret += 1;
        // return "W";
      }
      if (item[0] == "A") {
        // + [2, 6)  is for artillery
        // return "A";
        ret += 2;
        ret += this.getPlayer(item)
      }
      if (item[0] == "C") {
        // + [6, 10)  is for artillery
        // return "C";
        ret += 6;
        ret += this.getPlayer(item)
      }
      if (item[0] == "I") {
        // + [10, 14)  is for artillery
        // return "I";
        ret += 10;
        ret += this.getPlayer(item)
      }
      return ret;
    },
    getByteArray(): string {
      // var ret = new Array<qrcodegen.byte>(this.length* this.length);
      var ret = "";
      ret += this.qrId;
      for (var x = 0; x < this.length; x++) {
        for (var y = 0; y < this.length; y++) {
          // ret[x + y*this.length + 8] = this.getByte(this.getItem(x, y));
          ret += String.fromCharCode(this.getItem(x, y));
        }
      }
      var print = "";
      for (var x = 0; x < this.length; x++) {
        print += "\n";
        for (var y = 0; y < this.length; y++) {
          // ret[x + y*this.length + 8] = this.getByte(this.getItem(x, y));
          print += ret[x + y * this.length]
        }
      }

      // var reverse = "";
      // for (let char of ret) {
      //   reverse = char + reverse;
      // }
      // ret = reverse;
      console.log(print)

      return ret;
    },
    generateQr() {
      const errCorLvl: qrcodegen.QrCode.Ecc = qrcodegen.QrCode.Ecc.LOW;  // Error correction level
      const qr: qrcodegen.QrCode = qrcodegen.QrCode.encodeText(this.getByteArray(), errCorLvl);  // Make the QR Code symbol
      qrcodegen.drawCanvas(qr, 10, 4, "#FFFFFF", "#000000", this.appendCanvas("hello-world-QR"));  // Draw it on screen
    },
    getItem(x: number, y: number): qrcodegen.byte {
      if (this.count.length > 0) {
        return this.count[x][y];
      }
      return 0
    },
    clear() {
      for (var i = 0; i < this.length; i++) {
        for (var j = 0; j < this.length; j++) {
          this.count[i][j] = this.nameToByte[""]
        }
      }
      this.title = ""
      this.description = ""
      this.generateQr()
    },
    change(x: number, y: number) {
      var unit = this.getCurrentUnit();
      if (unit == this.count[x][y]) {
        this.count[x][y] = this.nameToByte[""];
      } else {
        this.count[x][y] = unit;
      }
      console.log("hit", x, y)
      for (var i = 0; i < this.length; i++) {
        console.log("Out", this.count[x][y])
      }
      this.generateQr()
    },
    getCurrentUnit() {
      if (this.unitArray[this.currentUnit] == "W") {
        return this.nameToByte["W"];
      }
      else if (this.unitArray[this.currentUnit] == "") {
        return this.nameToByte[""];
      }
      return this.nameToByte[this.unitArray[this.currentUnit] + this.playerArray[this.currentPlayer]];
    },
    changeSelectorUnit() {
      this.currentUnit = (this.currentUnit + 1) % this.unitArray.length;
    },
    changePlayer() {
      this.currentPlayer = (this.currentPlayer + 1) % this.playerArray.length;
    },
    getWidthStyle(size: number): string {
      // console.log(size);
      console.log(window.innerWidth);
      var ret = "min-width: " + size + "px;"
        + "min-height: " + size + "px;"
        + "margin: " + (size / 10) + "px;"
        + "font-size: " + (size * 2 / 4) + "px;";
      return ret;
    },
    updateRelativeSize(e: Event | null) {
      this.redraw += 1
      var size = Math.floor(
        (window.innerHeight < window.innerWidth ? window.innerHeight : window.innerWidth) * 0.65 * (1 / this.length)
      )
      if (size < 20) {
        size = 20
      }
      this.item_style = this.getWidthStyle(size)
    },
    onDrop(e: any) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) {
        return;
      }
      let promise = new Promise((resolve, reject) => {
        var reader = new FileReader();
        var vm = this;
        reader.onload = e => {
          resolve((vm.cards = parse(reader.result as string)));
        };
        reader.readAsText(files[0]);
      });
    },
    modify(index: number)
    {
      console.log("Modify", index)
      this.modifyMap = index
      this.title = this.cards[index].title
      this.description = this.cards[index].description
      for (var x = 0; x < this.length; x++) {
        this.count[x] = new Array<qrcodegen.byte>();
        for (var y = 0; y < this.length; y++) {
          this.count[x].push(this.cards[index].value.charCodeAt(x * this.length + y + this.qrId.length))
        }
      }
      this.generateQr()
    },
    addCard() {
      if (this.modifyMap != -1) {
        this.cards[this.modifyMap].title = this.title
        this.cards[this.modifyMap].description = this.description
        this.cards[this.modifyMap].value = this.getByteArray()
        this.modifyMap = -1
      } else {
        var add = {"title": this.title, "description": this.description, "value": this.getByteArray(), 'count': 1};
        this.cards.push(add)
      }
      this.clear()
    },
    getColor(item: string): string {
      var ret = '';
      var color: Array<number>;
      if (!item) {
        color = [0, 0, 0]
      }
      else if (item == "W") {
        color = [255, 255, 255]
      }
      else if (item == "") {
        color = [0, 0, 0];
      }
      else if (item.length < 2) {
        color = [0, 0, 0];
      }
      else if (item[1] == "1") {
        color = [0, 0, 255];
      }
      else if (item[1] == "2") {
        color = [255, 0, 0];
      }
      else if (item[1] == "3") {
        color = [0, 255, 0];
      } else {
        color = [255, 0, 255];
      }
      ret += 'color: ' + "rgba(" + (255 - color[0]) + "," + (255 - color[1]) + "," + (255 - color[2]) + ");"
      ret += 'background-color: ' + "rgba(" + color[0] + "," + color[1] + "," + color[2] + ");";
      return ret;
    },
    deleteCard(index: number)
    {
      console.log("Remove modify", index)
      if (index == this.modifyMap) {
        this.clear()
        this.modifyMap = -1
      }
    },
  },
  mounted() {
    window.addEventListener("resize", this.updateRelativeSize);
    console.log("Wat is up\n");
    console.log(qrcodegen);
    this.outputElem = document.getElementById("output") as HTMLElement
    this.updateRelativeSize(null)
    
    for (var i = 0; i < this.playerArray.length; i++) {
      for (var x = 0; x < this.unitArray.length; x++) {
        if (this.unitArray[x] == "") {
          this.byteToName[this.getByte("")] = ""
          this.nameToByte[""] = this.getByte("")
        } else if (this.unitArray[x] == "W") {
          this.byteToName[this.getByte("W")] = "W"
          this.nameToByte["W"] = this.getByte("W")
        } else {
          var name = this.unitArray[x] + this.playerArray[i];
          this.byteToName[this.getByte(name)] = name;
          this.nameToByte[name] = this.getByte(name)
        }
      }
    }

    for (var x = 0; x < this.length; x++) {
      this.count[x] = new Array<qrcodegen.byte>();
      for (var y = 0; y < this.length; y++) {
        this.count[x].push(this.nameToByte[""])
      }
    }
    this.generateQr()
  }
})
</script>
