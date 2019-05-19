import Vue from 'vue'
import Blockchain from './Blockchain'

import EventListener from './EventListener';

let State = {
  debug: true,
  state: {
    eth: {
    },
    transfers: [],
    balance: 0,
    noLoaded: 0,
    noUnloaded: 0,
    totalLoaded: 0,
    totalUnloaded: 0
  },

  addTransfer(transfer) {
    this.state.transfers.push(transfer)
    this.state.transfers.sort(function (tr1, tr2) {
      return tr1.timestamp > tr2.timestamp ? -1 : 1
    })
    var noLoaded = 0;
    var noUnloaded = 0;
    var totalUnloaded = 0;
    var totalLoaded = 0;

    this.state.transfers.forEach((transfer) => {
      if (transfer.type == 'Card loaded') {
        noLoaded++;
        totalLoaded += Number(transfer.value);
      } else {
        noUnloaded++;
        totalUnloaded += Number(transfer.value);
      }
    });

    Vue.set(this.state, 'noLoaded', noLoaded);
    Vue.set(this.state, 'noUnloaded', noUnloaded);
    Vue.set(this.state, 'totalLoaded', totalLoaded);
    Vue.set(this.state, 'totalUnloaded', totalUnloaded);

    Vue.set(this.state, 'transfers', this.state.transfers)
  },

  updateBalance(balance) {
    Vue.set(this.state, 'balance', Number(web3.fromWei(balance, 'ether')))
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
