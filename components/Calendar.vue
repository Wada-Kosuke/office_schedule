<template>
  <!-- :local="locale"　を追加すると日本語化 -->
  <FullCalendar
    default-view="dayGridMonth"
    :plugins="calendarPlugins"
    :height="280"
    @dateClick="goToDatePage"
  />
</template>

<script>
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import jaLocale from '@fullcalendar/core/locales/ja'

export default {
  components: {
    FullCalendar
  },
  data () {
    return {
      locale: jaLocale,
      calendarWeekends: true,
      calendarPlugins: [
        dayGridPlugin,
        timeGridPlugin,
        interactionPlugin
      ]
    }
  },
  methods: {
    goToDatePage (arg) {
      document.getElementById("target").scrollIntoView(true)
      this.$router.push({
        name: 'group-date',
        params: { date: arg.dateStr }
      });
    }
  }
}
</script>
<style>
@import '~/node_modules/@fullcalendar/core/main.css';
@import '~/node_modules/@fullcalendar/daygrid/main.css';
@import '~/node_modules/@fullcalendar/timegrid/main.css';
</style>
