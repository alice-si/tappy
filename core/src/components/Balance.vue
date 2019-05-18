<template>
  <div id="balance-container">
    <h2>10000</h2>
    <p>Contract balance</p>
  </div>
</template>

<script>

export default {
  name: "Balance",
  computed: {
  }
};
</script>

<style>

  #balance-container {
    text-align: center;
    margin: auto;

    max-width: 200px;
    /* height: 150px; */
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
