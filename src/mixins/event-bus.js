export const EventBus = {

  stopDragging() {
    if (this.dragging) {
      delete this.dragging.value.stroke
      delete this.dragging.value.fill
      this.dragging = null
    }
  }

}
