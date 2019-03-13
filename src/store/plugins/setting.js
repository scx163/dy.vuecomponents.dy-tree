
// Helpers to change class attribute
const updateElementClass = (el, stat, name) => el && el.classList[stat ? 'add' : 'remove'](name)
const updateBodyClass = (stat, name) => updateElementClass(document.body, stat, name)

/*
    When a setting value is changed, detect its value and add/remove
    a classname related with that setting from the target element
*/
const updateClasses = state => {
  // layout horizontal
  updateBodyClass(state.setting.horizontal, 'layout-h')
}

/*
    Hook into setting changes in order to change layout.
*/
const SettingPlugin = store => {
  // wait for dom ready
  document.addEventListener('DOMContentLoaded', () => updateClasses(store.state))

  store.subscribe((mutation, state) => {
    if (mutation.type === 'changeSetting' || mutation.type === 'toggleSetting') {
      updateClasses(state)
    }
  })
}

export default SettingPlugin
