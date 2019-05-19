import Vue from 'vue'
import Blockchain from './Blockchain'

import EventListener from './EventListener';

let State = {
  debug: true,
  state: {
    eth: {
    },
    transfers: [],
    balance: 0
  },

  addTransfer(transfer) {
    this.state.transfers.push(transfer)
    this.state.transfers.sort(function (tr1, tr2) {
      return tr1.timestamp > tr2.timestamp ? -1 : 1
    })
    Vue.set(this.state, 'transfers', this.state.transfers)
  },

  updateBalance(balance) {
    Vue.set(this.state, 'balance', balance)
  },

  startEventListening() {
    if (web3.version.network != 42) {
      Blockchain.resetEventsBlock(0);

      let prevThis = this
      EventListener.listenForTransfers(function(transfer) {
        console.log(transfer)
        prevThis.addTransfer(transfer)
      })

      EventListener.listenForAnyEvents(async function() {
        const newBalance = await Blockchain.getBalance()
        //console.log(`New balance = ${newBalance}`)
        prevThis.updateBalance(newBalance)
      })
    }
  }

}

export default State
