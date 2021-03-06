import Vue from 'vue';

export const EventBus = new Vue({
  data() {
    return {
      dragging: null,
      selected: null
    }
  },
  methods: {
    stopDragging() {
      if (this.dragging) {
        delete this.dragging.value.stroke
        delete this.dragging.value.fill
        this.dragging.$emit('input', this.dragging.value)
        this.dragging = null
      }
    }
  }

})
