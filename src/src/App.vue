<template>

  <v-app>



        <v-overlay
          :absolute="true"
          :value="overlay"

        >

          <textarea ref="source-code" class="source-code" v-model="sealSourceCode"></textarea>

          <v-btn
            color="success"
            @click="overlay = false"
            right
            block
          >
            Close
          </v-btn>
        </v-overlay>




      <div ref="seal-buttons" class="seal-buttons" >
        <v-btn :href="sealURL" target="_blank" small>
          <v-icon>mdi-share-variant</v-icon> Sharing URL
        </v-btn>

        <v-btn small @click="overlay = !overlay">
          <v-icon>mdi-code-braces</v-icon> Source
        </v-btn>

        <v-btn href="https://github.com/deljdlx/the-seal" target="_blank" small>
          <v-icon>mdi-share-variant</v-icon> Github
        </v-btn>

      </div>

      <div ref="seal" class="seal-preview"></div>






      <div class="toolbar">


        <div class="seal-option">
          <h3>Text</h3>
          <v-text-field v-model="parameters.text"></v-text-field>
        </div>


        <div class="seal-option">
          <h3>URL image</h3>
          <v-text-field v-model="parameters.image"></v-text-field>
        </div>


        <div class="seal-option">
          <h3>Title Radius</h3>
          <v-slider
            hint="Im a hint"
            max="550"
            min="50"
            v-model="parameters.titleRadius"
          ></v-slider>
        </div>

        <hr />


        <div class="seal-option">
          <h3>Radius</h3>
          <v-slider
            hint="Im a hint"
            max="350"
            min="50"
            v-model="parameters.radius"
          ></v-slider>
        </div>


        <div class="seal-option">
          <h3>Border width</h3>
          <v-slider
            hint="Im a hint"
            max="100"
            min="0"
            v-model="parameters.borderSize"
          ></v-slider>
        </div>


        <div class="seal-option">
          <h3>Crown Radius</h3>
          <v-slider
            hint="Im a hint"
            max="350"
            min="50"
            v-model="parameters.crownRadius"
          ></v-slider>
        </div>



        <div class="seal-option">
          <h3>Crown item size</h3>
          <v-slider
            hint="Im a hint"
            max="500"
            min="10"
            v-model="parameters.gearSize"
          ></v-slider>
        </div>


        <div class="seal-option">
          <h3>Crown item radius</h3>
          <v-slider
            hint="Im a hint"
            max="100"
            min="0"
            v-model="parameters.gearRadius"
          ></v-slider>
        </div>

        <div class="seal-option">
          <h3>Crown item border weight</h3>
          <v-slider
            hint="Im a hint"
            max="50"
            min="0"
            v-model="parameters.gearBorder"
          ></v-slider>
        </div>



        <div class="seal-option">
          <h3>Skew X</h3>
          <v-slider
            hint="Im a hint"
            max="200"
            min="0"
            v-model="parameters.crownSkewX"
          ></v-slider>
        </div>

        <div class="seal-option">
          <h3>Skew Y</h3>
          <v-slider
            hint="Im a hint"
            max="100"
            min="0"
            v-model="parameters.crownSkewY"
          ></v-slider>
        </div>


        <div class="seal-option">
          <h3>Scale x</h3>
          <v-slider
            hint="Im a hint"
            max="500"
            min="-50"
            v-model="parameters.crownScaleX"
          ></v-slider>
        </div>


        <div class="seal-option">
          <h3>Scale Y</h3>
          <v-slider
            hint="Im a hint"
            max="500"
            min="-50"
            v-model="parameters.crownScaleY"
          ></v-slider>
        </div>


        <div class="seal-option">
          <h3>Rotation speed</h3>
          <v-slider
            hint="Im a hint"
            max="50"
            min="0"
            v-model="parameters.rotationSpeed"
          ></v-slider>
        </div>




        <div class="seal-option">
          <h3>Background first color</h3>
          <v-color-picker
            dot-size="25"
            swatches-max-height="200"
            hide-inputs
            v-model="parameters.containerColor0"
          ></v-color-picker>
        </div>

        <div class="seal-option">
          <h3>Background second color</h3>
          <v-color-picker
            dot-size="25"
            swatches-max-height="200"
            hide-inputs
            v-model="parameters.containerColor1"
          ></v-color-picker>
        </div>




        <div class="seal-option">
          <h3>Crown color</h3>
          <v-color-picker
            dot-size="25"
            swatches-max-height="200"
            hide-inputs
            v-model="parameters.crownColor"
          ></v-color-picker>
        </div>

        <div class="seal-option">
          <h3>Borders color</h3>
          <v-color-picker
            dot-size="25"
            swatches-max-height="200"
            hide-inputs
            v-model="parameters.borderColor"
          ></v-color-picker>
        </div>

        <div class="seal-option">
          <h3>Text color</h3>
          <v-color-picker
            dot-size="25"
            swatches-max-height="200"
            hide-inputs
            v-model="parameters.textColor"
          ></v-color-picker>
        </div>
      </div>



  </v-app>

</template>

<script>

import Seal from './class/TheSeal.js';

export default {
  name: 'App',

  data: () => ({

    overlay: false,

    parameters: {
      containerColor0: '#fff',
      containerColor1: '#000',
      text: 'The Seal',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7kPZqPN8RRvHNpUL3WP4MQRSInAuWlkkLcQ&usqp=CAU',

      radius: 100,
      crownRadius: 150,
      titleRadius: 100,

      gearSize: 50,
      crownSkewX: 0,
      crownSkewY: 0,
      crownScaleX: 0,
      crownScaleY: 0,

      gearRadius: 0,
      gearBorder: 5,

      borderColor: '#fff',
      borderSize: 8,

      crownColor: '#AAC3FFB7',
      textColor: '#A47FE4FF',

      rotationSpeed: 5,
    },
    seal: null,
  }),

  computed: {
    sealURL() {
      let location = document.location;

      let url =  'http://' + location.host + '/static/?'
      for(let parameter in this.$data.parameters) {
        url += '&' + parameter + '=' + encodeURIComponent(this.$data.parameters[parameter]);
      }
      return url;
    },
    sealSourceCode: {
      set(value) {
        console.log(value)
      },
      get() {

        let location = document.location;
        let url =  'http://' + location.host + '/static';

        let source =  '';

        source += `<!-- The Seal preview URL` + "\n";
        source += `` + this.sealURL + "\n//-->\n\n";

        source += `<!-- The Seal CSS //-->` + "\n";
        source += `<link rel="stylesheet" href="` + `` + url + `/the-seal.css" />` + "\n\n";

        source += `<!-- The Seal JS class //-->` + "\n";
        source += `<script ` + ` src="` + url + `/the-seal.js"></` + `script>` + "\n";

        source += `<!-- The Seal JS helper //-->` + "\n";
        source += `<script ` + ` src="` + url + `/run-the-seal.js"></` + `script>` + "\n\n";
        source +=  `<script` + `>` + "\n";

        source += "theSeal({\n";

        source += "  container: " + "document.body,\n";

        for(let parameter in this.$data.parameters) {
          let value = this.$data.parameters[parameter];

          if(typeof(value) === 'string') {
            value = value.replace(/'/gi, "&apos");
          }

          if(isNaN(value * 1)) {
            value = "'" + value + "'";
          }
          source += "  " + parameter + ': ' + "" + value + ",\n";
        }

        source += "});\n";
        source +=  `</` + `script>`;

        return source;
      }
    }
  },

  mounted() {

    let size = this.parameters.radius;

    this.seal = new Seal(this.$refs['seal'], size, this.parameters.text, this.parameters.image);

    this.seal.setProperty('containerColor0', this.parameters.containerColor0);
    this.seal.setProperty('containerColor1', this.parameters.containerColor1);

    this.seal.setProperty('size', this.parameters.radius * 2);
    this.seal.setProperty('titleRadius', this.parameters.titleRadius);
    this.seal.setProperty('backgroundImage', this.parameters.image);


    this.seal.setProperty('rotationSpeed', this.parameters.rotationSpeed);
    this.seal.setProperty('oscillationSpeed', 0);

    this.seal.setProperty('borderColor', this.parameters.borderColor);
    this.seal.setProperty('borderSize', this.parameters.borderSize);

    this.seal.setProperty('textColor', this.parameters.textColor);

    this.seal.setProperty('crownColor', this.parameters.crownColor);

    this.seal.setProperty('crownRadius', this.parameters.crownRadius, true);
    this.seal.setProperty('gearSize', this.parameters.gearSize, true);
    this.seal.setProperty('gearRadius', this.parameters.gearRadius, true);

    this.seal.setProperty('gearBorder', this.parameters.gearBorder, true);

    this.seal.setProperty('crownSkewX', this.parameters.crownSkewX, true);
    this.seal.setProperty('crownSkewY', this.parameters.crownSkewY, true);

    this.seal.setProperty('crownScaleY', this.parameters.crownScaleY, true);
    this.seal.setProperty('crownScaleX', this.parameters.crownScaleX, true);
    this.seal.setProperty('crownShadow', 10, true);
    this.seal.render();
  },

  watch: {
    parameters: {
      handler() {

        this.seal.setProperty('containerColor0', this.parameters.containerColor0);
        this.seal.setProperty('containerColor1', this.parameters.containerColor1);

        this.seal.setProperty('sentence', this.parameters.text);

        this.seal.setProperty('backgroundImage', this.parameters.image);

        this.seal.setProperty('size', this.parameters.radius * 2);
        this.seal.setProperty('titleRadius', this.parameters.titleRadius);


        this.seal.setProperty('rotationSpeed', this.parameters.rotationSpeed);


        this.seal.setProperty('borderSize', this.parameters.borderSize);


        this.seal.setProperty('crownRadius', this.parameters.crownRadius);


        this.seal.setProperty('gearSize', this.parameters.gearSize, true);
        this.seal.setProperty('gearRadius', this.parameters.gearRadius, true);
        this.seal.setProperty('gearBorder', this.parameters.gearBorder, true);

        this.seal.setProperty('crownSkewX', this.parameters.crownSkewX, true);
        this.seal.setProperty('crownSkewY', this.parameters.crownSkewY, true);
        this.seal.setProperty('crownScaleY', this.parameters.crownScaleY, true);
        this.seal.setProperty('crownScaleX', this.parameters.crownScaleX, true);

        this.seal.setProperty('crownColor', this.parameters.crownColor);
        this.seal.setProperty('borderColor', this.parameters.borderColor);
        this.seal.setProperty('textColor', this.parameters.textColor);

        this.seal.refresh();
      },
      deep: true
    },
  }
};
</script>

<style>
@import '../public/static/the-seal.css';

body {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  margin: 0;
  padding: 0;
}


hr {
  color: #fff;
  margin-bottom: 1rem;
}

.theme--light.v-application {
  background: transparent !important;
}

.v-application--wrap {
  width: 200px;
}

.toolbar {
  background-color: rgba(0,0,0, 0.8);
  padding: 1rem;
  color: #fff;
  position: absolute;
  height: 100vh;
  overflow: scroll;
  width: 250px;
}
.seal-preview {
  position: relative;
  height: 100vh;
  width: 100vw;
}


.v-text-field__slot input {
  color: #fff !important;
}

.seal-option {
  border-radius: 0.5rem;
  border: solid 1px #ccc;
  margin-bottom: 1rem;
  padding: 1rem;
  background-color: #fff2
}

.v-messages.theme--light {
  display: none;
}

.seal-buttons {
  position: absolute;
  top: 0rem;
  width: calc(100vw - 200px - 4rem);
  left: calc(200px + 3rem + 2px);
  z-index: 5000;
  border-bottom: solid 1px #555;

  padding: 0.5rem 0.5rem;
  background-color: #fff8;
  font-weight: bold;
}

.source-code {
  background-color: #000c;
  height: calc(100vh - 10rem);
  width: calc(100vw - 200px - 4rem - 2rem);
  margin: auto;
  color: #fff;
  padding: 1rem;
  font-family: 'Courier New', Courier, monospace;
  display: block;
}

</style>
