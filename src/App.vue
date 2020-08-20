<template>
  <div id="app">
    <router-view></router-view>
    <Footer v-show="this.$store.state.showFooter"></Footer>
  </div>
</template>

<script>
import Footer from '@/components/Footer'
export default {
  name: 'App',
  components: {
    Footer
  },
}
</script>

<style>

  html, body {
    height: 100%;
  }
</style>
