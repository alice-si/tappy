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
          <td class="header-title">Time</td>
          <td class="header-title">Agent</td>
          <td class="header-title">Value</td>
        </tr>
        <Transfer
          v-for="transfer in transfers"
          v-bind:key="transfer.timestamp"
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
      let res = this.state.transfers

      // // Maybe we should sort them
      // res.sort(function (tr1, tr2) {
      //   return tr1.timestamp > tr2.timestamp
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
    width: 15vw;
    border-radius: 3px;
  }


</style>
