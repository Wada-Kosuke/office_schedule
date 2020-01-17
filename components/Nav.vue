<template>
  <nav>
    <ul>
      <nuxt-link to="/" tag="li"><b-icon-house-fill></b-icon-house-fill></nuxt-link>
      <nuxt-link to="/" tag="li"><b-icon-person-fill></b-icon-person-fill></nuxt-link>
      <nuxt-link to="/" tag="li"><b-icon-gear-fill></b-icon-gear-fill></nuxt-link>
    </ul>
  </nav>
</template>

<script>
import { BIcon, BIconHouseFill, BIconPersonFill, BIconGearFill } from 'bootstrap-vue'

export default {
  components: {
    BIcon,
    BIconHouseFill,
    BIconPersonFill,
    BIconGearFill
  }
}

</script>

<style lang="scss">
nav {
  position: absolute;
  top: 40%;
  ul {
    list-style: none;
    height: 200px;
    li {
      font-size: 36px;
      cursor: pointer;
      margin-bottom: 10px;
    }
  }
}
</style>
