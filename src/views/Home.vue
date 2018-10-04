<template>
  <div class="home">
    <f1-champions :yearFrom="yearFrom" :yearTo="yearTo" :key="`${yearFrom}-${yearTo}`"/>
  </div>
</template>

<script>
import F1Champions from '@/components/F1Champions' 

export default {
  components: {
    F1Champions
  },
  computed: {
    yearFrom () {
      return this.$route.query.yearFrom||'2005'
    },
    yearTo () {
      return this.$route.query.yearTo||'2015'
    }
  }
}
</script>
