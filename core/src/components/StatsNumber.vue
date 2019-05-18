<template>
      <div class="
      mdl-cell
      mdl-cell--4-col-desktop
      mdl-cell--6-col-tablets
      mdl-cell--12-col-phone
      stats-number
    ">

      <h2>{{ numberText | decimal }}</h2>
      <p class="narrow">{{ title }}</p>
      </div>
</template>

<script>
export default {
  name: 'StatsNumber',
  props: {
    number : Number,
    title: String,
    unit: String
  },
  computed: {
    numberText: function() {
      if (this.$props.number !== null && this.$props.number !== undefined) {
        return this.$props.number;
      } else {
        return '-';
      }
    }
  },
  filters: {
    decimal: function(value) {
      if (value != '-' && Math.floor(value) != value) {
        return value.toFixed(2);
      } else {
        return value;
      }
    }
  }
}
</script>

<style scoped>
h2 {
  margin-bottom: 5px;
}
p {
  color: #BBCED9;
  font-weight: 400;
  width: 200px;
  margin: auto;
  line-height: 1.35;
}

</style>
