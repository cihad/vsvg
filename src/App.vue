<template>
  <div id="app">
    <vsvg width="1000" height="650" v-model="elements">
      <template v-for="(element, i) in elements">
        <component :is="element.name" v-model="elements[i]"></component>
      </template>
    </vsvg>
    
  </div>
</template>

<script>
import Vsvg from "./components/Vsvg"
import Vrect from "./components/Vrect"
import Vtext from "./components/Vtext"
import Vbrowser from "./components/Vbrowser"

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
          height: 50
        },
        {
          name: "vrect",
          x: 200,
          y: 100,
          width: 120,
          height: 120
        },
        // {
        //   name: "vbrowser",
        //   x: 200,
        //   y: 200,
        //   width: 120,
        //   height: 120
        // },
        // {
        //   name: "vtext",
        //   text: "Merhaba Dunya",
        //   x: 300,
        //   y: 300,
        //   width: 100,
        //   height: 30
        // },

      ]
    }
  },
  components: {
    Vsvg, Vrect, Vtext, Vbrowser
  }
}
</script>

<style>
</style>
