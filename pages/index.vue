<template>
  <div class="selectGroup col-md-6">
    <div class="groupList">
      <h4 class="title">グループを選択</h4>
      <ul class="list">
        <li v-for="group in groups" :key="group.id">
          <nuxt-link :to="group.name + '/' + today">{{ group.name }}</nuxt-link>
          <button @click="remove(group.id)">削除</button>
        </li>
      </ul>
    </div>
    <div class="groupForm">
      <form @submit.prevent="add" class="form">
        <h5 class="title">グループを追加</h5>
        <br>
        <span>グループ名：</span>
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
      window.confirm('削除してよろしいですか？')
      // 削除するグループのスケジュールもすべて削除
      const groupSchedules = this.$store.getters['schedules/orderedSchedules'].filter((schedules) => {
        return schedules.event.group === this.groups.find(group => group.id === id).name
      })
      groupSchedules.forEach(function(schedule) {
        this.$store.dispatch('schedules/remove', schedule.id)
      }, this)
      // グループを削除
      this.$store.dispatch('groups/remove', id)
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

<style lang="scss">
.selectGroup {
  margin: 40px auto;
  .list li {
    padding: 8px 2vw;
    a {
      text-decoration: none;
      color: inherit;
    }
  }
  .groupForm {
    width: 80%;
    margin: 40px auto;
    // .formはmain.cssを適用
    .form input {
      font-size: 16px;
      padding: 6px;
      width: 80%;
    }
  }
}
</style>
