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

        this.bus.dragging.value.x += event.pageX - this.bus.startX
        this.bus.startX = event.pageX
        this.bus.dragging.value.y += event.pageY - this.bus.startY
        this.bus.startY = event.pageY

        this.snap({ axis: 'x'});
        this.snap({ axis: 'y'});
      }
    },
    snap(options) {
      var _this = this
      var rect = _this.bus.dragging.value
      var axis = options.axis
      var side = axis === 'x' ? 'width' : 'height';
      
      this.edges[axis].forEach(function(position) {
        var distance = rect[axis];
        var halfSideLength = Math.abs(rect[side]/2);
        var center = distance + halfSideLength;
        var endDistance = distance + rect[side];
        var setGuide = false;
        
        if(Math.abs(distance - position) <= _this.snapTreshhold){
          rect[axis] = position;
          setGuide = true;
        }
        else if(Math.abs(center - position) <= _this.snapTreshhold){
          rect[axis] = position - halfSideLength; // move snap behavior 
        }
        else if(Math.abs(endDistance - position) <= _this.snapTreshhold){
          rect[axis] = position - rect[side]; // move snap behavior 
        }
      })
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
