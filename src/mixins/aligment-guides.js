import Vrect from "../components/Vrect"

export default {
  data() {
    return {
      edges: null
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
      [
        [0, this.width/2, this.width],
        [0, this.height/2, this.height],
      ]
    },
  },
  computed: {
    updateEdges() {
      var svgEdges = this.getSvgEdges()

      this.elements.forEach(function(rect) {
        this.edges[0].push(...this.getEdgesOfRect(rect)[0])
        this.edges[1].push(...this.getEdgesOfRect(rect)[1])
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
    debugger
    console.log(this.$slots.default)
  }
}