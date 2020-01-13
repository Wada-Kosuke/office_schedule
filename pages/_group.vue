<template>
  <div>
    <div class="calender">
      <h2 class="title">{{ this.$route.params.group }} のスケジュール</h2>
      <full-calendar></full-calendar>
    </div>
    <nuxt-child v-if="this.$route.params.date" />
  </div>
</template>

<script>
// export default {
//   name: 'Schedule'
// }
</script>

<style lang="scss">
.calender {
  width: 60vw;
  margin: auto;
  h2 { margin: 20px 0; }
}
.fc {
  width: 60vw;
  margin: auto;
  h2 {
    margin: 0;
    font-size: 20px;
  }
}
.fc-day, .fc-day-top { cursor: pointer; }
.fc-content-skeleton { padding: 0 !important; }
</style>
