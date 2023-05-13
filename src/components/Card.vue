<script setup lang="ts"></script>
    <template>
        <div @click="download()" :id="'card-' + unique" class="card" :style="physicalStyle()">
            <h3 class="card-title" :style="titleStyle()">{{title}}</h3>
            <p class="card-description" :style="descriptionStyle()">{{description}}</p>
            <div class="qr-container">
                <div :id="'qr-card-' + unique"></div>
            </div>
        </div>
    </template>
<style scoped>


.card {
    border: black 2px solid;
    color: black;
    justify-content: center;
    align-items: center;
    display: flex;
    flex-direction: column;
}

.card :hover {
    cursor: pointer;
}

.card-title {
    white-space: pre-line;
    font-weight: bold;
    text-align: center;
    flex-grow: 1;
}

.card-description {
    color:  #333333;
    font-weight: bold;
    white-space: pre-line;
    overflow-wrap: break-word;
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
  name: 'Card',
  props: ['title', 'description', 'value', 'baseheight', 'basewidth', 'output'],
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
    generateQr()
    {
        const errCorLvl: qrcodegen.QrCode.Ecc = qrcodegen.QrCode.Ecc.LOW;  // Error correction level
        const qr: qrcodegen.QrCode = qrcodegen.QrCode.encodeText(this.value, errCorLvl);  // Make the QR Code symbol
        qrcodegen.drawCanvas(qr, 6*this.scale, 1, this.backColor(), "#000000", this.appendCanvas('qr-card-' + this.unique));  // Draw it on screen
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
    backColor()
    {
        return 'white';
    },
    borderColor()
    {
        // return "black";
        return "white";
        // return "#784a21"; // copper
        // return "#5d64b1"; // settings
        // return '#baaa25'; // gold
        // return '#a7a7a7'; // silver
    },
    physicalStyle()
    {
        return `padding: ${this.margin}in;
        width: ${this.width}in;
        height: ${this.height}in;
        background-color: ${this.backColor()};
        border: 2px solid ${this.borderColor()};
        `
        // border: 20px solid ${this.borderColor()};
    },
    titleStyle()
    {
        return `    margin-top: ${0.1*this.scale}in;
        width: ${this.width*3/4}in;
        height: ${this.width*1/6}in;
        font-size: ${0.17*this.scale}in;
        line-height: ${1.25*this.scale};`
    },
    descriptionStyle()
    {
        return `    margin-top: ${0.1*this.scale}in;
        width: ${this.width*3/4}in;
        height: ${this.width*2/6}in;
        font-size: ${0.14*this.scale}in;
        line-height: ${1.25*this.scale};`
    },
    download()
    {
        var self = this;
        htmlToImage.toPng(document.getElementById('card-' + this.unique) as HTMLElement,
                    {'canvasWidth': 732, 'canvasHeight': 1101})
            .then(function (dataUrl) {
                (download as any)(dataUrl, 'card-' + self.title + '-' + self.unique + '-' + hash(self.description + self.value) + '.png');
            });
    }
  },
  created() {
    this.unique = uid as number;
    uid++
  },
  mounted() {
    var node = document.getElementById('box1');
    this.outputElem = document.getElementById('qr-card-' + this.unique) as HTMLElement
    this.generateQr();

    htmlToImage.toPng(node as HTMLElement)
    .then(function (dataUrl) {
        var img = new Image();
        img.src = dataUrl;
        // document.body.appendChild(img);
    })
    .catch(function (error) {
        console.error('oops, something went wrong!', error);
    });
},
watch: {
    output: function (old: boolean, newVal: boolean) {
        if (newVal) {
            this.download()
        }
    }
  },
  computed: {
    width() : number {
        return 2.2804 * this.scale;
    },
    height() : number {
        return 3.43 * this.scale;
    },
    margin() {
        return 0.15 * this.scale;
    },
  },
})
</script>
