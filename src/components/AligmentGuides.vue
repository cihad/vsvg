<template>
  <g stroke-width="1" stroke="hsl(205,100%,75%)">
    <line :x1="edge" :y1="0" :x2="edge" :y2="$parent.height" v-for="edge in edges['x']" />
    <line :x1="0" :y1="edge" :x2="$parent.width" :y2="edge" v-for="edge in edges['y']" />
  </g>
</template>

<script>
import { EventBus } from '../mixins/event-bus'

export default {
  name: 'aligment-guides',
  props: ['value'],
  data () {
    return {
      bus: EventBus,
      snapTreshhold: 5,
      x: null,
      y: null
    }
  },
  mounted: function() {
    this.$parent.$el.addEventListener('mousemove', this.dragElement.bind(this))
    this.$parent.$el.addEventListener('mouseup', this.stopDragging.bind(this))
  },
  methods: {
    getEdgesOfRect(rectObj) {
      return {
        x: [rectObj.x, rectObj.x+rectObj.width/2, rectObj.x+rectObj.width],
        y: [rectObj.y, rectObj.y+rectObj.height/2, rectObj.y+rectObj.height]
      }
    },
    getSvgEdges() {
      return {
        x: [0, this.$parent.width/2, parseInt(this.$parent.width)],
        y: [0, this.$parent.height/2, parseInt(this.$parent.height)]
      }
    },
    stopDragging(event) {
      console.log('dragging STOP')
      // debugger
      this.bus.stopDragging()
    },
    dragElement(event) {
      if (this.bus.dragging) {
        this.x = event.offsetX - this.bus.mouseOffsetX
        this.bus.startX = event.offsetX
        this.y = event.offsetY - this.bus.mouseOffsetY
        this.bus.startY = event.offsetY

        this.snap('x');
        this.snap('y');

        this.redraw()
      }
    },
    snap(axis) {
      var _this = this
      var rect = this.bus.dragging.value
      var side = axis === 'x' ? 'width' : 'height';
      var distance = this[axis];
      var halfSideLength = Math.abs(rect[side]/2);
      var center = distance + halfSideLength;
      var endDistance = distance + rect[side];
      
      this.edges[axis].forEach(function(position) {
        if(Math.abs(distance - position) <= _this.snapTreshhold){
          _this[axis] = position;
        }
        else if(Math.abs(center - position) <= _this.snapTreshhold){
          _this[axis] = position - halfSideLength;
        }
        else if(Math.abs(endDistance - position) <= _this.snapTreshhold){
          _this[axis] = position - rect[side];
        }
      })
    },
    redraw() {
      var rect = this.bus.dragging.value
      rect.x = this.x
      rect.y = this.y
    }
  },
  computed: {
    edges: function() {
      var svgEdges = this.getSvgEdges(),
          _this = this,
          elements = null

      if (EventBus.dragging) {
        elements = this.value.filter(function(rect) {
          return EventBus.dragging.value !== rect
        })
      } else {
        elements = this.value
      }

      elements.forEach(function(rect) {
        svgEdges['x'].push(..._this.getEdgesOfRect(rect)['x'])
        svgEdges['y'].push(..._this.getEdgesOfRect(rect)['y'])
        console.log(svgEdges)
      })

      return svgEdges
    }
  }
}
</script>

<style>
</style>
