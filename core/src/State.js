import {pick} from 'lodash'
import Vue from 'vue'
import dialogPolyfill from 'dialog-polyfill';

import { aggregateStats, listenForHistoryEvents } from './AggregateStats';

let State = {
  debug: true,
  state: {
    message: 'Something',
    modalVisible: false,
    modalCb: null,
    eth: {
    },
    stats: {
      tenants: {},
      numbers: {},
    },
    history: {},
    files: null
  },
  updateFiles (files) {
    Vue.set(this.state, 'files', files)
  },
  startHistoryEventListening () {
    let prevThis = this
    listenForHistoryEvents(function (historyEvent) {
      console.log(historyEvent)
      // prevThis.state.history[historyEvent.period] = historyEvent
      Vue.set(prevThis.state.history, historyEvent.period, historyEvent)
    })
  },
  startEventListening () {
    let prevThis = this
    // let numbers = this.numbers
    aggregateStats(function (update) {
      function getOutcomesDict (outcomeList) {
        let outcomesDict = {}
        for (let outcome of outcomeList) {
          outcomesDict[outcome.period] = outcome
        }
        return outcomesDict
      }
      // This hack makes an independent object copy
      let newTenant = JSON.parse(JSON.stringify(update.tenant))
      if (newTenant.outcomes && newTenant.outcomes.length > 0) {
        newTenant.outcomesDict = getOutcomesDict(newTenant.outcomes)
      } else {
        newTenant.outcomesDict = {}
      }
      Vue.set(prevThis.state.stats.tenants, update.tenant.address, newTenant)
      Vue.set(prevThis.state.stats, 'numbers', pick(update, [
        'jobsCreated',
        'currentlyEmployed',
        'avgTimeToIndependence',
        'nowIndependent',
        'avgTimeToFindJob',
        'savingsRate',
      ]))
    })
  },
  showQuestionModalDialog (cb) {
    this.modalVisible = true;
    this.modalCb = cb;
    let dialog = document.querySelector('dialog');
    dialogPolyfill.registerDialog(dialog);
    dialog.showModal();
  },
  setMessageAction (newValue) {
    // if (this.debug) console.log('setMessageAction triggered with', newValue)
    this.state.message = newValue
  },
  clearMessageAction () {
    // if (this.debug) console.log('clearMessageAction triggered')
    this.state.message = 'ZXC'
  },
  runCallback (choice) {
    if (this.modalCb) {
      this.modalCb(choice);
    }
  },
}

export default State
