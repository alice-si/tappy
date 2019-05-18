<template>
  <div class="mdl-grid">
    <Claim
      name="job"
      v-bind:pendingTx="pendingTx"
      v-bind:currentStatus="currentStatus"
      img="job.png"
      class="mdl-cell--2-offset-desktop"
      title="I have a job"
      description="
      Please upload your payment slip for validation. After successful validation
      you will receive up to €50."
      @uploaded="handleJobClaim" />

    <Claim
      name="move-out"
      v-bind:pendingTx="pendingTx"
      v-bind:currentStatus="currentStatus"
      img="sold.png"
      title="I'm moving out"
      description="
      Please upload your lease agreement for validation. After successful validation
      your savings will be payed out."
      @uploaded="handleMoveOutClaim" />
  </div>
</template>

<script>
import Blockchain from '../Blockchain.js';
import Claim from './Claim';
import State from '../State.js';

export default {
  data() {
    return {
      state: State,
    };
  },
  components: {
    Claim
  },
  props: {
    currentStatus: String,
    pendingTx: String,
  },
  methods: {
    handleJobClaim() {
      this.state.showQuestionModalDialog(async (choice) => {
        await Blockchain.claimReward(choice);
        this.$emit('transactionSent', 'job');
      });
    },

    async handleMoveOutClaim() {
      await Blockchain.claimMoveOut();
      this.$emit('transactionSent', 'moveOut');
    },
  },
  name: "Claims",
};
</script>

<style>

</style>
