<template>
  <div>
    <div class="calender col-lg-6">
      <VCalendar></VCalendar>
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
          <button @click="openEditModal(schedule)">編集</button>
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
    <transition name="modal">
      <EditModal
        v-if="editModal"
        :schedule="editModal"
        :groupMembers=groupMembers
        :groupRooms=groupRooms
        :groupItems=groupItems
        @close="close"
        @edit="edit"
      ></EditModal>
    </transition>
  </div>
</template>

<script>
import EditModal from '~/components/EditModal'
import VCalendar from '~/components/VCalendar'

export default {
  data: function() {
    return {
      event: {
        group: this.$route.params.group,
        date: '',
        startTime: '',
        endTime: '',
        name: '',
        member: [],
        place: '',
        item: []
      },
      editModal: ''
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
  components: {
    EditModal,
    VCalendar
  },
  methods: {
    check(event, schedules) { // schedules内からeventをチェック
      // イベントの内容が空欄でないか
      if (event.name === '') {
        return false
      }
      // 開始時刻より終了時刻が小さい場合はreturn
      if (event.endTime && event.startTime > event.endTime) {
        alert('時間が適切ではありません')
        return false
      }
      // 参加者の時間、場所、アイテムの重複確認の処理
      for (let i = 0; i < schedules.length; i++) {
        const existingEventStartTime    = schedules[i].event.startTime
        const existingEventEndTime      = schedules[i].event.endTime
        const newEventStartTime         = event.startTime
        const newEventEndTime           = event.endTime
        // 時間が重複しているイベントがあるか
        if (existingEventStartTime <= newEventEndTime && existingEventEndTime >= newEventStartTime == true) {
          const existingEventMember    = schedules[i].event.member
          const newEventMember         = event.member
          const existingEventItem      = schedules[i].event.item
          const newEventItem           = event.item
          // メンバーが重複していないか
          if ([...existingEventMember, ...newEventMember].filter(member =>
            existingEventMember.includes(member) && newEventMember.includes(member)).length > 0
            && window.confirm(`${schedules[i].event.name}とメンバーが重複しています。\nこのまま予定を登録してよろしいですか？`)
            == false) {
              return false
            }
            // 場所が重複していないか
            if (event.place != '' &&
            event.place == schedules[i].event.place &&
            window.confirm(`${schedules[i].event.name}と場所が重複しています。\nこのまま予定を登録してよろしいですか？`)
            == false) {
              return false
            }
            // 使用するアイテムが重複していないか
            if ([...existingEventItem, ...newEventItem].filter(item =>
              existingEventItem.includes(item) && newEventItem.includes(item)).length > 0
              && window.confirm(`${schedules[i].event.name}と使用するアイテムが重複しています。\nこのまま予定を登録してよろしいですか？`)
              == false) {
                return false
              }
            }
          }
    },
    add() {
      this.event.date = this.$route.params.date
      if (this.check(this.event, this.schedules) != false) {
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
        document.getElementById("target").scrollIntoView(true)
      }
    },
    openEditModal(schedule) {
      this.editModal = schedule
    },
    close() {
      this.editModal = ''
    },
    edit(arg) {
      const otherSchedules = this.schedules.filter((schedule) => {
        return (schedule.id != arg.schedule.id)
      })
      this.check(arg.editedEvent, otherSchedules)
      this.$store.dispatch('schedules/edit', arg)
      this.editModal = ''
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
  margin-right: 24px;
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
  .vc-container { margin: auto; }
  p {
    margin-top: 12px;
    text-align: center;
    color: #555;
  }
}
</style>
