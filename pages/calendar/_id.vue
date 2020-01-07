<template>
  <div>
    <ul>
      <li v-for="event in $store.state.events" :key="event.id">{{ event }}</li>
    </ul>
    <p>id: {{ this.$route.params.id }}</p>
    <form @submit.prevent="add(content)">
      <input v-model="content">
      <button>submit</button>
    </form>
  </div>
</template>

<script>
export default {
  data: function() {
    return{
      content: '',
      events: []
    }
  },
  methods: {
    add() {
      this.$store.commit('add', this.content)
      this.content = ''
    }
  }
}
</script>
