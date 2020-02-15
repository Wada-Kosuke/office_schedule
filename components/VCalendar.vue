<template>
  <DatePicker
    color="green"
    is-inline
    v-model="date"
  ></DatePicker>
</template>

<script>
import DatePicker from 'v-calendar/lib/components/date-picker.umd'

export default {
  data: function() {
    return {
      date: new Date()
    }
  },
  components: {
    DatePicker
  },
  watch: {
    date: function() {
      this.goToDatePage()
    }
  },
  methods: {
    goToDatePage () {
      if (this.date) {
        const year = this.date.getFullYear()
        const month = ("0" + (this.date.getMonth() + 1)).slice(-2)
        const date = ("0" + this.date.getDate()).slice(-2)
        const ymd = `${year}-${month}-${date}`
        this.$router.push({
          name: 'group-date',
          params: { date: ymd }
        })
        document.getElementById("calendar-nav").classList.add("active")
        document.getElementById("target").scrollIntoView(true)
      }
    }
  }
}
</script>
