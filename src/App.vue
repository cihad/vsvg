<template>
  <div id="app">
    <vsvg width="500" height="500" v-model="elements">
      <template v-for="(element, i) in elements">
        <component :is="element.name" v-model="elements[i]"></component>
      </template>
    </vsvg>
    
  </div>
</template>

<script>
import Vsvg from "./components/Vsvg"
import Vrect from "./components/Vrect"

export default {
  name: 'app',
  data () {
    return {
      elements: [
        {
          name: "vrect",
          x: 10,
          y: 10,
          width: 50,
          height: 50,
          get fill() {
            return this.fillColor || 'hsl(205,100%,90%)'
          },
          set fill(value) {
            this.fillColor = value
          },
          get stroke() {
            return this.strokeColor || 'hsl(205,100%,90%)'
          },
          set stroke(value) {
            this.strokeColor = value
          }
        },
        {
          name: "vrect",
          x: 200,
          y: 100,
          width: 120,
          height: 120,
          get fill() {
            return this.fillColor || 'hsl(205,100%,90%)'
          },
          set fill(value) {
            this.fillColor = value
          },
          get stroke() {
            return this.strokeColor || 'hsl(205,100%,90%)'
          },
          set stroke(value) {
            this.strokeColor = value
          }
        },

      ]
    }
  },
  components: {
    Vsvg, Vrect
  }
}
</script>

<style>
</style>
