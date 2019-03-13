import Vue from 'vue'
import Vuex from 'vuex'

import SettingModule from './modules/setting.js'
import SettingPlugin from './plugins/setting.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    setting: SettingModule
  },
  plugins: [
    SettingPlugin
  ]
})
