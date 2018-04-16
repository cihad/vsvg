<template>
  <svg :width="width" :height="height">
    <slot></slot>

    <slot name="footer"></slot>
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
