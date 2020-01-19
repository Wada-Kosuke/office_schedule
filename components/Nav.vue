<template>
  <nav>
    <ul>
      <nuxt-link to="member" tag="li"><b-icon-person-fill></b-icon-person-fill></nuxt-link>
      <nuxt-link to="/" tag="li"><b-icon-gear-fill></b-icon-gear-fill></nuxt-link>
      <nuxt-link to="/" tag="li"><b-icon-box-arrow-right></b-icon-box-arrow-right></nuxt-link>
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
      font-size: 36px;
      cursor: pointer;
      margin-bottom: 10px;
    }
  }
}
</style>
