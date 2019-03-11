export default {
  data() {
    return {
      fixClickEventTimer: null
    }
  },
  methods: {
    fixDbclickPack(fn) {
      this.fixClickEventTimer && clearTimeout(this.fixClickEventTimer)
      fn()
    },
    fixClickPack(fn) {
      this.fixClickEventTimer && clearTimeout(this.fixClickEventTimer)
      this.fixClickEventTimer = setTimeout(fn, 300)
    }
  }
}
