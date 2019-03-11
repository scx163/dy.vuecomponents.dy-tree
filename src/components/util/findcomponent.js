export default {
  methods: {
    /** 向上查找 **/
    findFatherComp(componentName) {
      var parent = this.$parent || this.$root
      var name = parent.$options.componentName
      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent
        if (parent) {
          name = parent.$options.componentName
        }
      }
      if (parent) {
        return parent
      }
    }
  }
}
