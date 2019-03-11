<template>
    <header>
        <!-- START Top Navbar-->
        <nav class="navbar topnavbar">
            <!-- START navbar header-->
            <div class="navbar-header">
                <a class="navbar-brand" href="#/">
                    <div class="brand-logo">
                        <img class="img-fluid logo" src="@/styles/img/logo.png" alt="App Logo">
                    </div>
                    <div class="brand-logo-collapsed">
                        <img class="img-fluid" src="@/styles/img/logo.png" alt="App Logo">
                    </div>
                </a>
            </div>
            <!-- END navbar header-->
        </nav>
        <!-- END Top Navbar-->
    </header>
</template>

<script>
    import { mapMutations } from 'vuex'

    export default {
      name: 'Header',
      components: {
      },
      methods: {
        /**
             * Triggers a window resize event when clicked
             * for plugins that needs to be redrawed
             */
        resize: e => {
          // all IE friendly dispatchEvent
          var evt = document.createEvent('UIEvents')
          evt.initUIEvent('resize', true, false, window, 0)
          window.dispatchEvent(evt)
          // modern dispatchEvent way
          // window.dispatchEvent(new Event('resize'));
        },
        ...mapMutations([
          'toggleSetting'
        ]),
        toggleOffsidebar() {
          this.toggleSetting('offsidebarOpen')
        },
        toggleOffcanvas() {
          this.toggleSetting('asideToggled')
        },
        toggleAsideCollapsed() {
          this.toggleSetting('isCollapsed')
          this.resize()
        },
        toggleUserBlock() {
          this.toggleSetting('showUserBlock')
        }
      }
    }
</script>

<style lang="scss" scoped>
</style>