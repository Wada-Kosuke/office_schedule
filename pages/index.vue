<template>
  <div>
    <div class="groupList">
      <h3>グループを選択</h3>
      <ul>
        <li v-for="group in groups" :key="group.id">
          <nuxt-link :to="group.name">{{ group.name }}</nuxt-link>
        </li>
      </ul>
    </div>
    <div class="groupForm">
      <form @submit.prevent="add">
        <input v-model="name">
        <button class="button--green">グループを追加</button>
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
    }
  }
}
</script>
