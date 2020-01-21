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
    padding: 0;
    li {
      font-size: 20px;
      cursor: pointer;
      margin-bottom: 10px;
    }
  }
}

@media screen and (max-width: 993px) {
  nav { left: 15%; }
}
@media screen and (max-width: 720px) {
  nav {
    position: static;
    ul {
      margin-top: 20px;
      height: inherit;
      display: flex;
      justify-content: space-around;
      align-items: center;
      flex-wrap: wrap;
      li {
        padding: 8px 0;
        border: 1px solid #555;
        color: #555;
        border-radius: 4px;
        width: 110px;
        text-align: center;
      }
    }
  }
}
@media screen and (max-width: 540px) {
  nav ul li { width: 40%; }
}
</style>
