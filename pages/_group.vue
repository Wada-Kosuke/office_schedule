<template>
  <div>
    <Nav></Nav>
    <nuxt-child />
  </div>
</template>

<script>
import Nav from '~/components/Nav'

export default {
  validate({ params, store }) {
    return store.state.groups.groups.some(group => group.name === params.group)
  },
  components: {
    Nav
  },
  computed: {
    groups() {
      return this.$store.getters['groups/orderedGroups']
    }
  }
}
</script>
