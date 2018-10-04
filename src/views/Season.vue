<template>
  <div class="season">
    <season-winners :season="season" :winner="winner" />
  </div>
</template>

<script>
import SeasonWinners from '@/components/SeasonWinners' 

export default {
  props: {
    season: String, 
    winner: Object
  },
  components: {
    SeasonWinners
  }
}
</script>