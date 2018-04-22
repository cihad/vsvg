import Vue from 'vue';

export const EventBus = new Vue({
  data() {
    return {
      dragging: null
    }
  },
  methods: {
    stopDragging() {
      if (this.dragging) {
        delete this.dragging.value.stroke
        delete this.dragging.value.fill
        this.dragging = null
      }
    }
  }

})
