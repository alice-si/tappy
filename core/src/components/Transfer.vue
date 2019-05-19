<template>
  <!-- <li class="mdl-list__item transaction-row" >
    <span class="mdl-list__item-primary-content">
      {{ details.period }}
      {{ details.type }}
      {{ details.amount }}
    </span>
  </li> -->


    <tr class="transfer-el">
      <td v-if="details.type == 'Meal awarded'" style="width: 60px !important;">
        <eva-icon name="award-outline" animation="pulse" fill="#6610f2" width="32" height="32" s></eva-icon>

      </td>

      <td v-if="details.type != 'Meal awarded'">
        <eva-icon name="car-outline" animation="pulse" fill="#f17105" width="32" height="32"></eva-icon>

      </td>

      <td>
        {{ details.type }}
      </td>

      <!-- <td>
        {{ details.type }}
      </td> -->

      <td>
        {{ new Date(details.timestamp * 1000).toISOString() | moment("from", "now") }}
      </td>



      <td>
        {{ details.value }}
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

export default {
  name: "Transfer",
  props: {
    details: Object
  },
  computed: {
    // amount () {
    //   return '€' + this.details.amount
    // },
  }
};
</script>

<style scoped>
  .transfer-el {
    margin: auto;
    /* max-width: 400px; */
    /* border: 1px black solid; */
  }

  td {
    width: 100%;
    width: 15vw;
    padding-top: 20px;
    padding-left: 1vw;
    padding-right: 1vw;
    font-weight: 500;
    font-size: 16px;
    letter-spacing: 0.15px;
  }

</style>
