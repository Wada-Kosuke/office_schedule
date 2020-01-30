<template>
  <div @click="close" class="modal-bg">
    <div class="list schedule-modal col-lg-6 col-10">
      <h5 v-if="attr == 'member'" class="title">{{ name }} のスケジュール</h5>
      <h5 v-else class="title">{{ name }} の使用予定</h5>
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
      switch (this.attr) {
        case "item":
          return this.$store.getters['schedules/orderedSchedules'].filter((schedule) => {
            return (
              schedule.event.item.some(name => name == this.name)
            )
          })
          break;
        case "member":
          return this.$store.getters['schedules/orderedSchedules'].filter((schedule) => {
            return (
              schedule.event.member.some(name => name == this.name)
            )
          })
          break;
        case "room":
          return this.$store.getters['schedules/orderedSchedules'].filter((schedule) => {
            return (
              schedule.event.place == this.name
            )
          })
          break;
      }
    }
  }
}
</script>

<style lang="scss">
.modal-bg {
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 100%;
  .schedule-modal {
    margin-top: 80px;
    background: #fff;
    border: 1px solid #777;
    .event-time {
      color: #555;
      .date { margin-right: 16px; }
    }
    p { margin-left: 16px; }
  }
}
</style>
