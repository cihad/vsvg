<template>
  <line :x1="value.x1"
        :y1="value.y1"
        :x2="value.x2"
        :y2="value.y2"
        stroke="#f0f0f0"
        stroke-width="1"/>
</template>

<script>
export default {
  name: 'vline',
  props: ['value'],
  data () {
    return {
    }
  }
}
</script>

<style>
</style>
