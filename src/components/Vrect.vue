<template>
  <rect :x="value.x"
        :y="value.y"
        :width="value.width"
        :height="value.height"
        v-on:mousedown="startDragging"
        v-on:mouseup="stopDragging"
        v-on:mousemove="move" />
</template>

<script>
export default {
  name: 'vrect',
  props: ['value'],
  data () {
    return {
      dragging: false
    }
  },
  methods: {
    startDragging(event) {
      this.dragging = true
    },
    move(event) {
      if (this.dragging) {
        
      }
    },
    stopDragging(event) {
      this.dragging = false
    }
  },
  mounted() {
  }
}
</script>

<style>
</style>
