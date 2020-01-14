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
export default {
  validate({ params, store }) {
    return store.state.groups.groups.some(group => group.name === params.group)
  },
  computed: {
    groups() {
      return this.$store.getters['groups/orderedGroups']
    }
  }
}
</script>

<style lang="scss">
.calender {
  width: 50vw;
  margin: auto;
  h2 { margin: 20px 0; }
}
.fc {
  width: 400px;
  margin: auto;
  h2 {
    margin: 0;
    font-size: 20px;
  }
  button {
    height: 30px;
    padding: 0 8px;
  }
  .fc-today-button { display: none; }
  .fc-day, .fc-day-top { cursor: pointer; }
  .fc-content-skeleton { padding: 0 !important; }
  .fc-body .fc-row {
    min-height: 0 !important;
  }
  .fc-day-number {
    width: 100%;
    padding: 2px 0 !important;
    text-align: center;
  }
}
</style>
