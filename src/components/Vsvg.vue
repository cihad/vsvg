<template>
  <svg :width="width" :height="height" @mouseup="stopDragging" @mousemove="dragElement">
    <slot></slot>
    
    <g stroke-width="1">
      <line :x1="edge" :y1="0" :x2="edge" :y2="height" stroke="green" v-for="edge in edges['x']" />
      <line :x1="0" :y1="edge" :x2="width" :y2="edge" stroke="blue" v-for="edge in edges['y']" />
    </g>
  </svg>
</template>

<script>
import AligmentGuides from '../mixins/aligment-guides'
import { EventBus } from '../mixins/event-bus'

export default {
  name: 'vsvg',
  props: ['width', 'height', 'value'],
  data () {
    return {
      bus: EventBus
    }
  },
  mixins: [AligmentGuides],
  methods: {
    stopDragging(event) {
      console.log('dragging STOP')
      this.bus.dragging = null
    },
    dragElement(event) {
      if (this.bus.dragging) {

        this.bus.dragging.value.x += event.pageX - this.bus.startX
        this.bus.startX = event.pageX
        this.bus.dragging.value.y += event.pageY - this.bus.startY
        this.bus.startY = event.pageY

        var _this = this

        this.edges['x'].forEach(function(edge) {
          console.log(Math.abs(_this.bus.dragging.value.x - edge))
          if (Math.abs(_this.bus.dragging.value.x - edge) <= 5) {
            _this.bus.dragging.value.x = edge
          }
        })

        this.edges['y'].forEach(function(edge) {
          // if (Math.abs(_this.bus.dragging.value.y - edge) <= 10) {
          //   _this.bus.dragging.value.y = edge
          // }
        })
      }
    }
  }
}
</script>

<style>
</style>
