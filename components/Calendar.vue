<template>
  <FullCalendar
    default-view="dayGridMonth"
    :plugins="calendarPlugins"
    :height="600"
    :locale="locale"
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
      this.$router.push({
        name: 'calendar-id',
        params: { id: arg.dateStr }
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
