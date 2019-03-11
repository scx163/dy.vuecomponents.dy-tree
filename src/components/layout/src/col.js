import '../style/col.css'
export default {
  name: 'DyCol',

  props: {
    span: { // 控制col在父元素中占的比例
      type: Number,
      default: 24
    },
    tag: { // 自定义渲染的标签
      type: String,
      default: 'div'
    },
    offset: Number, // 栅格左侧的间隔格数
    pull: Number, // 栅格向右移动格数
    push: Number, // 栅格向左移动格数
    xs: [Number, Object], // <768px 响应式栅格数或者栅格属性对象
    sm: [Number, Object],
    md: [Number, Object],
    lg: [Number, Object],
    xl: [Number, Object]
  },

  computed: {
    gutter() {
      let parent = this.$parent
      while (parent && parent.$options.componentName !== 'DYRow') {
        parent = parent.$parent
      }
      return parent ? parent.gutter : 0
    }
  },
  render(h) {
    const classList = []
    const style = {}

    if (this.gutter) {
      style.paddingLeft = this.gutter / 2 + 'px'
      style.paddingRight = style.paddingLeft
    }

    // 这里逻辑是通过比对props对象,生成对应的CSS规则
    ['span', 'offset', 'pull', 'push'].forEach(prop => {
      if (this[prop] || this[prop] === 0) {
        classList.push(
          prop !== 'span'
            ? `dy-col-${prop}-${this[prop]}`
            : `dy-col-${this[prop]}`
        )
      }
    });

    // 这里分为传入对象以及数字两种情况
    ['xs', 'sm', 'md', 'lg', 'xl'].forEach(size => {
      if (typeof this[size] === 'number') {
        classList.push(`dy-col-${size}-${this[size]}`)
      } else if (typeof this[size] === 'object') {
        const props = this[size]
        Object.keys(props).forEach(prop => {
          classList.push(
            prop !== 'span'
              ? `dy-col-${size}-${prop}-${props[prop]}`
              : `dy-col-${size}-${props[prop]}`
          )
        })
      }
    })

    return h(this.tag, {
      class: ['dy-col', classList], // 属性
      style
    }, this.$slots.default)
  }
}
