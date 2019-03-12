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
    import Header from './Header'
    import { mapMutations } from 'vuex'
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