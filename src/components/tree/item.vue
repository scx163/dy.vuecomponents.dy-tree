<template>
  <li class="vue-tree-item">
    <div class="item-wrapper" onselectstart="return false;">
      <span
        v-if="isFolder"
        class="item-toggle"
        @click="toggle"
      >
        <i :class="[toggleIcon]"></i>
      </span>
      <span
        v-else
        class="item-toggle"
      />
      <span
        v-if="options.checkbox"
        class="item-checkbox"
        :class="[labelIcon, labelStatus]"
        @click="toggleChecked"
      />
      <span
        class="item-label"
        :class="isBold"
        @click="fixClickPack(handle)"
        @dblclick="fixDbclickPack(toggle)"
      >
      <node-content :node="model"></node-content>
      </span>
    </div>
    <ul v-if="isFolder" v-show="open" class="vue-tree-list">
      <tree-item
        v-for="(item, idx) in model[options.childnodename]"
        :model="item"
        :options="options"
        :ids="ids"
        :depth="depth + 1"
        :ids-with-parent="idsWithParent"
        :half="half"
        :state="itemState"
        :key="idx"
        @handle="emitHandle"
        @child-change="childChange"
      >
    </tree-item>
    </ul>
  </li>
</template>
<script>
import fixDbclick2ClickEvent from '../util/fixDbclick2ClickEvent.js'
import findcomponent from '../util/findcomponent.js'

export default {
  name: 'tree-item',
  mixins: [fixDbclick2ClickEvent, findcomponent],
  components: {
    NodeContent: {
      props: {
        node: {
          required: true
        }
      },
      render(h) {
        const tree = this.$parent.findFatherComp('vueTree')
        const node = this.node
        return (
          tree.$scopedSlots.default
            ? tree.$scopedSlots.default({ node })
            : <span>{ node.label }</span>
        )
      }
    }
  },
  props: {
    model: {
      type: Object,
      default: function() {
        return {}
      }
    },
    options: {
      type: Object,
      default: function() {
        return {}
      }
    },
    depth: {
      type: Number,
      default: 0
    },
    ids: {
      type: Array,
      default: function() {
        return []
      }
    },
    idsWithParent: {
      type: Array,
      default: function() {
        return []
      }
    },
    half: {
      type: Array,
      default: function() {
        return []
      }
    },
    state: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      open: false,
      itemState: 0
    }
  },
  computed: {
    toggleIcon() {
      return this.open ? this.options.closeIcon : this.options.openIcon
    },
    labelIcon() {
      const t = this.mergedata(this.model)
      if (this.findtarget(this.half, t)) {
        return this.options.halfCheckedIcon
      } else if (this.findtarget(this.idsWithParent, t)) {
        return this.options.checkedIcon
      } else {
        return this.options.uncheckedIcon
      }
    },
    labelStatus() {
      const t = this.mergedata(this.model)
      if (this.findtarget(this.half, t)) {
        return 'half-checked'
      } else if (this.findtarget(this.idsWithParent, t)) {
        return 'checked'
      } else {
        return 'unchecked'
      }
    },
    isFolder() {
      return this.model[this.options.childnodename]
    },
    isBold() {
      return {
        'item-bold': this.isFolder && this.options.folderBold
      }
    },
    self() {
      const self = Object.assign({}, this.model, { children: [] })
      delete self.children
      return self
    }
  },
  created() {
    if (this.isFolder && this.depth < this.options.depthOpen) {
      this.open = true
    }
    if (this.options.checkbox) {
      const t = this.mergedata(this.model)
      if (this.findtarget(this.idsWithParent, t)) {
        this.itemState = this.itemState + 1
        if (this.isFolder && !this.options.idsWithParent) {
          if (this.findtarget(this.ids, t)) {
            this.delettarget(this.ids, t)
          }
        }
        this.$emit('child-change', true)
      }
      if (this.state > 0) {
        this.addChecked()
        this.itemState = this.itemState + 1
      }
    }
  },
  watch: {
    state(val, old) {
      if (val > old) {
        this.addChecked()
        this.itemState = this.itemState + 1
      } else {
        this.delChecked()
        this.deleteHalfChecked(this.model[this.options.indexname])
        this.itemState = this.itemState - 1
      }
    }
  },
  methods: {
    findtarget(array, target) {
      const _this = this
      let r = false
      if (!array || array.length < 0) { return false }
      if (this.options.indexadddataname && this.options.indexadddataname.length > 0) {
        array.forEach(function(item) {
          if (item[_this.options.indexname] === target[_this.options.indexname]) { r = true }
        })
      } else {
        if (array.indexOf(target) !== -1) { r = true }
      }
      return r
    },
    delettarget(array, target) {
      const _this = this
      if (!array || array.length < 0) { return false }
      if (this.options.indexadddataname && this.options.indexadddataname.length > 0) {
        array.forEach(function(item, index) {
          if (item[_this.options.indexname] === target[_this.options.indexname]) { array.splice(index, 1) }
        })
      } else {
        const index = array.indexOf(target)
        if (index !== -1) { _this.$delete(array, index) }
      }
    },
    mergedata(node) {
      let t = null
      if (this.options.indexadddataname && this.options.indexadddataname.length > 0) {
        t = {}
        t[this.options.indexname] = node[this.options.indexname]
        this.options.indexadddataname.forEach(item => {
          t[item] = node[item]
        })
      } else {
        t = node[this.options.indexname]
      }
      return t
    },
    toggle() {
      if (this.isFolder) {
        const tree = this.findFatherComp('vueTree')
        if (this.open === false && this.model[this.options.childnodename] === true && tree.load) {
          tree.load(this.model)
        }
        this.open = !this.open
      }
    },
    handle() {
      this.emitHandle(this.self)
    },
    emitHandle(item) {
      this.$emit('handle', item)
    },
    toggleChecked() {
      const t = this.mergedata(this.model)
      if (this.isFolder) {
        this.deleteHalfChecked()
      }
      if (this.findtarget(this.idsWithParent, t)) {
        this.delChecked()
        this.$emit('child-change', false)
        this.itemState = this.itemState - 1
      } else {
        this.addChecked()
        this.$emit('child-change', true)
        if (this.options.checkedOpen && this.isFolder) {
          this.open = true
        }
        this.itemState = this.itemState + 1
      }
    },
    addChecked() {
      const t = this.mergedata(this.model)
      if (!this.findtarget(this.idsWithParent, t)) {
        this.$set(this.idsWithParent, this.idsWithParent.length, t)
      }
      if (!this.isFolder || this.options.idsWithParent) {
        if (!this.findtarget(this.ids, t)) {
          this.$set(this.ids, this.ids.length, this.mergedata(this.model))
        }
      }
    },
    delChecked() {
      const t = this.mergedata(this.model)
      if (this.findtarget(this.idsWithParent, t)) {
        this.delettarget(this.idsWithParent, t)
      }
      if (this.findtarget(this.ids, t)) {
        this.delettarget(this.ids, t)
        console.log(this.ids)
      }
    },
    setHalfChecked() {
      const t = this.mergedata(this.model)
      if (!this.findtarget(this.half, t)) {
        this.$set(this.half, this.half.length, t)
      }
    },
    deleteHalfChecked() {
      const t = this.mergedata(this.model)
      if (this.findtarget(this.half, t)) {
        this.delettarget(this.half, t)
      }
    },
    childChange(checked) {
      if (this.model[this.options.childnodename].some((val) => this.findtarget(this.half, this.mergedata(val)))) {
        this.addChecked()
        this.setHalfChecked()
        this.$emit('child-change', true)
        return
      }
      if (checked) {
        this.addChecked()
        if (this.model[this.options.childnodename].some((val) => this.findtarget(this.idsWithParent, this.mergedata(val)))) {
          this.setHalfChecked()
        } else {
          this.deleteHalfChecked()
        }
        this.$emit('child-change', true)
      } else {
        if (this.model[this.options.childnodename].some((val) => this.findtarget(this.idsWithParent, this.mergedata(val)))) {
          this.setHalfChecked()
        } else {
          this.deleteHalfChecked()
          this.delChecked()
        }
        this.$emit('child-change', false)
      }
    }
  }
}
</script>
