<template>
  <div class="mdl-grid">
    <StatsNumber
      v-bind:number="state.stats.numbers.jobsCreated"
      title="Number of jobs created" />
    <StatsNumber
      v-bind:number="state.stats.numbers.nowIndependent"
      title="Tenants successfully
moved on" />
    <StatsNumber
      v-bind:number="state.stats.numbers.currentlyEmployed"
      title="Current tenants
employed" />
    <StatsNumber
      v-bind:number="state.stats.numbers.avgTimeToFindJob"
      title="Avg. months until
tenants find work"/>
    <StatsNumber
      v-bind:number="state.stats.numbers.avgTimeToIndependence"
      title="Avg. months until tenants move on" />
    <StatsNumber
      v-bind:number="state.stats.numbers.savingsRate"
      unit="percent"
      title="Percentage of rewards taken in savings" />

  </div>
</template>

<script>
import StatsNumber from './StatsNumber'
import State from '../State.js'

export default {
  name: "StatsListElement",
  data () {
    return {
      state: State.state
    }
  },
  components: {
    StatsNumber
  }
}
</script>
