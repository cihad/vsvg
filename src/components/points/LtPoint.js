import points from '../../mixins/points'

export default {
  cursor: 'nw',
  mixins: [points],
  methods: {
    calc(event) {
      this.rect.width = this.box.width - this.diffX
      this.rect.x = this.box.x + this.box.width - this.rect.width
      this.rect.height = this.box.height - this.diffY
      this.rect.y = this.box.y + this.box.height - this.rect.height
    }
  }
}