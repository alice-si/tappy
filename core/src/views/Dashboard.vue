<template>
  <div id="app">
    <NavBar selected="dashboard"/>
    <div class="mdl-grid">
      <div class="mdl-cell mdl-cell--2-col">
        <Balance id="balance" :value="state.balance" label="Contract balance" icon="briefcase-outline" color="#1A8FE2" suffix="sDai"/>


        <Balance id="noLoaded" :value="state.noLoaded" label="Meals awarded" icon="award-outline" color="#6610f2" suffix="meals"/>
        <Balance id="noUnloaded" :value="state.noUnloaded" label="Meals claimed" icon="car-outline" color="#f17105" suffix="meals"/>

        <Balance id="totalLoaded" :value="state.totalLoaded" label="Funds donated" icon="upload-outline" color="#e6c229" suffix="sDai"/>
        <Balance id="totalUnloaded" :value="state.totalUnloaded" label="Funds spent" icon="download-outline" color="#e32f52" suffix="sDai"/>
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
