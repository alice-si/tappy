<template>
  <div class="mdl-grid">
    <div class="
      mdl-cell
      mdl-cell--2-offset-desktop
      mdl-cell--4-col-desktop
      mdl-cell--2-col-tablets
      mdl-cell--12-col-phone
    ">
      <div class="balancebgleft">
        <div class="inline inlinefirst"><img src="../../public/save-icon.png"></div>
        <div class="inline"><h1>€{{ savings }}</h1></div>
        <p>Deposit savings</p>
      </div>
    </div>
    <div class="
      mdl-cell
      mdl-cell--4-col-desktop
      mdl-cell--2-col-tablets
      mdl-cell--12-col-phone
    ">
      <div class="balancebg">
      <div class="inline"><img src="../../public/payout-icon.png"></div>
      <div class="inline"><h1>{{ rewards }}</h1></div>
      <p>Bonus rewards</p>
      </div>
    </div>
  </div>
</template>

<script>
import Blockchain from '../Blockchain.js';
import State from '../State.js';

let data = {
  savings: null,
  state: State.state,
};

let vm = {
  name: 'Balance',
  data: function() {
    return data;
  },
  computed: {
    rewards: function() {
      return Object.keys(this.state.history).length;
    }
  },
  methods: {
    async updateSavings() {
      let savings = await Blockchain.getSavings(await Blockchain.account());
      data.savings = savings;
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  vm.methods.updateSavings();
}, false);

(async () => {
  let contract = Blockchain.contract();
  let account = await Blockchain.account();
  let filter = contract.filters.OutcomeAchieved(account);

  contract.on(filter, () => {
    vm.methods.updateSavings();
  });
})();

export default vm;
</script>

<style>
* {
  font-family: Rubik !important;
}

h1 {
  margin-bottom:-5px;
}

p {
  font-size: 16px;
  font-weight: 400;

}

.balancebg, .balancebgleft {
background: #FFF7E5;
border-radius: 20px;
padding-top: 40px;
padding-bottom: 40px;
}

.inline {
  display: inline-block;
  vertical-align: bottom;
  padding-bottom: 10px;
  line-height: 5;
}

.inlinefirst {
padding-right: 10px;
}
</style>
