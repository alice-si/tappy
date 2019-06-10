<template>
  <div id="app">
    <NavBar selected="dashboard"/>
    <div class="mdl-grid">
      <div class="mdl-cell mdl-cell--2-col">


        <Balance id="noLoaded" :value="state.noLoaded" label="Meals awarded" icon="award-outline" color="#6610f2" suffix="meals"/>
        <Balance id="noUnloaded" :value="state.noUnloaded" label="Meals claimed" icon="car-outline" color="#f17105" suffix="meals"/>

        <Balance id="donated" :value="state.totalDonated" label="Donated" icon="download-outline" color="#1A8FE2" suffix="sDai"/>
        <Balance id="contract" :value="state.balance" label="Funds available on contract" icon="file-text-outline" color="#e6c229" suffix="sDai"/>
        <Balance id="totalLoaded" :value="state.totalOnCards" label="Funds loaded on cards" icon="credit-card-outline" color="#e6c229" suffix="sDai"/>
        <Balance id="totalUnloaded" :value="state.totalUnloaded" label="Funds unloaded" icon="upload-outline" color="#e32f52" suffix="sDai"/>
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

<style>
  body {
    background-color: #F7F7F8;
  }
  * {
    text-align: center;
  }
</style>
