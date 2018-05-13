import points from '../../mixins/points'

export default {
  cursor: 'sw',
  mixins: [points],
  methods: {
    calc(event) {
      this.rect.width = this.box.width - this.diffX
      this.rect.x = this.box.x + this.box.width - this.rect.width
      this.rect.height = this.box.height + this.diffY
    }
  }
}