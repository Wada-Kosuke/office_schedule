<template>
  <div class="modal">
    <div @click="close" class="modal-bg"></div>
    <div class="form modal-content col-lg-6 col-10">
      <div class="modal-body">
        <div class="modal-title">
          <h5 class="title">予定を編集する</h5>
        </div>
        <form @submit.prevent="edit(schedule, editedEvent)">
          <div class="time-form">
            <span class="form-label">時間</span>
            <input v-model="editedEvent.startTime" name="startTime" type="time">
            <span>〜</span>
            <input v-model="editedEvent.endTime" name="endTime" type="time">
          </div>
          <div class="name-form">
            <span class="form-label">内容</span>
            <input v-model="editedEvent.name">
          </div>
          <div class="member-form">
            <span class="form-label">参加者</span>
            <div>
              <span v-for="member in groupMembers" :key="member.id">
                <input v-model="editedEvent.member" type="checkbox" name="member" :value="member.member.name">
                <label for="member">{{ member.member.name }}</label>
              </span>
            </div>
          </div>
          <div class="place-form">
            <span class="form-label">場所</span>
            <input v-model="editedEvent.place"><br>
            <span class="select">登録した部屋から選択：</span>
            <select v-model="editedEvent.place">
              <option v-for="room in groupRooms" :key="room.id" :value="room.room.name">
                {{ room.room.name }}
              </option>
            </select>
          </div>
          <div class="item-form">
            <span class="form-label">アイテム</span>
            <div>
              <span v-for="item in groupItems" :key="item.id">
                <input v-model="editedEvent.item" type="checkbox" name="item" :value="item.item.name">
                <label for="item">{{ item.item.name }}</label>
              </span>
            </div>
          </div>
          <button class="button--green">編集</button>
        </form>
        <button @click="close" class="button--green cansel-button">キャンセル</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['schedule', 'groupMembers', 'groupRooms', 'groupItems'],
  data: function() {
    return {
      editedEvent: Object.assign({}, this.schedule.event)
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    edit(schedule, editedEvent) {
      this.$emit('edit', {schedule: schedule, editedEvent: editedEvent})
    }
  }
}
</script>

<style scoped>
button { transform: translateY(30px); }
.cansel-button {
  transform: translate(160px, -20px);
  display: relative;
}
</style>
