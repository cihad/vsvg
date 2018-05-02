<template>
  <foreignObject 
        :x="value.x"
        :y="value.y"
        :width="value.width"
        :height="value.height"
        v-on:dblclick="editable = !editable"
        fill="#f0f0f0">
    <div :contenteditable="editable"
        :style="style">
      {{ value.text }}
    </div>
  </foreignObject>
</template>

<script>
import { EventBus } from '../mixins/event-bus'
import draggable from '../mixins/draggable'

export default {
  name: 'vforeign',
  props: ['value'],
  mixins: [draggable],
  data() {
    return {
      editable: false,
      style: {  
        background: "#f0f0f0",
        width: this.value.width + "px",
        height: this.value.height + "px",
        fontFamily: "Arial",
        fontSize: "24px",
        verticalAlign: "middle",
        minWidth: "1px",
        minHeight: "1px",
        wordWrap: "break-word",
        whiteSpace: "nowrap",
        display: "table-cell",
        boxSizing: "border-box"
      }
    }
  },
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
    }
  },
  // computed: {
  //   transform() {
  //     return "matrix(1,0,0,1," + this.value.x + "," + this.value.y + ")"
  //   },
  //   points() {
  //     return [
  //       [0, 0],
  //       [this.value.width, 0],
  //       [this.value.width, this.value.height],
  //       [0, this.value.height],
  //       [this.value.width/2, 0],
  //       [this.value.width, this.value.height/2],
  //       [this.value.width/2, this.value.height],
  //       [0, this.value.height/2]
  //     ]
  //   }

  // },
}
</script>

<style>
</style>
