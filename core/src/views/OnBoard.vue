<template>
  <div id="app">
    <notifications group="notifications" />
    <NavBar selected="onboard"/>
    <h5>Please provide eth address for a new tenant</h5>
    <input class="mdl-textfield__input" type="text" id="address" v-model="address">
    <button @click="onboard()" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
      Add
    </button>
  </div>
</template>

<script>
import NavBar from '../components/NavBar.vue'
import Blockchain from '../Blockchain.js'

export default {
  name: 'app',
  data () {
    return {
      address: ""
    }
  },
  components: {
    NavBar,
  },
  methods: {
    onboard () {
      Blockchain.onboard(this.address)
      this.$notify({
        group: 'notifications',
        title: 'Onboarding transaction',
        text: 'Please sign your transaction to onboard new tenant'
      });
    }
  }
}
</script>

<style scoped>
  * {
    text-align: center;
  }

  h5,input,button {
    margin-top: 100px;
  }

</style>
