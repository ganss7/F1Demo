<template>
  <div class="champions-list">
    <md-content class="heading">
      <h1>F1 Champions from {{yearFrom}} to {{yearTo}}:</h1>  
    </md-content>
    
    <md-progress-bar v-if="!championsList.length" md-mode="query"></md-progress-bar>
    <md-list>
      <transition-group
        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter"
        @before-leave="beforeLeave"
        @leave="leave"
        @afterLeave="afterLeave"
        tag="div">
        <md-list-item v-for="(champion, index) in championsList" :key="champion.season"
          :to="{ name: 'season', params: { season: champion.season, winner: champion.DriverStandings[0].Driver } }"
          :data-index="index">
          {{index+1}}.&nbsp;<strong>{{champion.season}}</strong>&nbsp;
          -&nbsp;
          <strong>{{getDriverFullName(champion.DriverStandings[0].Driver)}}</strong>
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
    yearFrom: String,
    yearTo: String
  },
  mixins: [utils, listAnimation],
  data () {
    return {
      championsList: [],
      showErrorMessage: false,
      errorMessage: ''
    }
  },
  created () {
    f1history.getChampionsList({yearFrom: this.yearFrom, yearTo: this.yearTo})
      .then(data => {
        this.championsList = data.MRData.StandingsTable.StandingsLists
        this.$options.listLength = this.championsList.length
      })
      .catch(error => {
        this.errorMessage = error.message
        this.showErrorMessage = true
      }) 
  }
}
</script>


