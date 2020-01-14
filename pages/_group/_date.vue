<template>
  <div>
    <div class="schedules">
      <h3 class="title">{{ this.$route.params.date }} の予定</h3>
      <ul v-if="this.schedules != ''" class="list">
        <li v-for="schedule in schedules" :key="schedule.id">
          <span id="eventTime">
            <span>{{ schedule.event.startTime }}</span>
            <span v-if="schedule.event.startTime || schedule.event.endTime">〜</span>
            <span>{{ schedule.event.endTime }}</span>
          </span>
          <span id="eventName">{{ schedule.event.name }}</span>
          <button @click="remove(schedule.id)">削除</button>
        </li>
      </ul>
      <h4 v-else>まだ予定はありません</h4>
    </div>
    <div class="form">
      <h4 class="title">予定を追加する</h4>
      <form @submit.prevent="add">
        <span id="timeForm">
          <span>時間</span>
          <input v-model="event.startTime" name="startTime" type="time">
          <span>〜</span>
          <input v-model="event.endTime" name="endTime" type="time">
        </span>
        <br>
        <span>内容</span>
        <input v-model="event.name" id="nameForm">
        <br>
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
        name: ''
      }
    }
  },
  validate({ params }) {
    return /^\d{4}-\d{2}-\d{2}$/.test(params.date)
  },
  created: function() {
    this.$store.dispatch('schedules/init')
  },
  methods: {
    add() {
      if ( this.event.name == '' ) {
        return
      }
      this.$store.dispatch('schedules/add', this.event)
      this.event = {
        group: this.$route.params.group,
        date: this.$route.params.date,
        startTime: '',
        endTime: '',
        name: ''
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
        );
      });
    }
  }
}
</script>

<style lang="scss">
.schedules {
  width: 80vw;
  margin: 5vh auto;
  padding: 20px;
  background: #fff;
  border: 1px solid #aaa;
  border-radius: 5px;
  #eventTime {
    width: 120px;
    font-size: 14px;
    display: inline-block;
    margin-left: 2.5vw;
  }
  #eventName {
    margin-right: 20px;
  }
  h4 {
    margin: 20px 0 0 2vw;
  }
}
.form {
  width: 60vw;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #aaa;
  border-radius: 5px;
  h4 {
    margin-bottom: 20px;
  }
  input {
    margin-bottom: 10px;
  }
  #timeForm input {
    font-size: 14px;
    padding: 4px;
  }
  #nameForm {
    font-size: 16px;
    padding: 6px;
    width: 90%;
  }
  button {
    width: 120px;
    margin: 20px 0 0 20px;
    font-size: 16px;
    padding: 6px;
  }
}
</style>
