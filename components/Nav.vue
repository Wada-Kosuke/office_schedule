<template>
  <nav>
    <ul>
      <nuxt-link to="member" tag="li">Member</nuxt-link>
      <nuxt-link to="room" tag="li">Room</nuxt-link>
      <nuxt-link to="item" tag="li">Item</nuxt-link>
      <nuxt-link to="/" tag="li">Exit</nuxt-link>
    </ul>
  </nav>
</template>

<script>
import { BIcon, BIconPersonFill, BIconGearFill, BIconBoxArrowRight } from 'bootstrap-vue'

export default {
  components: {
    BIcon,
    BIconPersonFill,
    BIconGearFill,
    BIconBoxArrowRight
  }
}

</script>

<style lang="scss">
nav {
  position: absolute;
  top: 40%;
  ul {
    height: 200px;
    li {
      font-size: 20px;
      cursor: pointer;
      margin-bottom: 10px;
    }
  }
}
</style>
