import '../style/row.css'
export default {

  name: 'DyRow',

  componentName: 'DyRow', // 自定义属性(该属性不是component必需属性)，重要，用于后面<dy-col>不断向父级查找该组件

  props: {
    tag: {// 自定义元素标签----组件渲染成html的实际标签，默认是div
      type: String,
      default: 'div'
    },
    gutter: Number, // 栅格间隔----该组件的里面的<dy-col>组件的间隔
    /* 组件是否是flex布局，将 type 属性赋值为 'flex'，可以启用 flex 布局，
    *并可通过 justify 属性来指定 start, center, end, space-between, space-around
    *其中的值来定义子元素的排版方式*/
    type: String,
    justify: {
      type: String,
      default: 'start'
    },
    align: {
      type: String,
      default: 'top'
    }
  },

  computed: {
    // row的左右margin，用于抵消col的padding
    // 此处为计算属性，这里通过gutter计算出实际margin
    style() {
      const ret = {}

      if (this.gutter) {
        ret.marginLeft = `-${this.gutter / 2}px`
        ret.marginRight = ret.marginLeft
      }

      return ret
    }
  },

  render(h) {
    /** *
     * 渲染函数--h作为createElement内置函数-->参数tag，类型：String/Object/Function，！！标签名，说明：一个HTML标签，组件类型,或一个函数
                                               Data，类型：Object，！！属性键值对，（可选），说明：一个对应属性的数据对象,用于向创建的节点对象设置属性值
                                               Children，类型：String/Array，（可选），说明：子节点
     ****/
    return h(this.tag,
      {
        class: [
          'dy-row',
          this.justify !== 'start' ? `is-justify-${this.justify}` : '', // es6模板字符串语法
          this.align !== 'top' ? `is-align-${this.align}` : '',
          { 'dy-row--flex': this.type === 'flex' }
        ],
        style: this.style
      },
      this.$slots.default)// this.$slots.default-->不具名的slot内容，也就是[VNode1,VNode2…]数组
    /* slots函数
     *用来访问被 slot 分发的内容。每个具名 slot 有其相应的属性（例如：slot="foo" 中的内容将会在
     *vm.$slots.foo 中被找到）。default 属性包括了所有没有被包含在一个具名 slot 中的节点。
     *在使用 render 函数书写一个组件时，访问 vm.$slots 最有帮助。
     * **/
  }
}
