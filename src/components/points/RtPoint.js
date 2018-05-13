import points from '../../mixins/points'

export default {
  cursor: 'ne',
  mixins: [points],
  methods: {
    calc(event) {
      this.rect.width = this.box.width + this.diffX
      this.rect.y = this.box.y + this.diffY
      this.rect.height = this.box.height - this.diffY
    }
  }
}