// TODO alex

<template>
  <div class="mdl-grid table">
    <div class="mdl-cell mdl-cell--12-col">
      <h3 class="table-title">Transfers</h3>
    </div>
    <div class="transfers-list">
      <table class="mdl-list">
        <tr id="header-line" class="table-column-title">
          <td class="header-title" style="width:300px;" colspan="2">Type</td>
          <td class="header-title">Time</td>

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

  .table {
    background-color: white;
    width: 1000px;
    border: 1px solid rgba(0,0,0,.125);
    border-radius: 4px;
    border-collapse: collapse;
  }

  .table th, td, tr {
    border-bottom: 1px solid #ddd !important;
  }

  .table-title {
    font-size: 1.8rem;
    font-weight: 300;
    line-height: 24px;
  }

  .table-column-title {
    font-size: 1.4rem;
    font-weight: 300;
    line-height: 24px;
    color: #9a9a9a;
  }

  .transfers-list {
    /* text-align: center; */
    /* margin: auto; */
  }


  .header-title {
    padding: 5px;
    width: 15vw;
    border-radius: 3px;
  }

  .header-line {
    border-bottom: 1px solid rgba(0,0,0,.125);
  }


</style>
