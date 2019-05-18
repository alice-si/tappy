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
    // TODO it probably has no id - I will add it manually
    let newTransfers = JSON.parse(JSON.stringify(this.state.transfers))
    const id = newTransfers.length + 1
    newTransfers.push(Object.assign({id}, transfer))
    Vue.set(this.state, 'transfers', newTransfers)
  },

  updateBalance(balance) {
    Vue.set(this.state, 'balance', balance)
  },

  startEventListening() {
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

export default State
