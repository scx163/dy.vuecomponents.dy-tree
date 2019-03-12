作者： DY**
使用：**

 1. 依赖包：font-awesome图标库（可切换其他图标库）
 2. 使用方式：

    <vue-tree :tree-data="treeData" v-model="ids" :options="options" @handle="handle">
        ...设置结点样式
    </vue-tree>

 3. 选项配置：

    /*** 树形结构数据 ***/
    treeData：[
        {
            label: '目录结点', //结点内容
            id: 1,
            children: [...]
        },{}...
    ]
    /*** 绑定存储多选框选择的ids ***/
    v-model：[]
    /*** 配置文件 ***/
    options: {
        indexname: 'id', // 结点名称字段
        indexadddataname: [], // 添加至多选框选择的附加數據（多选变对象）
        childnodename: 'children', // 结点子字段名称
        checkbox: true, // 是否启用选择框
        checkedOpen: true, // 选中时是否展开节点
        folderBold: true, // 目录是否加粗显示
        idsWithParent: true, // v-model数据是否包含目录,如果只获取叶子节点设置为false
        depthOpen: 2, // 初始化时展开层级，根节点为0
        openIcon: 'fa fa-angle-right', // 展开按钮图标
        closeIcon: 'fa fa-angle-down', // 收缩按钮图标
        halfCheckedIcon: 'fa fa-minus-square-o fa-fw', // 选择框半选中图标
        checkedIcon: 'fa fa-check-square-o fa-fw', // 选择框选中图标
        uncheckedIcon: 'fa fa-square-o fa-fw' // 选择框未选中图标
    }