<template>
  <svg :width="width" :height="height">
    <slot></slot>
    
    <g stroke-width="1">
      <line :x1="edge" :y1="0" :x2="edge" :y2="height" stroke="green" v-for="edge in edges[0]" />
      <line :x1="0" :y1="edge" :x2="width" :y2="edge" stroke="blue" v-for="edge in edges[1]" />
    </g>
  </svg>
</template>

<script>
import AligmentGuides from '../mixins/aligment-guides'

export default {
  name: 'vsvg',
  props: ['width', 'height', 'value'],
  data () {
    return {
    }
  },
  mixins: [AligmentGuides]
}
</script>

<style>
</style>
