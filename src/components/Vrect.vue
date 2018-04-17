<template>
  <rect :x="value.x"
        :y="value.y"
        :width="value.width"
        :height="value.height"
        v-on:mousedown="startDragging" />
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
      EventBus.startX = event.pageX
      EventBus.startY = event.pageY
    }
  }
}
</script>

<style>
</style>
