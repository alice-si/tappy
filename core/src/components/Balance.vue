<template>
  <div id="balance-container">
    <h2>{{ balance }}</h2>
    <p>Contract balance</p>
  </div>
</template>

<script>

import State from '../State'

export default {
  name: "Balance",
  data () {
    return {
      state: State.state,
    }
  },
  computed: {
    // TODO maybe move it to data
    balance () {
      return this.state.balance
    }
  },
};
</script>

<style>

  #balance-container {
    text-align: center;
    margin: auto;

    max-width: 200px;
    border-radius: 10px;
    background: #1c587a;
    color: white;
  }

  h2 {
    padding-top: 20px;
    margin-bottom: -2px;
  }

  p {
    padding-bottom: 20px;
  }

</style>
