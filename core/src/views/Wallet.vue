<template>
  <div id="app">
    <notifications group="notifications" />
    <NavBar selected="wallet"/>
    <!-- <div id="p3" v-if="JSON.stringify(state.history) == '{}'" class="mdl-progress mdl-js-progress mdl-progress__indeterminate"></div> -->
    <Wallet v-bind:currentPeriod="currentPeriod" />
    <QuestionModalDialog />
  </div>
</template>

<script>
import NavBar from '../components/NavBar.vue'
import Wallet from '../components/Wallet.vue'
import QuestionModalDialog from '../components/QuestionModalDialog.vue'
import Blockchain from '../Blockchain.js'
import State from '../State.js'

export default {
  name: 'app',
  data () {
    return {
      state: State.state
    }
  },
  components: {
    Wallet,
    NavBar,
    QuestionModalDialog
  },
  asyncComputed: {
    async currentPeriod () {
      return await Blockchain.getCurrentPeriod()
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Rubik:300,400,500,700');

body {
color: #497C99 !important;
}

h1, h2, h3, h4 {
font-weight: 500;
color: #184E6D !important;
}

#p3 {
  width: 100vw;
}
</style>
