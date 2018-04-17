import Vrect from "../components/Vrect"
import { EventBus } from '../mixins/event-bus'

export default {
  data() {
    return {
    }
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
        x: [0, this.width/2, parseInt(this.width)],
        y: [0, this.height/2, parseInt(this.height)]
      }
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