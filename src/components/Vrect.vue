<template>
  <rect :x="value.x"
        :y="value.y"
        :width="value.width"
        :height="value.height" />
</template>

<script>
export default {
  name: 'vrect',
  props: ['value'],
  data () {
    return {
    }
  }
}
</script>

<style>
</style>
