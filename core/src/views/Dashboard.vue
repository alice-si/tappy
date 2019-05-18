<template>
  <div id="app">
    <NavBar selected="dashboard"/>
    <div class="mdl-grid">
      <div class="mdl-cell mdl-cell--2-col">
        <Balance />
      </div>
      <div class="mdl-cell mdl-cell--10-col">
        <Transfers id="transfers" />
      </div>
    </div>
  </div>
</template>

<script>

import NavBar from '../components/NavBar.vue'
import Transfers from '../components/Transfers.vue'
import Balance from '../components/Balance'
import State from '../State'

State.startEventListening()

export default {
  name: 'app',
  components: {
    NavBar,
    Transfers,
    Balance
  }
}
</script>

<style scoped>
  * {
    text-align: center;
  }
</style>
