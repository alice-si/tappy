<template>
  <div id="app">
    <NavBar selected=""/>
    <h1>Page not found :(</h1>
  </div>
</template>

<script>
import NavBar from '../components/NavBar.vue'

export default {
  name: 'app',
  components: {
    NavBar
  }
}
</script>

<style scoped>
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
} */
</style>
