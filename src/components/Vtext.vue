<template> 
  <text :x="value.x"
        :y="value.y"
        v-on:mousedown="startDragging"
        v-on:dblclick="dblclick"
        fill="red"
        font-family="Arial"
        :font-size="fontSize"
        style="cursor: default; user-select: none">
    {{ value.text }}
  </text>
</template>

<script>
import { EventBus } from '../mixins/event-bus'
import draggable from '../mixins/draggable'
import FontMetrics from 'fontmetrics'
  
export default {
  name: 'vtext',
  props: {
    value: {
      type: Object
    },
    editable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      width: null,
      height: null,
      fontMetrics: null,
      fontSize: 32
    }
  },
  mixins: [draggable],
  mounted() {
    this.width = this.$el.getBBox().width
    this.height = this.$el.getBBox().height
  },
  beforeMount() {
    var _this = this
    
    this.fontMetrics = new FontMetrics({
      fontFamily: 'Arial',
      fontSize: _this.fontSize
    })
  },
  computed: {
    ascentHeight() {
      return this.fontMetrics.ascent * this.fontSize
    }
  },
  methods: {
    dblclick() {
      console.log('dblcllliiicccck')
      this.$emit('editable')
    }
  }
}
</script>

<style>
</style>
