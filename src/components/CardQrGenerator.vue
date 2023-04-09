<script setup lang="ts"></script>
<template>
  <div class="root">
    <div style="text-align: left; width: 100%; margin-top: 25px;">
      <h1>Create a card:</h1>
      {{ result() }}
    </div>
    <div class="top">
      <h1>Valid Controller Settings</h1>
      <div class="controller-container">
        <div class="controller">

          <div class="controller-type">
            <h2>Directions</h2>
            <div class="directions">
              <div class="row">
                <div class="empty-item"></div>
                <div class="dir-item" @click="changeDirections(1)" :style="dirStyle(1)">&larr;</div>
                <div class="empty-item"></div>
              </div>
              <div class="row">
                <div class="dir-item" @click="changeDirections(0)" :style="dirStyle(0)">&uarr;</div>
                <div class="empty-item"></div>
                <div class="dir-item" @click="changeDirections(3)" :style="dirStyle(3)">&darr;</div>
              </div>
              <div class="row">
                <div class="empty-item"></div>
                <div class="dir-item" @click="changeDirections(2)" :style="dirStyle(2)">&rarr;</div>
                <div class="empty-item"></div>
              </div>
            </div>
          </div>
          <div class="controller-type">
            <h2>Turns</h2>
            <div class="turns">
              <div class="dir-item" 
                   v-for="turn in 5"
                   :key="turn"
                   :style="turnStyle(turn-1)"
                   @click="changeTurns(turn-1)">
                   {{ turn - 1 }}
              </div>
            </div>
          </div>
          <div class="controller-type" style="border-right: 0px;">
            <h2>Units</h2>
            <div class="turns">
              <div class="dir-item" @click="changeUnits(0)" :style="unitStyle(0)">I</div>
              <div class="dir-item" @click="changeUnits(1)" :style="unitStyle(1)">C</div>
              <div class="dir-item" @click="changeUnits(2)" :style="unitStyle(2)">A</div>
            </div>
          </div>
        </div>
        <div class="selector-container">
          <div class="controller-selector">
            <label class="number-label">Direction Count:</label>
            <div class="number-value">{{ directionsCount }}</div>
            <div class="button" @click="changeDirCount(1)">+</div>
            <div class="button" @click="changeDirCount(-1)">-</div>
          </div>
          <div class="controller-selector">
            <label class="number-label">Turn Count:</label>
            <div class="number-value">{{ turnsCount }}</div>
            <div class="button" @click="changeTurnsCount(1)">+</div>
            <div class="button" @click="changeTurnsCount(-1)">-</div>
          </div>
          <div class="controller-selector">
            <label class="number-label">Unit Count:</label>
            <div class="number-value">{{ unitsCount }}</div>
            <div class="button" @click="changeUnitCount(1)">+</div>
            <div class="button" @click="changeUnitCount(-1)">-</div>
          </div>
        </div>
      </div>
      <h1>Actions</h1>
      <div class="actions">
        <div class="top-action">
          <div class="action" v-for="action in actions.length">
            <h2>Action {{ action }}</h2>
            Type
            <select>
              <option @click="(actions[action-1][0] = 'MOVE') && generateQr()">Move</option>
              <option @click="(actions[action-1][0] = 'ATCK') && generateQr()">Attack</option>
            </select>
            <div class="number-selector">
              <label class="number-label">Infantry Value:</label>
              <div class="number-value">{{ actions[action-1][1] }}</div>
              <div class="button" @click="updateAction(action-1, 1, 1)">+</div>
              <div class="button" @click="updateAction(action-1, 1, -1)">-</div>
            </div>
            <div class="number-selector">
              <label class="number-label">Cavalry Value:</label>
              <div class="number-value">{{ actions[action-1][2] }}</div>
              <div class="button" @click="updateAction(action-1, 2, 1)">+</div>
              <div class="button" @click="updateAction(action-1, 2, -1)">-</div>
            </div>
            <div class="number-selector">
              <label class="number-label">Artillery Value:</label>
              <div class="number-value">{{ actions[action-1][3] }}</div>
              <div class="button" @click="updateAction(action-1, 3, 1)">+</div>
              <div class="button" @click="updateAction(action-1, 3, -1)">-</div>
            </div>
          </div>
          <div class="enable-container">
                <div class="enable" v-if="actions.length < 3" @click="addAction()">Add Action</div>
                <div class="disable" v-if="actions.length > 1" @click="removeAction()">Remove Action</div>
              </div>
          <div>
        </div>
    </div>
    </div>
      <div id="output"></div>
    </div>
  </div>
</template>

<style scoped>

.root {
  display: flex;
  flex-grow: 1;
  align-items: center;
  flex-direction: column;
}

.controller-type {
  text-align: center;
  padding: 25px;
  width: 33.3%;
  border-right: solid 1px whitesmoke;
}

.number-label {
  margin-right: 15px;
  min-width: 125px;
}

.number-value {
  min-width: 25px;
  text-align: center;
}

.selector-container {
  display: flex;
}

.button {
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

.controller-selector {
  display: flex;
  margin: 15px;
  padding: 5px;
  border: 1px solid whitesmoke;
}

.number-selector {
  display: flex;
}

.top {
  display: flex;
  flex-grow: 1;
  align-items: center;
  flex-direction: column;
}

.action {
  display: flex;
  flex-direction: column;
  margin: 25px;
}

.top-action {
  display: flex;
}

.actions {
  display: flex;
}

.enable-container {
  align-items: center;
}

.enable {
  border: 1px solid whitesmoke;
  padding: 5px;
  user-select: none; /* Standard syntax */
  margin: 15px;
}

.disable {
  margin: 15px;
  border: 1px solid whitesmoke;
  padding: 5px;
  user-select: none; /* Standard syntax */
}

.enable:hover {
  background-color: green;
  color: black;
}

.disable:hover {
  background-color: red;
  color: black;
}

.dir-item {
  border: 1px solid seashell;
  text-align: center;
  font-size: 25px;
  min-width: 50px;
  min-height: 50px;
  user-select: none; /* Standard syntax */
}

.empty-item {
  min-width: 50px;
  min-height: 50px;
}

.controller {
  display: flex;
  margin-bottom: 100px;
  padding-top: 50px;
}

.row {
  display: flex;
  flex-direction: column;
}

.turns {
  display: flex;
  justify-content: center;
}

.directions {
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
}

.controller-container {
  border-bottom: 1px solid darkslateblue;
}

</style>
<script lang="ts">

import { defineComponent } from 'vue'
import * as qrcodegen from "./qrcodegen";

export default defineComponent({
  name: 'CardQrGenerator',
  data() {
      return {
          outputElem: document.getElementById("output") as HTMLElement,
          qr: document.createElement("canvas"),
          directions: ["1", "1", "1", "1"],
          directionsCount: 1,
          turnsCount: 1,
          unitsCount: 1,
          turns: ["1", "1", "1", "1", "1", "1"],
          units: ["1", "1", "1"],
          actions: [
            [
              "MOVE", 0, 0, 0
          ]]
      }
  },
  methods: {
    appendCanvas(caption: string): HTMLCanvasElement
    {
      if (this.qr) {
        this.qr.remove()
      }
      this.qr = document.createElement("canvas");
      this.qr.setAttribute("draggable", "true")
      this.outputElem.appendChild(this.qr);
      return this.qr;
    },
    addAction()
    {
      this.actions.push(["MOVE", 0, 0, 0])
      this.generateQr()
    },
    removeAction()
    {
      this.actions.pop()
      this.generateQr()
    },
    dirStyle(i: number): string
    {
      return this.directions[i] == '1' ? 'background: darkslateblue; color: black;' : 'color: red;'
    },
    turnStyle(i: number): string
    {
      return this.turns[i] == '1' ? 'background: darkslateblue; color: black;' : 'color: red;'
    },
    unitStyle(i: number): string
    {
      return this.units[i] == '1' ? 'background: darkslateblue; color: black;' : 'color: red;'
    },

    generateQr() {
      console.log("This was changed", this.actions[0][0])
      const errCorLvl: qrcodegen.QrCode.Ecc = qrcodegen.QrCode.Ecc.LOW;  // Error correction level
      const qr: qrcodegen.QrCode = qrcodegen.QrCode.encodeText(this.result(), errCorLvl);  // Make the QR Code symbol
      qrcodegen.drawCanvas(qr, 10, 4, "#FFFFFF", "#000000", this.appendCanvas("hello-world-QR"));  // Draw it on screen
      // this.update = !this.update;
    },
    limit(val: number, min: number, max: number): number {
      return val < min ? min : val > max ? max : val;
    },
    changeDirCount(increment: number) {
      this.directionsCount += increment;
      this.directionsCount = this.limit(this.directionsCount, 1, 4)
      this.generateQr();
    },
    changeUnitCount(increment: number) {
      this.unitsCount += increment;
      this.unitsCount = this.limit(this.unitsCount, 1, 3)
      this.generateQr();
    },
    changeTurnsCount(increment: number) {
      this.turnsCount += increment;
      this.turnsCount = this.limit(this.turnsCount, 1, 5)
      this.generateQr();
    },
    changeDirections(i: number) {
      this.directions[i] = this.directions[i] == "1" ? "0" : "1";
      this.generateQr();
    },
    changeUnits(i: number) {
      this.units[i] = this.units[i] == "1" ? "0" : "1";
      this.generateQr();
    },
    changeTurns(i: number) {
      this.turns[i] = this.turns[i] == "1" ? "0" : "1";
      this.generateQr();
    },
    updateAction(action: number, index: number, increment: number) {
      this.actions[action][index] = Number(this.actions[action][index]) + increment;
      if (Number(this.actions[action][index]) < -16) {
        this.actions[action][index] = -16
      } else if (Number(this.actions[action][index]) > 16) {
        this.actions[action][index] = 16
      }
      this.generateQr()
    },
    result(): string {
      // Validator string: 'V:D1111,U111,T111111,DXX,UXX,TXX,'
      // Action string: 'A:TYPE,I+XX,C+XX,A+XX,'
      var zeroPad = (str: string) => str.length < 2 ? '0' + str : str;
      var prefix = (val: number) => val < 0 ? '-' : '+';
      var validator = 'V:D' + this.directions.join("") + ",U" + this.units.join("") + ",T" + this.turns.join("");
      validator += ",D" + zeroPad(this.directionsCount.toString())
      validator += ",U" + zeroPad(this.unitsCount.toString())
      validator += ",T" + zeroPad(this.turnsCount.toString())
      var actions = ",";
      for (var action of this.actions) {
        actions += "A:" + action[0]
          + ",I" + prefix(Number(action[1])) + zeroPad(Math.abs(Number(action[1])).toString())
          + ",C" + prefix(Number(action[2])) + zeroPad(Math.abs(Number(action[2])).toString())
          + ",A" + prefix(Number(action[3])) + zeroPad(Math.abs(Number(action[3])).toString()) + ","
      }
      
      for (var add = 0; add < 3 - this.actions.length; add++) {
        actions += "A:NULL,I+00,C+00,A+00,"
      }

      return validator + actions;
    },
  },
  mounted() {
    this.outputElem = document.getElementById("output") as HTMLElement
    this.generateQr();
  },
  watch: {
    actions: function () {
      this.generateQr()
    }
  }
})
</script>
