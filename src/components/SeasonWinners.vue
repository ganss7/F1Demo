<template>
  <div class="season-winners-list">
    <md-content class="heading">
      <h1>Season {{season}} race winners:</h1>
    </md-content>

    <md-progress-bar v-if="!winnersList.length" md-mode="query"></md-progress-bar>
    <md-list>
      <transition-group
        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter"
        @before-leave="beforeLeave"
        @leave="leave"
        @afterLeave="afterLeave"
        tag="div">
        <md-list-item v-for="(winner, index) in winnersList" :key="winner.round"
          :class="`${myWinner &&  myWinner.driverId === winner.Results[0].Driver.driverId ? 'highlight' : ''}`"
          :data-index="index">
          {{index+1}}.&nbsp;<strong>{{winner.raceName}}</strong>
          &nbsp;-&nbsp;
          <a :href="winner.Results[0].Driver.url" target="_blank">{{getDriverShortName(winner.Results[0].Driver)}}</a>
        </md-list-item>
      </transition-group>
    </md-list>

    <!-- dialog for showing error messages -->
    <md-dialog :md-active.sync="showErrorMessage">
      <md-dialog-title>Error</md-dialog-title>
      <md-dialog-content>{{errorMessage}}</md-dialog-content>
      <md-dialog-actions>
        <md-button @click="showErrorMessage = false">Ok</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
import f1history from '@/api/f1history'
import utils from '@/mixins/utils'
import listAnimation from '@/mixins/listAnimation'

export default {
  props: {
    season: String,
    winner: Object
  },
  mixins: [utils, listAnimation],
  data () {
    return {
      winnersList: [],
      myWinner: this.winner,
      showErrorMessage: false,
      errorMessage: ''
    }
  },
  created () {
    f1history.getSeasonWinnersList(this.season)
      .then(data => this.winnersList = data.MRData.RaceTable.Races)
      .catch(error => {
        this.errorMessage = error.message
        this.showErrorMessage = true
      }) 
    
    if (!this.myWinner) {
      f1history.getSeasonWinner(this.season)
        .then(data => this.myWinner = data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].Driver)
        .catch(error => {
          this.errorMessage = error.message
          this.showErrorMessage = true
        })
    }
  }
}
</script>

<style lang="scss" scoped>
  #app .md-list-item.highlight {
    background: var(--md-theme-default-accent);
  }
</style>

