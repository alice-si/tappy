<template>
  <div class="mdl-grid">
    <div class="mdl-cell mdl-cell--12-col">
      <h3>Transaction history</h3>
    </div>
    <div class="
      mdl-cell
      mdl-cell--2-offset-desktop
      mdl-cell--6-col-desktop
      mdl-cell--1-offset-tablet
      mdl-cell--12-col-tablet
      mdl-cell--12-col-phone
      trasnaction-list">
      <table class="mdl-list">
        <Transaction v-if="currentStatus == 'pending'" v-bind:details="{type: 'pending', period: currentPeriod}" />
        <Transaction v-for="transaction in transactions" v-bind:key="transaction.period" v-bind:details="transaction"/>
      </table>
    </div>
  </div>
</template>

<script>
import State from '../State.js'
import Transaction from './Transaction'

State.startHistoryEventListening()

export default {
  name: "TransactionHistory",
  data () {
    return {
      state: State.state,
    }
  },
  props: {
    currentStatus: String,
    currentPeriod: Number
  },
  computed: {
    transactions () {
      let txs = Object.values(this.state.history)
      txs.sort(function (tx1, tx2) {
        return tx1.period < tx2.period
      })
      let res = txs.map(function (tx) {
        tx.type = tx.choice
        if (tx.type == 'savings') {
          tx.amount = 50;
        }
        if (tx.type == 'cash') {
          tx.amount = 40;
        }
        return tx
      })
      console.log(res)
      return res
    }
  },
  components: {
    Transaction
  }
};
</script>

<style scoped>
  .transaction-list {
    /* text-align: center; */
    margin: auto;
  }
</style>
