<template>
  <div class="selectGroup">
    <div class="groupList">
      <h3 class="title">グループを選択</h3>
      <ul class="list">
        <li v-for="group in groups" :key="group.id">
          <nuxt-link :to="group.name + '/' + today">{{ group.name }}</nuxt-link>
        </li>
      </ul>
    </div>
    <div class="groupForm">
      <form @submit.prevent="add" class="form">
        <h4 class="title">グループを追加</h4>
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
  width: 80%;
  margin: 40px auto;
  .list li {
    padding: 8px 2vw;
    a {
      text-decoration: none;
      color: inherit;
    }
  }
  .form input {
    font-size: 16px;
    padding: 6px;
    width: 80%;
  }
}
</style>
