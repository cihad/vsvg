<template>
  <div id="app" v-on:keyup.left="move('left')"
      v-on:keyup.up="move('top')"
      v-on:keyup.right="move('right')"
      v-on:keyup.down="move('bottom')"
      tabindex="0">
    <button v-on:click="showEdge = !showEdge">Toggle Edges</button>
    <button v-on:click="addObj('vrect')">Add Rect</button><br>

    <vsvg width="1000" height="650" v-model="elements" :show-edge="showEdge">
      <template v-for="(element, i) in elements">
        <component :is="element.name" v-model="elements[i]"></component>
      </template>
    </vsvg>
  </div>
</template>

<script>
import { EventBus } from './mixins/event-bus'
import Vsvg from "./components/Vsvg"
import Vrect from "./components/Vrect"
import Vtext from "./components/Vtext"
import Vbrowser from "./components/Vbrowser"
import Vforeign from "./components/Vforeign"

export default {
  name: 'app',
  data () {
    return {
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
          width: 200,
          height: 30
        },
      ]
    }
  },
  components: {
    Vsvg, Vrect, Vtext, Vbrowser, Vforeign
  },
  methods: {
    addObj(name) {
      this.elements.push({
        name: "vrect",
        x: Math.random() * 300 + 50,
        y: Math.random() * 300 + 50,
        width: Math.random() * 300 + 50,
        height: Math.random() * 300 + 50
      })
    },
    move(pos) {
      console.log('...... moving app')
      if (EventBus.selected) {
        EventBus.selected.move(pos)
      }
    }
  }
}
</script>

<style>
</style>
