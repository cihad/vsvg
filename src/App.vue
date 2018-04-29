<template>
  <div id="app" :contenteditable="editable">
    <vsvg width="1000" height="650" v-model="elements" :show-edge="showEdge">
      <template v-for="(element, i) in elements">
        <component :is="element.name" v-model="elements[i]" v-on:editable="toggleEditable"></component>
      </template>
    </vsvg>

    <button v-on:click="showEdge = !showEdge">Toggle Edges</button>
    
  </div>
</template>

<script>
import Vsvg from "./components/Vsvg"
import Vrect from "./components/Vrect"
import Vtext from "./components/Vtext"
import Vbrowser from "./components/Vbrowser"
import Vforeign from "./components/Vforeign"

export default {
  name: 'app',
  data () {
    return {
      editable: false,
      showEdge: false,
      elements: [
        // {
        //   name: "vrect",
        //   x: 10,
        //   y: 10,
        //   width: 50,
        //   height: 50
        // },
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
        //   y: 300
        // },
        {
          name: "vforeign",
          text: "Merhaba Dunya",
          x: 10,
          y: 10,
          width: 150,
          height: 30
        },
      ]
    }
  },
  components: {
    Vsvg, Vrect, Vtext, Vbrowser, Vforeign
  },
  methods: {
    toggleEditable() {
      this.editable = !this.editable
    }
  }
}
</script>

<style>
</style>
