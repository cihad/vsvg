<template>
  <circle
    r="5"
    :cx="value[0]"
    :cy="value[1]"
    @mousedown.prevent.stop="onPointMouseDown"
    :style="{ cursor: cursors[name] + '-resize' }" />
</template>

<script>

export default {
  props: ['value', 'rect', 'name'],
  data () {
    return {
      startPoints: { x: 0, y: 0 },
      cursors: {
        lt: 'nw',
        rt: 'ne',
        rb: 'se',
        lb: 'sw'
      }
    }
  },
  methods: {
    onPointMouseDown(event) {
      this.startPoints.x = event.pageX
      this.startPoints.y = event.pageY

      this.box = Object.assign({}, this.rect);

      document.addEventListener('mousemove', this.resize);
      document.addEventListener('mouseup', this.done);
    },
    resize(event) {
      var diffX = event.pageX - this.startPoints.x,
          diffY = event.pageY - this.startPoints.y

      switch(this.name) {
        case 'rb':
          this.rect.width = this.box.width + diffX
          this.rect.height = this.box.height + diffY
          break
        case 'rt':
          this.rect.width = this.box.width + diffX
          this.rect.y = this.box.y + diffY
          this.rect.height = this.box.height - diffY
          break
        case 'lb':
          this.rect.width = this.box.width - diffX
          this.rect.x = this.box.x + this.box.width - this.rect.width
          this.rect.height = this.box.height + diffY
          break
        case 'lt':
          this.rect.width = this.box.width - diffX
          this.rect.x = this.box.x + this.box.width - this.rect.width
          this.rect.height = this.box.height - diffY
          this.rect.y = this.box.y + this.box.height - this.rect.height
          break
      }

    },
    done(e) {
      document.removeEventListener('mousemove', this.resize)      
    }
  },
  beforeDestroy() {
    document.removeEventListener('mousemove', this.resize);
  }
}
</script>

<style>
</style>
