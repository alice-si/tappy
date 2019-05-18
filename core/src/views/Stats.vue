<template>
  <div id="app">
    <NavBar selected="stats"/>
    <!-- MDL Progress Bar with Indeterminate Progress -->
    <div id="p2" v-if="state.stats.numbers.jobsCreated == null" class="mdl-progress mdl-js-progress mdl-progress__indeterminate"></div>
    <div id="chart">
      <StatsNumbers />
      <StatsList class="test"/>
    </div>
  </div>
</template>

<script>
import NavBar from '../components/NavBar.vue'
import State from '../State.js'
// import aggregateStats from '../AggregateStats.js'

// aggregateStats(tenant => {
//   console.log(tenant);
// });
import StatsNumbers from '../components/StatsNumbers.vue'
import StatsList from '../components/StatsList.vue'

export default {
  name: 'app',
  data () {
    return {
      state: State.state
    }
  },
  components: {
    NavBar,
    StatsNumbers,
    StatsList
  }
}
</script>

<style scoped>
  #p2 {
    width:100vw;
  }

  * {
    text-align: center;
  }

  #chart {
    margin: auto;
    margin-top: 30px;
    width: 1400px;
    min-width: 70vw;
    max-width: 90vw;
  }

  .test {
  padding-top:100px;
  }
</style>
