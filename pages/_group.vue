<template>
  <div>
    <div class="calender col-lg-6">
      <Nav></Nav>
      <h4 class="title">{{ this.$route.params.group }} のスケジュール</h4>
      <full-calendar></full-calendar>
      <p>日付をクリックすると予定が表示されます</p>
    </div>
    <nuxt-child />
  </div>
</template>

<script>
import Nav from '~/components/Nav'

export default {
  validate({ params, store }) {
    return store.state.groups.groups.some(group => group.name === params.group)
  },
  components: {
    Nav
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
  margin: auto;
  position: relative;
  h4 { margin: 20px 0; }
  p {
    margin-top: 12px;
    text-align: center;
    color: #555;
  }
}
.fc {
  width: 280px;
  margin: 12px auto;
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
  .fc-body .fc-row { min-height: 0 !important; }
  .fc-day-number {
    width: 100%;
    padding: 2px 0 !important;
    text-align: center;
  }
}
</style>
