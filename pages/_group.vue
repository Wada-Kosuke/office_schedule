<template>
  <div>
    <Header></Header>
    <nuxt-child />
  </div>
</template>

<script>
import Header from '~/components/Header'

export default {
  validate({ params, store }) {
    return store.state.groups.groups.some(group => group.name === params.group)
  },
  components: {
    Header
  },
  computed: {
    groups() {
      return this.$store.getters['groups/orderedGroups']
    }
  }
}
</script>
