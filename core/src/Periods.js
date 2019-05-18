export default {
  toMonth(period) {
    return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][period % 12];
  },

  toYear(period) {
    return 2019 + Math.floor(period / 12);
  },

  toString(period) {
    return this.toMonth(period) + " " + this.toYear(period);
  }
}
