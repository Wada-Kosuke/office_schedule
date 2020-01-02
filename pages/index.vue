<template>
  <section class="section">
    <full-calendar></full-calendar>
  </section>
</template>

<script>
export default {
  name: 'Schedule'
}
</script>

<style>
.fc {
  width: 80vw;
  margin: auto;
}
.fc-day {
  cursor: pointer;
}
</style>
