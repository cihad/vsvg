<template>
  <text :x="value.x"
        :y="value.y"
        v-on:mousedown="startDragging"
        fill="red">
    {{ value.text }}
  </text>
</template>

<script>
import { EventBus } from '../mixins/event-bus'

export default {
  name: 'vtext',
  props: ['value'],
  data() {
    return {
      width: null,
      height: null
    }
  },
  methods: {
    startDragging(event) {
      EventBus.dragging = this
      EventBus.startX = event.offsetX
      EventBus.startY = event.offsetY
      EventBus.mouseOffsetX = event.offsetX - this.value.x
      EventBus.mouseOffsetY = event.offsetY - this.value.y
      // console.log(this.$parent.$children[2])
      // console.log(this.$parent.$children[2].$forceUpdate())
    }
  },
  mounted() {
    this.width = this.$el.getBBox().width
    this.height = this.$el.getBBox().height
  }
}
</script>

<style>
</style>
