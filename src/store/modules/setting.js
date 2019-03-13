/**
 * Setting store to control layout behavior
 */
const SettingModule = {
  state: {
    /* Enables layout horizontal */
    horizontal: false
  },
  getters: {
    getSetting(state) {
      return state
    }
  },
  mutations: {
    /**
         * Toggle a setting value (only boolean)
         */
    toggleSetting(state, name) {
      if (name in state) { state[name] = !state[name] }
    },
    /**
         * Change a setting value
         * payload.name: name of the setting prop to change
         * payload.value: new value to apply
         */
    changeSetting(state, { name, value }) {
      if (name in state) { state[name] = value }
    }
  },
  actions: {
  }
}

export default SettingModule
