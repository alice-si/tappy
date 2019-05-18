// TODO alex

<template>
  <div class="mdl-grid">
    <div class="mdl-cell mdl-cell--12-col">
      <h3>Transfers</h3>
    </div>
    <div class="
      mdl-cell
      mdl-cell--2-offset-desktop
      mdl-cell--6-col-desktop
      mdl-cell--1-offset-tablet
      mdl-cell--12-col-tablet
      mdl-cell--12-col-phone
      transfers-list">
      <table class="mdl-list">
        <tr id="header-line">
          <td class="header-title">Type</td>
          <td class="header-title">Agent</td>
          <td class="header-title">Value</td>
        </tr>
        <Transfer
          v-for="transfer in transfers"
          v-bind:key="JSON.stringify(transfer)"
          v-bind:details="transfer"
        />
      </table>
    </div>
  </div>
</template>

<script>

import State from '../State.js'
import Transfer from './Transfer'

export default {
  name: "Transfers",
  data () {
    return {
      state: State.state,
    }
  },
  computed: {
    transfers () {
      // Reverse - to see the latest on top
      let res = (JSON.parse(JSON.stringify(this.state.transfers))).reverse();

      // Maybe we should sort them
      // txs.sort(function (tx1, tx2) {
      //   return tx1.period < tx2.period
      // })

      return res
    }
  },

  components: {
    Transfer
  }
};
</script>

<style scoped>
  .transfers-list {
    /* text-align: center; */
    /* margin: auto; */
  }

  #header-line {
    background: #1c587a;
    color: white;
  }

  .header-title {
    padding: 5px;
    border-radius: 3px;
  }


</style>
