<template>
  <svg :width="width" :height="height" @mouseup="stopDragging" @mousemove="dragElement">
    <slot></slot>
    
    <g stroke-width="1" stroke="hsl(205,100%,75%)">
      <line :x1="edge" :y1="0" :x2="edge" :y2="height" v-for="edge in edges['x']" />
      <line :x1="0" :y1="edge" :x2="width" :y2="edge" v-for="edge in edges['y']" />
    </g>
  </svg>
</template>

<script>
import AligmentGuides from '../mixins/aligment-guides'
import { EventBus } from '../mixins/event-bus'

export default {
  name: 'vsvg',
  props: ['width', 'height', 'value'],
  data () {
    return {
      bus: EventBus,
      snapTreshhold: 5
    }
  },
  mixins: [AligmentGuides],
  methods: {
    stopDragging(event) {
      console.log('dragging STOP')
      debugger
      this.bus.dragging.value.stroke = null
      this.bus.dragging.value.fill = null
      this.bus.dragging = null
      
    },
    dragElement(event) {
      if (this.bus.dragging) {

        this.bus.dragging.value.x += event.pageX - this.bus.startX
        this.bus.startX = event.pageX
        this.bus.dragging.value.y += event.pageY - this.bus.startY
        this.bus.startY = event.pageY

        this.snap({ axis: 'x'});
        this.snap({ axis: 'y'});
//         var _this = this

//         this.edges['x'].forEach(function(edge) {
//           console.log(Math.abs(_this.bus.dragging.value.x - edge))
//           if (Math.abs(_this.bus.dragging.value.x - edge) <= 5) {
//             _this.bus.dragging.value.x = edge
//           }
          
          
//         })

//         this.edges['y'].forEach(function(edge) {
//           // if (Math.abs(_this.bus.dragging.value.y - edge) <= 10) {
//           //   _this.bus.dragging.value.y = edge
//           // }
//         })
      }
    },
    snap(options) {
      var _this = this
      var rect = _this.bus.dragging.value
      var axis = options.axis
      var side = axis === 'x' ? 'width' : 'height';
      //var start = axis === 'x' ? 'left' : 'top';
      //var end = axis === 'x' ? 'right' : 'bottom';
      
      
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
  }
}
</script>

<style>
</style>
