<template>
  <svg :width="width" :height="height">
    <slot></slot>
    

    <aligment-guides v-model='value'></aligment-guides>
  </svg>
</template>

<script>
import AligmentGuides from '../components/AligmentGuides'
import { EventBus } from '../mixins/event-bus'

export default {
  name: 'vsvg',
  props: ['width', 'height', 'value'],
  data () {
    return {
    }
  },
  components: {
    AligmentGuides
  }
}
</script>

<style>
</style>
