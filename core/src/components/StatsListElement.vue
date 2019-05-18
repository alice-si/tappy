<template>
  <tbody>
    <tr>
      <td width="50px" class="circle-td" rowspan="2">
        <div class="circled">{{ details.id }}</div>
      </td>
      <td v-for="claimCell in claimsOnPeriods" v-bind:key="claimCell.period">
        <div v-bind:class="{
          cell: true,
          claimCell: true, 
          claimCellSaved: claimCell.type == 'savings',
          claimCellCash:  claimCell.type == 'cash'
          }"
          >
        </div>
        <!-- {{ claimCell.type }} -->
      </td>
    </tr>
    <tr>
      <td v-for="livedCell in livingsOnPeriods" v-bind:key="livedCell.period">
        <!-- {{ livedCell.lived }} -->
        <div v-bind:class="{
          cell: true,
          livedCell: true,
          livedCellFilled: livedCell.lived
          }" >
        </div>
      </td>
    </tr>
  </tbody>
</template>

<script>
export default {
  name: "StatsListElement",
  props: {
    details: Object,
    start: String,
    end: String,
    currentPeriod: Number
  },
  computed: {
    claimsOnPeriods () {
      let l = [];
      for (let i = 0; i <= this.currentPeriod; i++) {
        let type = 'none' // 'savings', 'cash'
        if (this.details.outcomesDict[i]) {
          type = this.details.outcomesDict[i].choice
        }
        let text = 'No job confirmation'
        if (type == 'savings' || type == 'cash') {
          text = 'Tenant had a job'
        }

        // Remove this
        l.push({
          period: i,
          type,
          text
        })
      }
      return l
    },
    livingsOnPeriods () {
      let l = [];
      for (let i = 0; i <= this.currentPeriod; i++) {
        l.push({
          period: i,
          lived: this.details.onboarding <= i && !(this.details.graduated < i)
        })
      }
      return l
    }
  }
};
</script>

<style scoped>
  tr {
    width: 10vw;
    padding: 0;
  }
  td {
    padding: 0;
    /* width: 4vw; */
  }
  .circled {
    font-size: 20px;
    color: white;
    width: 50px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    border-radius: 50%;
    background: lightseagreen;
    margin-right: 10px;
  }

  .livedCell {
    background: white;
    position: relative;
    bottom: 9px;
    border-radius: 3px;
    height: 80px;
  }

  .livedCellFilled {
    background: lightseagreen;
    position: relative;
    bottom: 9px;
    border-radius: 3px;
  }

  .claimCell {
    position: relative;
    top: 9px;
    border-radius: 3px;
  }

  .claimCellSaved,.claimCellCash {
    background: lightgreen;
    border-radius: 3px;
    /* position: absolute; */
    /* bottom: 0px; */
  }

  .cell {
    cursor: pointer;
    width: 100%;
    height: 10px;
  }

  .circle-td {
    width: 1vw;
    margin: auto;
  }

</style>