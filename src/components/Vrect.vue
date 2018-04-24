<template>
  <rect :x="value.x"
        :y="value.y"
        :width="value.width"
        :height="value.height"
        fill="hsl(205,100%,90%)"
        stroke-width="1"
        stroke="hsl(205,100%,90%)" />
</template>

<script>
import draggable from '../mixins/draggable'

export default {
  name: 'vrect',
  props: ['value'],
  mixins: [draggable]
}
</script>

<style>
</style>
