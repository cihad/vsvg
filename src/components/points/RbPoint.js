import points from '../../mixins/points'

export default {
  cursor: 'se',
  mixins: [points],
  methods: {
    calc(event) {
      this.rect.width = this.box.width + this.diffX
      this.rect.height = this.box.height + this.diffY
    }
  }
}