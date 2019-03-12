<template>
    <div class="container">
      <dy-row>
        <dy-col :span="12">
          <vue-tree
            :tree-data="treeData"
            v-model="ids"
            :options="options"
            @handle="handle"
          />
        </dy-col>
        <dy-col :span="12">
          <p class="lead">设置</p>
          <div class="form-group">
            <div class="checkbox">
              <label>
                <input type="checkbox" v-model="options.checkbox"> 显示复选框
              </label>
            </div>
            <div class="checkbox">
              <label>
                <input type="checkbox" v-model="options.checkedOpen"> 已选择是否展开
              </label>
            </div>
            <div class="checkbox">
              <label>
                <input type="checkbox" v-model="options.folderBold"> 目录加粗
              </label>
            </div>
            <div class="checkbox">
              <label>
                <input type="checkbox" v-model="options.idsWithParent"> 复选是否包含目录
              </label>
            </div>
          </div>
          <div class="form-group">
              <label>初始展开层级</label>
              <input type="number" class="form-control" v-model="options.depthOpen" disabled>
          </div>
          <h3>Events</h3>
          <p>单击节点名称触发<code>handle</code>事件</p>
          <p v-for="item in message"><pre v-html="item"></pre></p>
          <h3>Checked ids</h3>
          <p>{{ids}}</p>
          <h3>Options</h3>
          <p>{{options}}</p>
        </dy-col>
      </dy-row>
    </div>
</template>

<script>
import vueTree from '../components/tree'
export default {
  name: 'home',
  components: { vueTree },
  data: function() {
    return {
      ids: [],
      options: {
        indexname: 'indexcode', // 节点名称字段
        indexadddataname: ['label'], // 添加至多选框选择的附加數據（多选变对象）
        childnodename: 'dc',
        checkbox: true, // 是否启用选择框
        checkedOpen: true, // 选中时是否展开节点
        folderBold: true, // 目录是否加粗显示
        idsWithParent: false, // v-model数据是否包含目录,如果只获取叶子节点设置为false
        depthOpen: 2, // 初始化时展开层级，根节点为0
        openIcon: 'fa fa-angle-right', // 展开按钮图标
        closeIcon: 'fa fa-angle-down', // 收缩按钮图标
        halfCheckedIcon: 'fa fa-minus-square-o fa-fw', // 选择框半选中图标
        checkedIcon: 'fa fa-check-square-o fa-fw', // 选择框选中图标
        uncheckedIcon: 'fa fa-square-o fa-fw' // 选择框未选中图标
      },
      message: [],
      treeData: [{
        label: '根目录[1]',
        indexcode: '1',
        dc: [
          {
            label: '一级节点[4]',
            indexcode: '4',
            dc: [
              {
                label: '二级节点[5]',
                indexcode: '5',
                dc: [
                  { label: '三级节点[6]', indexcode: '6' },
                  { label: '三级节点[8]', indexcode: '8' },
                  { label: '三级节点[30]', indexcode: '30' },
                  {
                    label: '三级节点[31]',
                    indexcode: 31,
                    dc: [
                      { label: '四级节点[36]', indexcode: 36 },
                      { label: '四级节点[38]', indexcode: 38 },
                      { label: '四级节点[39]', indexcode: 39 },
                      { label: '四级节点[48]', indexcode: 48 }
                    ]
                  }
                ]
              },
              { label: '二级节点[9]', indexcode: 9 },
              { label: '二级节点[10]', indexcode: 10 },
              {
                label: '二级节点[11]',
                indexcode: 11,
                dc: [
                  { label: '三级节点[12]', indexcode: 12 },
                  { label: '三级节点[13]', indexcode: 13 },
                  {
                    label: '三级节点[14]',
                    indexcode: 14,
                    dc: [
                      { label: '四级节点[15]', indexcode: 15 },
                      { label: '四级节点[16]', indexcode: 16 },
                      { label: '四级节点[17]', indexcode: 17 },
                      { label: '四级节点[18]', indexcode: 18 },
                      {
                        label: '四级节点[19]',
                        indexcode: 19,
                        dc: [
                          { label: '五级节点[20]', indexcode: 20 },
                          { label: '五级节点[21]', indexcode: 21 },
                          { label: '五级节点[22]', indexcode: 22 },
                          { label: '五级节点[23]', indexcode: 23 },
                          { label: '五级节点[24]', indexcode: 24 }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          { label: '一级节点[2]', indexcode: 2 },
          {
            label: '一级节点[59]',
            indexcode: 59,
            dc: [
              { label: '二级节点[60]', indexcode: 60 },
              { label: '二级节点[61]', indexcode: 61 },
              { label: '二级节点[62]', indexcode: 62 },
              { label: '二级节点[63]', indexcode: 63 },
              { label: '二级节点[64]', indexcode: 64 }
            ]
          },
          { label: '一级节点[3]', indexcode: 3 }
        ]
      },
      {
        label: '根目录[99]',
        indexcode: 99,
        children: [
          { label: '二级节点[70]', indexcode: 70 },
          { label: '二级节点[71]', indexcode: 71 },
          { label: '二级节点[72]', indexcode: 72 },
          { label: '二级节点[73]', indexcode: 73 },
          {
            label: '二级节点[74]',
            indexcode: 74,
            children: [
              { label: '三级节点[82]', indexcode: 82 },
              { label: '三级节点[83]', indexcode: 83 }
            ]
          }
        ]
      }]
    }
  },
  methods: {
    handle(item) {
      this.message.push(`节点 ${JSON.stringify(item)} 作为事件参数传递`)
    },
    loadNode() {
      alert(111111)
    }
  }
}
</script>