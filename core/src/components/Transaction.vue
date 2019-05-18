<template>
  <!-- <li class="mdl-list__item transaction-row" >
    <span class="mdl-list__item-primary-content">
      {{ details.period }}
      {{ details.type }}
      {{ details.amount }}
    </span>
  </li> -->


    <tr class="transaction-el">
      <td>
        <img v-if="details.type == 'savings'" src="../../public/pink-savings.png">
        <img v-if="details.type == 'cash'" src="../../public/Coins.png">
        <img v-if="details.type == 'pending'" src="../../public/payslip.png">
      </td>

      <td v-if="details.type == 'savings'">
        Saved for deposit
      </td>
      <td v-if="details.type == 'cash'">
        Withdrawal
      </td>
      <td v-if="details.type == 'pending'">
        Payslip submitted
      </td>
      <td> {{ date }} </td>
      <td v-if="details.type != 'pending'" >{{ amount }}</td>
      <td v-if="details.type == 'pending'" >
        <span class="pending">
          PENDING
        </span>
      </td>
    </tr>

      <!-- <span class="mdl-list__item-text-body">
        When: {{ month }}
      </span> -->
    <!-- <span class="mdl-list__item-secondary-content">
      <a class="mdl-list__item-secondary-action" href="#"><i class="material-icons">star</i></a>
    </span> -->
</template>

<script>
import Periods from '../Periods.js'

export default {
  name: "Transaction",
  props: {
    details: Object
  },
  computed: {
    amount () {
      return '€' + this.details.amount
    },
    date () {
      return Periods.toString(this.details.period)
    }
  }
};
</script>

<style scoped>
  .transaction-el {
    margin: auto;
    max-width: 400px;
    /* border: 1px black solid; */
  }

  td {
    width: 100%;
    width: 15vw;
    padding-top: 20px;
    font-weight: 500;
    font-size: 16px;
    letter-spacing: 0.15px;
  }

  .pending {
    font-size: 12px;
    letter-spacing: 0.5px;
    border-radius: 6px;
    padding: 4px;
    background: #C9FFFB;
    font-weight: 500;
  }

</style>
