<template>
  <rect :x="value.x"
        :y="value.y"
        :width="value.width"
        :height="value.height"
        v-on:mousedown="startDragging"
        :fill="value.fill"
        stroke-width="1"
        :stroke="value.stroke" />
</template>

<script>
import { EventBus } from '../mixins/event-bus'

export default {
  name: 'vrect',
  props: ['value'],
  methods: {
    startDragging(event) {
      EventBus.dragging = this
      this.value.fill = "hsl(205,100%,80%)"
      this.value.stroke = "hsl(205,100%,70%)"
      EventBus.startX = event.offsetX
      EventBus.startY = event.offsetY
      EventBus.mouseOffsetX = event.offsetX - this.value.x
      EventBus.mouseOffsetY = event.offsetY - this.value.y
      // console.log(this.$parent.$children[2])
      // console.log(this.$parent.$children[2].$forceUpdate())
    }
  }
}
</script>

<style>
</style>
