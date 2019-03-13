<template>
    <div class="wrapper">
        <!-- top navbar-->
        <Header />
        <!-- Main section-->
        <section class="section-container">
            <!-- Page content-->
            <router-view/>
        </section>
    </div>
</template>

<script>
import Vue from 'vue'
import Header from './Header'
import { mapMutations } from 'vuex'
import ContentWrapper from './ContentWrapper'

Vue.component('ContentWrapper', ContentWrapper)
export default {
  name: 'Layout',
  components: {
    Header
  },
  created() {
    this.changeSetting({ name: 'horizontal', value: true })
  },
  destroyed() {
    this.changeSetting({ name: 'horizontal', value: false })
  },
  methods: {
    ...mapMutations([
      'changeSetting'
    ])
  }
}
</script>