<template>
  <nav class="col-lg-6">
    <ul>
      <nuxt-link :to="today" tag="li"><b-icon-calendar></b-icon-calendar> Schedule</nuxt-link>
      <nuxt-link to="member" tag="li"><b-icon-person-fill></b-icon-person-fill> Member</nuxt-link>
      <nuxt-link to="room" tag="li"><b-icon-building></b-icon-building> Room</nuxt-link>
      <nuxt-link to="item" tag="li"><b-icon-tools></b-icon-tools> Item</nuxt-link>
      <nuxt-link to="/" tag="li"><b-icon-box-arrow-right></b-icon-box-arrow-right> Exit</nuxt-link>
    </ul>
  </nav>
</template>

<script>
import {
  BIcon, BIconCalendar, BIconPersonFill, BIconBuilding, BIconTools, BIconBoxArrowRight
} from 'bootstrap-vue'

export default {
  components: {
    BIcon, BIconCalendar, BIconPersonFill, BIconBuilding, BIconTools, BIconBoxArrowRight
  },
  computed: {
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
nav {
  margin: 30px auto;
  ul {
    padding: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
    li {
      cursor: pointer;
      margin: 8px;
      color: #444;
      svg{
        font-size: 24px;
        color: #3b8070;
      }
    }
  }
}
</style>
