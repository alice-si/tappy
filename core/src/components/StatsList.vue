<template>
  <div>
    <table>
      <StatsListElement
        v-for="tenant in tenantList"
        v-bind:key="tenant.address"
        v-bind:start="start"
        v-bind:end="end"
        v-bind:details="tenant"
        v-bind:currentPeriod="currentPeriod"
      />

      <tr>
        <td></td>
        <td v-for="pDate in listOfPeriodsBefore(currentPeriod)" v-bind:key="pDate">
          {{ pDate }}
        </td>
      </tr>
      
    </table>
  </div>

</template>

<script>
import StatsListElement from './StatsListElement'
import State from '../State.js'
import Blockchain from '../Blockchain.js'
import Periods from '../Periods.js'

State.startEventListening()

export default {
  data () {
    return {
      start: "Jan 2017",
      end: "Jan 2019",
      state: State.state,
    }
  },
  components: {
    StatsListElement
  },
  computed: {
    tenantList () {
      let l = []
      let counter = 1
      for (let addr in this.state.stats.tenants) {
        l.push(Object.assign(this.state.stats.tenants[addr], {id: counter++}))
      }
      console.log("____________");
      console.log(JSON.stringify(l[6]));
      return l
    }
  },
  asyncComputed: {
    async currentPeriod () {
      let res = await Blockchain.getCurrentPeriod()
      console.log('Periods on chart:' + res)
      return res
    }
  },
  methods: {
    listOfPeriodsBefore (currentPeriod) {
      let pDates = []
      for (let p = 0; p <=currentPeriod; p++) {
        pDates.push(Periods.toString(p))
      }
      return pDates
    }
  },
  name: "StatsList",
}
</script>

<style>
  table {
    /* border: 1px solid black; */
    border: none;
    
    width: 90vw;
  }
  .ruler-label {
    margin-left: 7vw;
  }
</style>