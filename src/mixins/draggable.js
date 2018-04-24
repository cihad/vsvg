import { EventBus } from '../mixins/event-bus'

export default {
  mounted() {
    this.$el.addEventListener('mousedown', this.startDragging.bind(this))
  },
  methods: {
    startDragging(event) {
      EventBus.dragging = this
      this.value.fill = "hsl(205,100%,80%)"
      this.value.stroke = "hsl(205,100%,70%)"
      EventBus.startX = event.offsetX
      EventBus.startY = event.offsetY
      EventBus.mouseOffsetX = event.offsetX - this.value.x
      EventBus.mouseOffsetY = event.offsetY - this.value.y
    }
  }
}