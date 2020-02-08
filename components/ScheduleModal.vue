<template>
  <div class="modal">
    <div @click="close" class="modal-bg"></div>
    <div class="list modal-content col-lg-6 col-10">
      <div class="modal-body">
        <h5 class="modal-title">
          <h5 v-if="attr == 'member'" class="title">{{ name }} のスケジュール</h5>
          <h5 v-else class="title">{{ name }} の使用予定</h5>
        </h5>
        <ul v-if="schedules != ''">
          <li v-for="schedule in schedules" :key="schedule.id"">
            <div class="event-time">
              <span class="date">{{ schedule.event.date }}</span>
              <span>{{ schedule.event.startTime }}</span>
              <span v-if="schedule.event.startTime || schedule.event.endTime">〜</span>
              <span>{{ schedule.event.endTime }}</span>
            </div>
            <p>{{ schedule.event.name }}</p>
          </li>
        </ul>
        <h6 v-else>まだ登録されているスケジュールはありません</h6>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["attr", "name"],
  methods: {
    close() {
      this.$emit('close')
    }
  },
  computed: {
    schedules() {
      let schedules
      switch (this.attr) {
        case "item":
          schedules = this.$store.getters['schedules/orderedSchedules'].filter((schedule) => {
            return (
              schedule.event.item.some(name => name == this.name)
            )
          })
          break;
        case "member":
          schedules = this.$store.getters['schedules/orderedSchedules'].filter((schedule) => {
            return (
              schedule.event.member.some(name => name == this.name)
            )
          })
          break;
        case "room":
          schedules = this.$store.getters['schedules/orderedSchedules'].filter((schedule) => {
            return (
              schedule.event.place == this.name
            )
          })
          break;
      }
      return _.sortBy(schedules, 'event.date')
    }
  }
}
</script>
