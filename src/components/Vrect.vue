<template>
  <g>
    <rect :x="value.x"
          :y="value.y"
          :width="value.width"
          :height="value.height"
          fill="hsl(205,100%,90%)"
          stroke-width="1"
          stroke="hsl(205,100%,90%)" />
    
    <g :transform="transform">
      <rect :width="value.width" :height="value.height" class="svg_select_boundingRect"></rect>
      <circle r="3.5" 
        :cx="point[0]"
        :cy="point[1]"
        v-on:mousedown.stop.prevent="onPointMouseDown(key, $event)"
        v-for="(point, key) in points" />
    </g>
  </g>
</template>

<script>
import draggable from '../mixins/draggable'

export default {
  name: 'vrect',
  props: ['value'],
  mixins: [draggable],
  computed: {
    transform() {
      return "matrix(1,0,0,1," + this.value.x + "," + this.value.y + ")"
    },
    points() {
      return {
        lt: [0, 0],
        rt: [this.value.width, 0],
        rb: [this.value.width, this.value.height],
        lb: [0, this.value.width],
        t: [this.value.width/2, 0],
        r: [this.value.width, this.value.height/2],
        b: [this.value.width/2, this.value.height],
        l: [0, this.value.height/2]
      }
        
    }

  },

  methods: {
    onPointMouseDown(pointName, event) {
      console.log('......',pointName)
      var x = event.pageX
      var y = event.pageY
      this.$emit(pointName, {x: x, y: y, event: event})
    }
  }

}
</script>

<style>
.svg_select_boundingRect {
    stroke-width: 1;
    fill: gray;
    stroke-dasharray: 10 10;
    stroke: black;
    stroke-opacity: 0.8;
    fill-opacity: 0.1;
    pointer-events: none;
}
</style>
