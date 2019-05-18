import Vue from 'vue'

import { listenForTransfers } from './EventListener';

let State = {
  debug: true,
  state: {
    eth: {
    },
    transfers: []
  },

  addTransfer(transfer) {
    // TODO it probably has no id - I will add it manually
    let newTransfers = JSON.parse(JSON.stringify(this.state.transfers))
    const id = newTransfers.length + 1
    newTransfers.push(Object.assign({id}, transfer))
    Vue.set(this.state, 'transfers', newTransfers)
  },

  startEventListening() {
    let prevThis = this
    listenForTransfers(function (transfer) {
      console.log(transfer)
      prevThis.addTransfer(transfer)
    })
  }

}

export default State
