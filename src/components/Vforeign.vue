<template>
  <g @mousedown="isOver = false; isSelected = true"
    @mouseover="isOver = true"
    @mouseout="isOver = false"
    v-click-outside="close">
    <foreignObject 
          :x="value.x"
          :y="value.y"
          :width="value.width"
          :height="value.height"
          v-on:dblclick="editable = true"
          fill="#f0f0f0">
      <div :contenteditable="editable"
          :style="[box]"
          class="cursor editable-text">
        {{ value.text }}
      </div>
    </foreignObject>
    <g :transform="transform" :style="{ opacity: opacity }" v-show="isOver || isSelected">
      <rect :width="value.width" :height="value.height" class="svg_select_boundingRect"></rect>
      <rb-point :rect="value" v-model="points.rb"></rb-point>
      <rt-point :rect="value" v-model="points.rt"></rt-point>
      <lb-point :rect="value" v-model="points.lb"></lb-point>
      <lt-point :rect="value" v-model="points.lt"></lt-point>
    </g>
  </g>
</template>

<script>
import { EventBus } from '../mixins/event-bus'
import draggable from '../mixins/draggable'

import ClickOutside from 'vue-click-outside'
import SelectPoint from '../components/SelectPoint'
import RbPoint from '../components/points/RbPoint.js'
import RtPoint from '../components/points/RtPoint.js'
import LbPoint from '../components/points/LbPoint.js'
import LtPoint from '../components/points/LtPoint.js'

export default {
  name: 'vforeign',
  props: ['value'],
  mixins: [draggable],
  data() {
    return {
      editable: false,
      isSelected: false,
      isOver: false
    }
  },
  directives: { ClickOutside },
  components: { RbPoint, LbPoint, RtPoint, LtPoint },
  methods: {
    startDragging(event) {
      event.stopPropagation()
      EventBus.dragging = this
      this.value.fill = "hsl(205,100%,80%)"
      this.value.stroke = "hsl(205,100%,70%)"
      EventBus.startX = event.offsetX
      EventBus.startY = event.offsetY
      EventBus.mouseOffsetX = event.offsetX
      EventBus.mouseOffsetY = event.offsetY
    },
    onPointMouseDown(pointName, event) {
      console.log('......',pointName)
      var x = event.pageX
      var y = event.pageY
      this.$emit(pointName, {x: x, y: y, event: event})
    },
    close() {
      console.log('OUTSIDEEEEE')
      this.isSelected = false
      this.isOver = false
      this.editable = false
    }
  },
  computed: {
    opacity() {
      var opacity = 0

      if (this.isSelected)
        opacity = 1
      else if (this.isOver)
        opacity = 0.5

      return opacity
    },
    transform() {
      return "matrix(1,0,0,1," + this.value.x + "," + this.value.y + ")"
    },
    points() {
      return {
        lt: [0, 0],
        rt: [this.value.width, 0],
        rb: [this.value.width, this.value.height],
        lb: [0, this.value.height],
        t: [this.value.width/2, 0],
        r: [this.value.width, this.value.height/2],
        b: [this.value.width/2, this.value.height],
        l: [0, this.value.height/2]
      }
        
    },
    box() {
      return {
        width: this.value.width + "px",
        height: this.value.height + "px",
      }
    }

  },
}
</script>

<style>
.svg_select_boundingRect {
  stroke-width: 1;
  stroke: #0080FF;
  fill-opacity: 0;
  pointer-events: none;
}

foreignObject {
  overflow: hidden;
}

.editable-text {
  /*background: #f0f0f0;*/
  font-family: Arial;
  font-size: 24px;
  vertical-align: middle;
  min-width: 1px;
  min-height: 1px;
  word-wrap: break-word;
  /*white-space: nowrap;*/
  display: table-cell;
  box-sizing: border-box;
}

.cursor {
  user-select: none;
  cursor: defaultl
}
</style>
