<template>
  <div>
    <div class="schedules">
      <h3>{{ this.$route.params.id }} の予定</h3>
      <ul>
        <li v-for="schedule in todaySchedules" :key="schedule.id">
          <span id="eventTime">
            <span>{{ schedule.event.startTime }}</span>
            <span v-if="schedule.event.startTime || schedule.event.endTime">〜</span>
            <span>{{ schedule.event.endTime }}</span>
          </span>
          <span id="eventName">{{ schedule.event.name }}</span>
          <button @click="remove(schedule.id)">削除</button>
        </li>
      </ul>
    </div>
    <div class="form">
      <h4>予定を追加する</h4>
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
        startTime: '',
        endTime: '',
        name: '',
        date: this.$route.params.id
      }
    }
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
        startTime: '',
        endTime: '',
        name: '',
        date: this.$route.params.id
      }
    },
    remove(id) {
      console.log(this.event.name)
      this.$store.dispatch('schedules/remove', id)
    }
  },
  computed: {
    todaySchedules() {
      return this.$store.getters['schedules/orderedSchedules'].filter((schedule) => {
        return (schedule.event.date === this.$route.params.id);
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
  h3 {
    display: inline-block;
    border-bottom: 2px solid #4c9181;
  }
  ul {
    padding: 0;
    margin: 16px 0;
    list-style: none;
    border: 1px solid #ddd;
    border-radius: 5px;
    li {
      padding: 6px 0;
      font-size: 18px;
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
    }
    li:nth-child(odd) {
      background: #F0FFF0;
    }
    li:nth-child(even) {
      background: #F8FFF8;
    }
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
    display: inline-block;
    border-bottom: 2px solid #4c9181;
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
    // layouts/default.vueのスタイルを使用
    width: 120px;
    margin: 20px 0 0 20px;
    font-size: 16px;
    padding: 6px;
  }
}
</style>
