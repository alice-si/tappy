<template>
  <!-- <li class="mdl-list__item transaction-row" >
    <span class="mdl-list__item-primary-content">
      {{ details.period }}
      {{ details.type }}
      {{ details.amount }}
    </span>
  </li> -->


    <tr class="transfer-el">
      <td>
        <img src="../../public/Coins.png">
      </td>

      <td>
        {{ details.amount }}
      </td>

      <td>
        {{ details.from }}
      </td>

      <td>
        {{ details.to }}
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
    padding-left: 3vw;
    padding-right: 3vw;
    font-weight: 500;
    font-size: 16px;
    letter-spacing: 0.15px;
  }

</style>
