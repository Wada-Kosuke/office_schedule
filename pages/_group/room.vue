<template>
  <div>
    <div class="list col-lg-6" id="target">
      <h5 class="title">{{ this.$route.params.group }} の部屋</h5>
      <p class="describe">会議室など、使用できる部屋を登録してください</p>
      <ul v-if="this.rooms != ''">
        <li v-for="room in rooms" :key="room.id">
          <span>{{ room.room.name }}</span>
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
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      room: {
        name: '',
        group: this.$route.params.group
      }
    }
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
      this.$store.dispatch('rooms/remove', id)
    }
  },
  computed: {
    rooms() {
      return this.$store.getters['rooms/orderedRooms'].filter((rooms) => {
        return (rooms.room.group === this.$route.params.group)
      })
    }
  }
}
</script>
