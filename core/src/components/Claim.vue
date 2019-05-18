<template>
  <div class="
    mdl-cell
    mdl-cell--4-col-desktop
    mdl-cell--12-col-tablet
    mdl-cell--12-col-phone
    mdl-card
    mdl-shadow--2dp
    claim-card"
  >
    <img :src="getImgUrl()" width="71px" height="60px" class="headingtitle"/>
    <div class="mdl-card__title headingtitle">
      <h2 class="mdl-card__title-text">{{ title }}</h2>
    </div>
    <div class="mdl-card__supporting-text claimbody">
      {{ description }}
    </div>

      <label v-if="displayButton || displayInactive" class="fileContainer">
        <button
          :disabled="displayInactive"
          class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored claim-button">
          Claim
          <input type="file" ref="claimProofFiles" @change="fileLoaded" />
        </button>
      </label>
      <div v-else-if="displayLoading">
        <mdl-spinner></mdl-spinner>
      </div>
      <div v-else-if="displayCompleted">
        <p style="font-weight: bold; margin-bottom: 0px">Bonus for the current month already received!</p>
      </div>
    </div>
</template>

<script>
import State from '../State.js';

export default {
  data() {
    return {
      files: [],
      state: State.state,
    }
  },
  computed: {
    displayButton: function() {
      return this.$props.currentStatus === 'free'
        || (this.$props.currentStatus === 'validated' && this.$props.name !== 'job');
    },

    displayLoading: function() {
      return this.$props.currentStatus === 'pending'
        && (this.$props.pendingTx === this.$props.name);
    },

    displayInactive: function () {
      return this.$props.currentStatus === 'pending'
        && (this.$props.pendingTx !== this.$props.name);
    },

    displayCompleted: function() {
      return this.$props.currentStatus === 'validated'
        && (this.$props.name === 'job');
    }
  },
  props: {
    name: String,
    currentStatus: String,
    pendingTx: String,
    title: String,
    description: String,
    img: String,
  },
  methods: {
    fileLoaded () {
      this.files = this.$refs.claimProofFiles
      State.updateFiles(this.files)
      this.$notify({
        group: 'notifications',
        title: 'File uploaded!',
        text: 'The validator will review your claim'
      });
      this.$emit('uploaded');
    },
    getImgUrl () {
      return require('../../public/' + this.img);
    }
  }
}
</script>

<style scoped>
.fileContainer {
    overflow: hidden;
    position: relative;
}

.fileContainer [type=file] {
    cursor: pointer;
    display: block;
    /* font-size: 999px; */
    /* filter: alpha(opacity=0); */
    min-height: 100%;
    min-width: 100%;
    opacity: 0;
    position: absolute;
    right: 0;
    text-align: right;
    top: 0;
}

.claim-button {
    width: 100px;
    border-radius: 10px;
    box-shadow: none;
    font-size: 16px;
    letter-spacing: 0.5px;
    font-weight: 400;
    height: 36px;
    margin-top: 6px;
    text-transform: none;
    background-color: #184E6D;
}

.claim-button:hover {
  cursor: pointer;
  background-color: #6879dc;
  transition: 0.3s;
}

* {
  font-family: Rubik !important;
}

.headingtitle {
  margin: auto;
}

h2 {
  font-weight: 400;
  padding-top: 5px;
  margin-bottom: -10px;
}

.claimbody {
  font-size: 16px;
  line-height: 1.5;
  color: #497C99 !important;
}

.claim-card {
  box-shadow: none;
  border-radius: 20px;
  background: #EDF9FF;
  border-radius: 20px;
  padding-top: 40px;
  padding-bottom: 40px;
}

</style>
