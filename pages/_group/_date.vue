<template>
  <div>
    <div class="list col-md-8">
      <h5 class="title">{{ this.$route.params.date }} の予定</h5>
      <ul v-if="this.schedules != ''" class="list">
        <li v-for="schedule in schedules" :key="schedule.id">
          <span class="event-time">
            <span>{{ schedule.event.startTime }}</span>
            <span v-if="schedule.event.startTime || schedule.event.endTime">〜</span>
            <span>{{ schedule.event.endTime }}</span>
          </span>
          <span>{{ schedule.event.name }}</span>
          <button @click="remove(schedule.id)">削除</button>
          <br>
          <span v-if="schedule.event.member != ''" class="member">参加者：{{ schedule.event.member.join(", ") }}</span>
        </li>
      </ul>
      <h6 v-else>まだ予定はありません</h6>
    </div>
    <div class="form col-md-6">
      <h5 class="title">予定を追加する</h5>
      <form @submit.prevent="add">
        <span class="time-form">
          <span>時間</span>
          <input v-model="event.startTime" name="startTime" type="time">
          <span>〜</span>
          <input v-model="event.endTime" name="endTime" type="time">
        </span>
        <br>
        <span>内容</span>
        <input v-model="event.name">
        <br>
        <span>参加者</span>
        <br>
        <div class="member-form">
          <span v-for="member in groupMembers" :key="member.id">
            <input v-model="event.member" type="checkbox" name="member" :value="member.member.name">
            <label for="member">{{ member.member.name }}</label>
          </span>
        </div>
        <button class="button--green">追加</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      event: {
        group: this.$route.params.group,
        date: this.$route.params.date,
        startTime: '',
        endTime: '',
        name: '',
        member: []
      }
    }
  },
  validate({ params }) {
    return /^\d{4}-\d{2}-\d{2}$/.test(params.date)
  },
  created: function() {
    this.$store.dispatch('schedules/init')
    this.$store.dispatch('members/init')
  },
  methods: {
    add() {
      // イベントの内容が空欄でないか
      if (this.event.name === '') {
        return
      }
      // 時間が適切か
      if (this.event.startTime > this.event.endTime) {
        alert('時間が適切ではありません')
        return
      }
      // 参加者の時間が重複している時登録するかの処理
      for (let i = 0; i < this.schedules.length; i++) {
        const eventStartTime    = this.schedules[i].event.startTime
        const eventEndTime      = this.schedules[i].event.endTime
        const newEventStartTime = this.event.startTime
        const newEventEndTime   = this.event.endTime
        // 時間が被っているイベントがあるか
        if (eventStartTime <= newEventEndTime && eventEndTime >= newEventStartTime == true) {
          const eventMember    = this.schedules[i].event.member
          const newEventMember = this.event.member
          // さらに被っているメンバーがいるか
          if ([...eventMember, ...newEventMember].filter(member =>
            eventMember.includes(member) && newEventMember.includes(member)).length > 0
          ) {
            if (window.confirm('時間が重複しているメンバーがいます。このまま予定を登録してよろしいですか？')
                  == false) {
              return
            }
          }
        }
      }
      this.$store.dispatch('schedules/add', this.event)
      this.event = {
        group: this.$route.params.group,
        date: this.$route.params.date,
        startTime: '',
        endTime: '',
        name: '',
        member: []
      }
    },
    remove(id) {
      this.$store.dispatch('schedules/remove', id)
    }
  },
  computed: {
    schedules() {
      return this.$store.getters['schedules/orderedSchedules'].filter((schedule) => {
        return (
          schedule.event.date === this.$route.params.date &&
          schedule.event.group === this.$route.params.group
        )
      })
    },
    groupMembers() {
      return this.$store.getters['members/orderedMembers'].filter((members) => {
        return (members.member.group === this.$route.params.group)
      })
    }
  }
}
</script>

<style lang="scss">
.event-time {
  width: 120px;
  font-size: 14px;
  display: inline-block;
}
.member {
  margin-left: 2vw;
  font-size: 14px;
  color: #555;
}
.time-form input {
  font-size: 14px;
  width: 82px;
}
.member-form {
  margin-left: 2vw;
  input {
  width: inherit;
  height: inherit;
  }
  label { margin-right: 12px; }
}
</style>
