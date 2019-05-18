<template>
    <div id="app">
        <NavBar selected="donate"/>

        <button @click="donate()" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
            DONATE
        </button>

    </div>
</template>

<script>

  import NavBar from '../components/NavBar.vue'

  export default {
    name: 'app',
    components: {
      NavBar
    },
    methods: {
      donate() {
        window.widget.open();
      }
    }
  }
</script>

<style scoped>
    * {
        text-align: center;
    }
</style>
