<template>
  <g stroke-width="1">
    <g stroke="#ccc">
      <line :x1="position"
            :y1="0"
            :x2="position"
            :y2="$parent.height"
            v-show="showEdge"
            v-for="position in edges['x']" />
      <line :x1="0"
            :y1="position"
            :x2="$parent.width"
            :y2="position"
            v-show="showEdge"
            v-for="position in edges['y']" />
    </g>

    <g stroke="hsl(205,100%,75%)">
      <line :x1="position"
            :y1="0"
            :x2="position"
            :y2="$parent.height"
            v-for="position in guides['x']" />
      <line :x1="0"
            :y1="position"
            :x2="$parent.width"
            :y2="position"
            v-for="position in guides['y']" />
    </g>
  </g>
</template>

<script>
import { EventBus } from '../mixins/event-bus'

export default {
  name: 'aligment-guides',
  props: {
    value: {
      type: Array
    },
    showEdge: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      bus: EventBus,
      snapTreshhold: 5,
      x: null,
      y: null,
      guides: {x: [], y: []}
    }
  },
  mounted: function() {
    this.$parent.$el.addEventListener('mousemove', this.dragElement.bind(this))
    this.$parent.$el.addEventListener('mouseup', this.stopDragging.bind(this))
  },
  methods: {
    getEdgesOfRect(rectObj) {
      return {
        x: [ rectObj.x, rectObj.x+rectObj.width/2, rectObj.x+rectObj.width ],
        y: [ rectObj.y, rectObj.y+rectObj.height/2, rectObj.y+rectObj.height ]
      }
    },
    getEdgesOfText(textComp) {
      return {
        x: [ textComp.value.x, textComp.value.x+Math.round(textComp.width/2), textComp.value.x+Math.round(textComp.width) ],
        y: [ textComp.value.y+Math.round(textComp.ascentHeight), textComp.value.y ]
      }
    },
    getSvgEdges() {
      return {
        x: [ 0, this.$parent.width/2, parseInt(this.$parent.width) ],
        y: [ 0, this.$parent.height/2, parseInt(this.$parent.height) ]
      }
    },
    offset(el) {
      var rect = el.getBoundingClientRect();

      return {
        top: rect.top + document.body.scrollTop,
        left: rect.left + document.body.scrollLeft
      }
    },
    stopDragging(event) {
      this.bus.stopDragging()
      this.removeGuides()
    },
    dragElement(event) {
      if (this.bus.dragging) {
        if (this.bus.dragging.$options.name == 'vforeign') {
          this.x = event.pageX - this.offset(this.$parent.$el).left - this.bus.mouseOffsetX
          this.y = event.pageY - this.offset(this.$parent.$el).top - this.bus.mouseOffsetY
          // debugger
        } else {
          this.x = event.offsetX - this.bus.mouseOffsetX
          this.y = event.offsetY - this.bus.mouseOffsetY
        }

        this.removeGuides()

        if (this.bus.dragging.$options.name == 'vtext') {
          this.snapText('x')
          this.snapText('y')
        } else {
          this.snap('x')
          this.snap('y')
        }
        
        this.redraw()
      }
    },
    snap(axis) {
      var _this = this
      var rect = this.bus.dragging.value
      var side = axis === 'x' ? 'width' : 'height'
      var distance = this[axis]
      var halfSideLength = Math.abs(rect[side]/2)
      var center = distance + halfSideLength
      var endDistance = distance + rect[side]

      this.edges[axis].forEach(function(position) {
        var setGuide = false

        if(Math.abs(distance - position) <= _this.snapTreshhold){
          _this[axis] = position;
          setGuide = true
        }
        else if(Math.abs(center - position) <= _this.snapTreshhold){
          _this[axis] = position - halfSideLength;
          setGuide = true
        }
        else if(Math.abs(endDistance - position) <= _this.snapTreshhold){
          _this[axis] = position - rect[side];
          setGuide = true
        }

        if (setGuide) {
          _this.renderGuide(axis, position)
        }
      })
    },
    snapText(axis) {
      var _this = this
      var rect = this.bus.dragging.value
      var side = axis === 'x' ? 'width' : 'height'
      var distance = axis === 'x' ? this[axis] : this[axis]+this.bus.dragging.ascentHeight
      var halfSideLength = Math.abs(this.bus.dragging[side]/2)
      var center = distance + halfSideLength
      var endDistance = axis === 'x' ? distance+this.bus.dragging[side] : this[axis]

      this.edges[axis].forEach(function(position) {
        var setGuide = false

        if(Math.abs(distance - position) <= _this.snapTreshhold) {
          _this[axis] = axis === 'x' ? position : position - _this.bus.dragging.ascentHeight;
          setGuide = true
        }
        else if(Math.abs(center - position) <= _this.snapTreshhold && axis === 'x') {
          _this[axis] = axis === 'x' ? position - halfSideLength : position + halfSideLength;
          setGuide = true
        }
        else if(Math.abs(endDistance - position) <= _this.snapTreshhold) {
          _this[axis] = axis === 'x' ? position - _this.bus.dragging[side] : position;
          setGuide = true
        }

        if (setGuide) {
          _this.renderGuide(axis, position)
        }
      })
    },
    removeGuides() {
      this.guides = { x: [], y: [] }
    },
    renderGuide(axis, position) {
      this.guides[axis].push(position)
    },
    redraw() {
      var rect = this.bus.dragging.value
      rect.x = this.x
      rect.y = this.y
    }
  },
  computed: {
    edges: function() {
      console.log('EDGES UPDATED')
      var svgEdges = this.getSvgEdges(),
          _this = this,
          elements = null

      if (EventBus.dragging) {
        elements = this.value.filter(function(obj) {
          return EventBus.dragging.value !== obj
        })
      } else {
        elements = this.value
      }

      elements.forEach(function(obj) {
        if (obj.name == 'vtext') {
          var textComp = _this.$parent.$children.find((vueComp) => {
            return vueComp.value == obj
          })
          svgEdges['x'].push(..._this.getEdgesOfText(textComp)['x'])
          svgEdges['y'].push(..._this.getEdgesOfText(textComp)['y'])
        } else {
          svgEdges['x'].push(..._this.getEdgesOfRect(obj)['x'])
          svgEdges['y'].push(..._this.getEdgesOfRect(obj)['y'])
        }
      })

      return svgEdges
    }
  }
}
</script>

<style>
</style>
