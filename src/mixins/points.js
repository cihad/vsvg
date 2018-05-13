export default {
  props: ['value', 'rect'],
  data () {
    return {
      startPoints: { x: 0, y: 0 },
      diffX: 0,
      diffY: 0
    }
  },
  template: `
    <circle
      r="5"
      :cx="value[0]"
      :cy="value[1]"
      @mousedown.prevent.stop="onPointMouseDown"
      :style="{cursor: $options.cursor + '-resize', fill: '#0080FF' }" />`,
  methods: {
    onPointMouseDown(event) {
      document.getElementsByTagName("body")[0].style.cursor = this.$options.cursor + "-resize"
      this.$parent.$data.isSelected = true
      this.startPoints.x = event.pageX
      this.startPoints.y = event.pageY

      this.box = Object.assign({}, this.rect);

      document.addEventListener('mousemove', this.resize);
      document.addEventListener('mouseup', this.done);
    },
    resize(event) {
      this.diffX = event.pageX - this.startPoints.x,
      this.diffY = event.pageY - this.startPoints.y

      this.calc(event)
    },
    done(e) {
      document.getElementsByTagName("body")[0].style.cursor = "auto"
      document.removeEventListener('mousemove', this.resize)      
    }
  },
  beforeDestroy() {
    document.removeEventListener('mousemove', this.resize);
  }
}