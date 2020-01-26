<template>
  <div>
    <div class="describe">
      <p>グループのスケジュールを管理するwebアプリです。</p>
      <p>ダブルブッキングが起こらないよう、他の予定とメンバー等が重複する場合には確認ダイアログを表示するようにしてあります。</p>
    </div>
    <div class="list col-lg-6">
      <h4 class="title">グループを選択</h4>
      <ul>
        <li v-for="group in groups" :key="group.id">
          <nuxt-link :to="group.name + '/' + today">{{ group.name }}</nuxt-link>
          <button @click="remove(group.id)">削除</button>
        </li>
      </ul>
    </div>
    <div class="form col-lg-5">
      <form @submit.prevent="add">
        <h5 class="title">グループを追加</h5>
        <br>
        <span>グループ名</span>
        <input v-model="name">
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
      name: ''
    }
  },
  created: function() {
    this.$store.dispatch('groups/init')
    this.$store.dispatch('schedules/init')
  },
  methods: {
    add() {
      if ( this.name == '' ) {
        return
      }
      this.$store.dispatch('groups/add', this.name)
      this.name = ''
    },
    remove(id) {
      if (window.confirm('削除してよろしいですか？')) {
        // 削除するグループのスケジュールもすべて削除
        const groupSchedules = this.$store.getters['schedules/orderedSchedules'].filter(schedules => {
          return schedules.event.group === this.groups.find(group => group.id === id).name
        })
        groupSchedules.forEach(function(schedule) {
          this.$store.dispatch('schedules/remove', schedule.id)
        }, this)
        // グループを削除
        this.$store.dispatch('groups/remove', id)
      }
    }
  },
  computed: {
    groups() {
      return this.$store.getters['groups/orderedGroups']
    },
    today() {
      let date = new Date();
      let y = date.getFullYear();
      let m = ("00" + (date.getMonth()+1)).slice(-2);
      let d = ("00" + date.getDate()).slice(-2);
      return y + '-' + m + '-' + d;
    }
  }
}
</script>

<style lang="scss" scoped>
.describe {
  text-align: center;
  margin-top: 30px;
}
.groupList {
  margin: 40px auto 20px;
}
</style>
