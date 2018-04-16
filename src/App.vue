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
          height: 50
        },
        {
          name: "vrect",
          x: 200,
          y: 100,
          width: 80,
          height: 80
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
