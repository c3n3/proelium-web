<script setup lang="ts"></script>
    <template>
        <div @click="download()" id="box1" class="card">
            <h3 class="card-title">{{title}}</h3>
            <p class="card-description">{{description}}</p>
            <div class="qr-container">
                <div :id="'qr-card-' + unique"></div>
            </div>
        </div>
    </template>
<style scoped>

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

let uid = 0;

import { defineComponent } from 'vue'
import * as qrcodegen from "./qrcodegen";

import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';

import * as download from 'downloadjs'

export default defineComponent({
  name: 'Card',
  props: ['title', 'description', 'value', 'length', 'width', 'output'],
  data() {
      return {
          actions: 0,
          qr: document.createElement("canvas"),
          outputElem: document.getElementById("box1-qr") as HTMLElement,
          unique: null,
      }
  },
  methods: {
    generateQr()
    {
        const errCorLvl: qrcodegen.QrCode.Ecc = qrcodegen.QrCode.Ecc.LOW;  // Error correction level
        const qr: qrcodegen.QrCode = qrcodegen.QrCode.encodeText(this.value, errCorLvl);  // Make the QR Code symbol
        qrcodegen.drawCanvas(qr, 5, 4, "#FFFFFF", "#000000", this.appendCanvas('qr-card-' + this.unique));  // Draw it on screen
        // this.update = !this.update;
    },
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
    download()
    {
        var self = this;
        htmlToImage.toPng(document.getElementById('box1'))
            .then(function (dataUrl) {
                download(dataUrl, 'card-' + self.title + '.png');
            });
    }
  },
  created() {
    this.unique = uid;
    uid++
  },
  mounted() {
    var node = document.getElementById('box1');
    this.outputElem = document.getElementById('qr-card-' + this.unique)
    this.generateQr();

    htmlToImage.toPng(node)
    .then(function (dataUrl) {
        var img = new Image();
        img.src = dataUrl;
        // document.body.appendChild(img);
    })
    .catch(function (error) {
        console.error('oops, something went wrong!', error);
    });
    if (this.output) {
        console.log("THIS WOULD PRINT")
    }
},
watch: {
    output: function (old: boolean, newVal: boolean) {
        if (newVal) {
            this.download()
        }
    }
  }
})
</script>
