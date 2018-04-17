<template>
  <rect :x="value.x"
        :y="value.y"
        :width="value.width"
        :height="value.height"
        v-on:mousedown="startDragging"
        :fill="fill"
        stroke-width="1"
        :stroke="stroke" />
</template>

<script>
import { EventBus } from '../mixins/event-bus'

export default {
  name: 'vrect',
  props: ['value'],
  methods: {
    startDragging(event) {
      console.log('dragging START', this)
      EventBus.dragging = this
      this.value.fill = "hsl(205,100%,80%)"
      this.value.stroke = "hsl(205,100%,70%)"
      EventBus.startX = event.pageX
      EventBus.startY = event.pageY
      this.$emit('input', this.value)
    }
  },
  computed: {
    fill: function(argument) {
      console.log('fill UPDATED .............')
      return this.value.fill || 'hsl(205,100%,90%)'
    },
    stroke: function() {
      console.log('fill UPDATED .............')
      return this.value.stroke || 'hsl(205,100%,80%)'
    },
  }
}
</script>

<style>
</style>
