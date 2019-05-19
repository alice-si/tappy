<template>
  <div class="balance-container" >
    <h2>{{value}} </h2>
    <p>{{label}}</p>
  </div>
</template>

<script>

import State from '../State'

export default {
  name: "Balance",
  props: {
    value: Number,
    label: String
  }
};
</script>

<style>

  .balance-container {
    text-align: center;
    margin: auto;

    max-width: 200px;
    border-radius: 10px;
    background: #1c587a;
    color: white;
  }

  h2 {
    padding-top: 20px;
    margin-bottom: -2px;
  }

  p {
    padding-bottom: 20px;
  }

</style>
