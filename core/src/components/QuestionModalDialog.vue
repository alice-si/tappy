<template>
  <dialog class="mdl-dialog question-dialog">
    <h3>How would you like to be rewarded?</h3>
    <p class="maindesc">
      You can either cash in your bonus reward for €40 now, or you can choose to save it and get €50 towards your deposit.
    </p>
    <table>
      <tr id="table-row">
        <td>
          <div @click="choose('savings')" class="choice-button" id="save-choice">
            <!-- Add 200GBP to savings -->
            <img class="choice-image" src="../../public/save-icon.png" width="71px" height="60px">
            <p class="caption">
              Add €50 to deposit savings
            </p>
          </div>
        </td>
        <td>
          <div @click="choose('cash')" class="choice-button" id="payout-choice">
            <img class="choice-image" src="../../public/cash.png" width="71px" height="60px">
            <p class="caption">
              Withdraw €40 as cash now
            </p>
          </div>
        </td>
      </tr>
    </table>
  </dialog>
</template>

<script>
  import State from "../State.js"

  export default {
    name: "QuestionModalDialog",
    data () {
      return {
        state: State.state
      }
    },
    methods: {
      choose (choice) {
        var dialog = document.querySelector('dialog')
        dialog.close()
        State.runCallback(choice)
      }
    }
  }
</script>

<style scoped>
  * {
    text-align: center;
  }

  .question-dialog {
    min-width: 50vw;
    max-width: 90vw;
    width: 500px;
    /* height: 300px; */
    border-radius: 18px;
    box-shadow: 0px 3px 3px rgba(0,0,0,0.1);

  }

  .choice-button {
    margin: auto;
    height: 100%;
    padding-top: 30px;
    padding-bottom: 20px;
    /* height: 100px; */
    /* background: grey; */
    background-size: contain;
    cursor: pointer;
    border-radius: 12px;
  }

  .choice-button:hover {
    background: #EDF9FF;
  }

  table {
    margin: auto;
    width: 100%;
  }

p {
  font-size: 16px;
  line-height: 1.5;
  color: #497C99 !important;
}

.maindesc {
    margin: auto;
    max-width: 80%;
    padding-bottom: 20px;
  }

.caption {
  padding-top: 20px;
  font-weight: 500;
}

dialog::backdrop {
    position: fixed;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    background: rgba(0, 0, 0, 0.2);
}
</style>
