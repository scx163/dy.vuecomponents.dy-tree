<template>
    <div class="wrapper">

        <!-- top navbar-->
        <Header />

        <!-- sidebar-->
        <!-- <Sidebar /> -->

        <!-- Main section-->
        <section class="section-container">
            <!-- Page content-->
            <router-view/>
        </section>
    </div>
</template>

<script>
    import Header from './Header'
    // import Sidebar from './Sidebar'
    // import Offsidebar from './Offsidebar'
    // import Footer from './Footer'

    export default {
      name: 'Layout',
      components: {
        Header
        // Sidebar,
        // Offsidebar,
        // Footer
      }
    }
</script>