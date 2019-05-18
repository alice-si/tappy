<template>
  <!-- Always shows a header, even in smaller screens. -->
  <div id="nav-bar">
    <!-- <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header"> -->
    <div class="mdl-layout mdl-layout--fixed-header">
      <div class="mdl-layout__header navbarcolour">
        <div class="mdl-layout__header-row">
          <!-- Title -->
          <!-- <span class="mdl-layout-title"><img class="logo" src="../../public/logo.svg" height="48px"/>Homelink</span> -->
          <span class="mdl-layout-title"><img class="logo" src="../../public/logo.svg" height="48px"/>Homelink</span>
          <!-- Add spacer, to align navigation to the right -->
          <div class="mdl-layout-spacer"></div>
          <!-- Navigation. We hide it in small screens. -->
          <nav class="mdl-navigation mdl-layout--large-screen-only">
            <a
              class="mdl-navigation__link"
              v-bind:class="{selected: selected == 'wallet'}"
              href="/wallet"
            >Wallet</a>
            <!-- <a
              class="mdl-navigation__link"
              v-bind:class="{selected: selected == 'voting'}"
              href="/voting"
            >Voting</a> -->
            <a
              class="mdl-navigation__link"
              v-bind:class="{selected: selected == 'stats'}"
              href="/stats"
            >Explore</a>
            <a
              class="mdl-navigation__link"
              v-bind:class="{selected: selected == 'onboard'}"
              href="/onboard"
            >Onboard</a>
          </nav>
        </div>
      </div>

      <!-- <div class="mdl-layout__drawer">
        <span class="mdl-layout-title">Alice.sh</span>
        <nav class="mdl-navigation">
          <a
            class="mdl-navigation__link"
            v-bind:class="{selected: selected == 'wallet'}"
            href="/wallet"
          >Wallet</a>
          <a
            class="mdl-navigation__link"
            v-bind:class="{selected: selected == 'voting'}"
            href="/voting"
          >Voting</a>
        </nav>
      </div> -->
    </div>
  </div>

</template>

<script>
export default {
  name: "NavBar",
  props: {
    selected: String
  }
};
</script>

<style scoped>
.selected {
 font-weight: 500 !important;
 color: #FFF;
 opacity: 1;
 background-color: #1c587a;
}

.mdl-navigation__link {
  font-size: 16px;
  letter-spacing: 0.5px;
  font-weight:300;
}

.mdl-navigation__link:hover {
  background-color: #114462;
  transition: 0.3s;
}

.navbarcolour {
 background-color: #184E6D !important;
}

.logo {
  padding-right: 15px;
}
</style>
