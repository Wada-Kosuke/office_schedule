<template>
  <div>
    <div class="calender col-lg-6">
      <full-calendar></full-calendar>
      <p>日付をクリックすると予定が表示されます</p>
    </div>
    <div class="list col-lg-8" id="target">
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
          <p v-if="schedule.event.member != ''" class="event-data">
            参加者：{{ schedule.event.member.join(", ") }}
          </p>
          <p v-if="schedule.event.place != ''" class="event-data">
            場所：{{ schedule.event.place }}
          </p>
          <p v-if="schedule.event.item != ''" class="event-data">
            {{ schedule.event.item.join(", ") }}を使用
          </p>
        </li>
      </ul>
      <h6 v-else>まだ予定はありません</h6>
    </div>
    <div class="form col-lg-6">
      <h5 class="title">予定を追加する</h5>
      <form @submit.prevent="add">
        <div class="time-form">
          <span class="form-label">時間</span>
          <input v-model="event.startTime" name="startTime" type="time">
          <span>〜</span>
          <input v-model="event.endTime" name="endTime" type="time">
        </div>
        <div class="name-form">
          <span class="form-label">内容</span>
          <input v-model="event.name">
        </div>
        <div class="member-form">
          <span class="form-label">参加者</span>
          <div>
            <span v-for="member in groupMembers" :key="member.id">
              <input v-model="event.member" type="checkbox" name="member" :value="member.member.name">
              <label for="member">{{ member.member.name }}</label>
            </span>
          </div>
        </div>
        <div class="place-form">
          <span class="form-label">場所</span>
          <input v-model="event.place"><br>
          <span class="select">登録した部屋から選択：</span>
          <select v-model="event.place">
            <option v-for="room in groupRooms" :key="room.id" :value="room.room.name">
              {{ room.room.name }}
            </option>
          </select>
        </div>
        <div class="item-form">
          <span class="form-label">アイテム</span>
          <div>
            <span v-for="item in groupItems" :key="item.id">
              <input v-model="event.item" type="checkbox" name="item" :value="item.item.name">
              <label for="item">{{ item.item.name }}</label>
            </span>
          </div>
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
        member: [],
        place: '',
        item: []
      }
    }
  },
  validate({ params }) {
    return /^\d{4}-\d{2}-\d{2}$/.test(params.date)
  },
  created: function() {
    this.$store.dispatch('schedules/init')
    this.$store.dispatch('members/init')
    this.$store.dispatch('rooms/init')
    this.$store.dispatch('items/init')
  },
  methods: {
    add() {
      // イベントの内容が空欄でないか
      if (this.event.name === '') {
        return
      }
      // 開始時刻より終了時刻が小さい場合はreturn
      if (this.event.startTime > this.event.endTime) {
        alert('時間が適切ではありません')
        return
      }
      // 参加者の時間、場所、アイテムの重複確認の処理
      for (let i = 0; i < this.schedules.length; i++) {
        const eventStartTime    = this.schedules[i].event.startTime
        const eventEndTime      = this.schedules[i].event.endTime
        const newEventStartTime = this.event.startTime
        const newEventEndTime   = this.event.endTime
        // 時間が重複しているイベントがあるか
        if (eventStartTime <= newEventEndTime && eventEndTime >= newEventStartTime == true) {
          const eventMember    = this.schedules[i].event.member
          const newEventMember = this.event.member
          const eventItem      = this.schedules[i].event.item
          const newEventItem   = this.event.item
          // メンバーが重複していないか
          if ([...eventMember, ...newEventMember].filter(member =>
            eventMember.includes(member) && newEventMember.includes(member)).length > 0
            && window.confirm(`${this.schedules[i].event.name}とメンバーが重複しています。\nこのまま予定を登録してよろしいですか？`)
              == false) {
            return
          }
          // 場所が重複していないか
          if (this.event.place != '' &&
            this.event.place == this.schedules[i].event.place &&
            window.confirm(`${this.schedules[i].event.name}と場所が重複しています。このまま予定を登録してよろしいですか？`)
              == false) {
            return
          }
          // 使用するアイテムが重複していないか
          if ([...eventItem, ...newEventItem].filter(item =>
            eventItem.includes(item) && newEventItem.includes(item)).length > 0
            && window.confirm(`${this.schedules[i].event.name}と使用するアイテムが重複しています。\nこのまま予定を登録してよろしいですか？`)
              == false) {
            return
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
        member: [],
        place: '',
        item: []
      }
    },
    remove(id) {
      if (window.confirm('削除してよろしいですか？')) {
        this.$store.dispatch('schedules/remove', id)
      }
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
    },
    groupRooms() {
      return this.$store.getters['rooms/orderedRooms'].filter((rooms) => {
        return (rooms.room.group === this.$route.params.group)
      })
    },
    groupItems() {
      return this.$store.getters['items/orderedItems'].filter((items) => {
        return (items.item.group === this.$route.params.group)
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
.event-data {
  margin-left: 2vw;
  font-size: 14px;
  color: #555;
}
.time-form input {
  font-size: 14px;
  width: 82px;
}
.member-form, .item-form {
  > div {
    margin-left: 2vw;
    span { display: inline-block; }
    input {
      width: inherit;
      height: inherit;
    }
    label { margin-right: 12px; }
  }
}
.place-form {
  margin-bottom: 6px;
  input { margin-bottom: 6px; }
  .select {
    margin-left: 2vw;
    font-size: 14px;
  }
}

@media screen and (max-width: 540px) {
  .event-time { width: 100%; }
}

// calendar
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
  user-select: none;
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
