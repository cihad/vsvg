import Vrect from "../components/Vrect"

export default {
  data() {
    return {
      edges: this.getSvgEdges()
    }
  },

  methods: {
    getEdgesOfRect(rectObj) {
      return [
        [rectObj.x, rectObj.x+rectObj.width/2, rectObj.x+rectObj.width],
        [rectObj.y, rectObj.y+rectObj.height/2, rectObj.y+rectObj.height]
      ]
    },
    getSvgEdges() {
      return [
        [0, this.width/2, this.width],
        [0, this.height/2, this.height],
      ]
    },
  },
  computed: {
    updateEdges() {
      var svgEdges = this.getSvgEdges(),
          _this = this

      this.value.forEach(function(rect) {
        _this.edges[0].push(..._this.getEdgesOfRect(rect)[0])
        _this.edges[1].push(..._this.getEdgesOfRect(rect)[1])
      })
    }
  },
  watch: {
    elements: {
      handler: this.updateEdges,
      deep: true
    }
  },
  mounted() {
    this.updateEdges
  }
}