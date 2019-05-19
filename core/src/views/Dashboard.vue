<template>
  <div id="app">
    <NavBar selected="dashboard"/>
    <div class="mdl-grid">
      <div class="mdl-cell mdl-cell--2-col">
        <Balance id="balance" :value="state.balance" label="Contract balance" />


        <Balance id="noLoaded" :value="state.noLoaded" label="Meals awarded" />
        <Balance id="noUnloaded" :value="state.noUnloaded" label="Meals claimed" />

        <Balance id="totalLoaded" :value="state.totalLoaded" label="Funds donated" />
        <Balance id="totalUnloaded" :value="state.totalUnloaded" label="Funds spent" />
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
  data () {
    return {
      state: State.state,
    }
  },
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
