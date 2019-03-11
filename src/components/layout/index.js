import Layout_col from './src/col'
import Layout_row from './src/row'

const Layout = {
  install: function(Vue) {
    Vue.component(Layout_col.name, Layout_col)
    Vue.component(Layout_row.name, Layout_row)
  }
}

export default Layout
