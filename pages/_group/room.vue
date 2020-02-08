<template>
  <div>
    <div class="list col-lg-6" id="target">
      <h5 class="title">{{ this.$route.params.group }} の部屋</h5>
      <p class="describe">会議室など、使用できる部屋を登録してください</p>
      <ul v-if="this.rooms != ''">
        <li v-for="room in rooms" :key="room.id">
          <span @click="show(room.room.name)">{{ room.room.name }}</span>
          <button @click="remove(room.id)">削除</button>
        </li>
      </ul>
      <h6 v-else>まだ登録されている部屋はありません</h6>
    </div>
    <div class="form col-lg-5">
      <form @submit.prevent="add">
        <h5 class="title">部屋を追加</h5>
        <br>
        <span>名前：</span>
        <input v-model="room.name">
        <br>
        <button class="button--green">追加</button>
      </form>
    </div>
    <transition name="modal">
      <ScheduleModal
        v-if="scheduleModal"
        attr="room"
        :name=scheduleModal
        @close="close"
      ></ScheduleModal>
    </transition>
  </div>
</template>

<script>
import ScheduleModal from '~/components/ScheduleModal'

export default {
  data: function() {
    return {
      room: {
        name: '',
        group: this.$route.params.group
      },
      scheduleModal: ''
    }
  },
  components: {
    ScheduleModal
  },
  created: function() {
    this.$store.dispatch('rooms/init')
  },
  methods: {
    add() {
      if ( this.room.name == '' ) {
        return
      }
      this.$store.dispatch('rooms/add', this.room)
      this.room.name = ''
      document.getElementById("target").scrollIntoView(true)
    },
    remove(id) {
      if (window.confirm('削除してよろしいですか？')) {
        this.$store.dispatch('rooms/remove', id)
      }
    },
    show(name) {
      this.scheduleModal = name
    },
    close() {
      this.scheduleModal = ''
    }
  },
  computed: {
    rooms() {
      return this.$store.getters['rooms/orderedRooms'].filter((rooms) => {
        return (rooms.room.group == this.$route.params.group)
      })
    }
  }
}
</script>
