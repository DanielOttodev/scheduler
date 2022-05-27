<template>
  <v-row class="fill-height">
    <v-col>
      <v-sheet height="64">
        <v-toolbar flat>
          <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday">
            Today
          </v-btn>
          <v-btn fab text small color="grey darken-2" @click="prev">
            <v-icon small> mdi-chevron-left </v-icon>
          </v-btn>
          <v-btn fab text small color="grey darken-2" @click="next">
            <v-icon small> mdi-chevron-right </v-icon>
          </v-btn>
          <v-toolbar-title v-if="$refs.calendar">
            {{ $refs.calendar.title }}
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-row justify="end">
            <v-btn
              outlined
              class="mr-4"
              color="grey darken-2"
              @click.stop="rightDrawer = !rightDrawer"
            >
              Create
            </v-btn>
          </v-row>
        </v-toolbar>
      </v-sheet>
      <v-sheet height="700">
        <v-calendar
          v-if="users.length > 0"
          ref="calendar"
          v-model="pickerDate"
          color="primary"
          type="category"
          event-overlap-mode="column"
          category-show-all
          interval-count="24"
          interval-height="30"
          interval-minutes="60"
          :categories="filterUser"
          :events="events"
          :event-color="getEventColor"
          @change="fetchEvents"
          @click:event="showEvent"
        ></v-calendar>
        <v-card v-else
          ><v-card-title>There aren't any staff</v-card-title></v-card
        >
      </v-sheet>
    </v-col>
    <!---Event Modal-->
    <v-menu
      v-model="selectedOpen"
      :close-on-content-click="false"
      :activator="selectedElement"
      offset-x
    >
      <v-card color="grey lighten-4" min-width="350px" flat>
        <v-toolbar :color="selectedEvent.color" dark>
          <v-btn icon>
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
          <span v-html="selectedEvent.details"></span>
        </v-card-text>
        <v-card-actions>
          <v-btn text color="secondary" @click="selectedOpen = false">
            Cancel
          </v-btn>
          <v-row justify="end">
            <v-btn text color="red"> Remove </v-btn>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-menu>
    <v-navigation-drawer
      width="800"
      v-model="rightDrawer"
      :right="!right"
      temporary
      fixed
    >
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light> mdi-repeat </v-icon>
          </v-list-item-action>
          <v-list-item-title>
            <h2 id="formHeader">
              What kind of event is this?
            </h2></v-list-item-title
          >
        </v-list-item>
      </v-list>
      <v-container>
        <v-row>
          <v-col align-self="center">
            <v-card
              @click="toggleSelect"
              :hover="true"
              p-3
              class="mx-auto pa-3"
              max-width="180"
            >
              <v-icon mt-1 color="primary" ref="bookingCard" large
                >event</v-icon
              >
              <v-card-subtitle>Booking</v-card-subtitle>
            </v-card>
          </v-col>
          <v-col @click="toggleSelect" align-self="center"
            ><v-card
              :outlined="true"
              :hover="true"
              max-width="180"
              class="mx-auto pa-3"
            >
              <v-icon ref="classCard" color="grey" large>groupadd</v-icon>
              <v-card-subtitle>Class</v-card-subtitle>
            </v-card></v-col
          >
        </v-row>
        <v-divider class="mt-5"></v-divider>
        <v-row class="mt-5">
          <v-col>
            <NewEventForm :staff="users" />
          </v-col>
        </v-row>
      </v-container>
    </v-navigation-drawer>
  </v-row>
</template>
<script>
import NewEventForm from './NewEventForm.vue'

export default {
  props: ['users', 'filterUser', 'pickerDate'],
  components: { NewEventForm },
  data: () => ({
    right: null,
    focus: '',
    events: [],
    colors: [
      'blue',
      'indigo',
      'deep-purple',
      'cyan',
      'green',
      'orange',
      'grey darken-1',
    ],
    names: [
      'Meeting',
      'Holiday',
      'PTO',
      'Travel',
      'Event',
      'Birthday',
      'Conference',
      'Party',
    ],
    //  categories: [],
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    rightDrawer: false,
  }),
  mounted() {
    this.$refs.calendar.checkChange()
  },
  methods: {
    toggleSelect() {
      console.log('Hello')
      this.$refs.bookingCard.color = 'green'
    },

    test() {
      console.log(this.$refs.calendar.start)
      console.log(this.$refs.calendar.end)
      console.log(this.events)
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event
        this.selectedElement = nativeEvent.target
        requestAnimationFrame(() =>
          requestAnimationFrame(() => (this.selectedOpen = true))
        )
      }

      if (this.selectedOpen) {
        this.selectedOpen = false
        requestAnimationFrame(() => requestAnimationFrame(() => open()))
      } else {
        open()
      }

      nativeEvent.stopPropagation()
    },
    getEventColor(event) {
      return event.color
    },
    setToday() {
      this.focus = ''
    },
    prev() {
      this.$refs.calendar.prev()
    },
    next() {
      this.$refs.calendar.next()
    },
    fetchEvents({ start, end }) {
      const events = []
      console.log(start.date, end.date)
      const min = new Date(`2022-05-26T00:00:01`)
      const max = new Date(`${end.date}T23:59:59`)
      const days = (max.getTime() - min.getTime()) / 86400000
      const eventCount = this.rnd(days, days + 20)

      for (let i = 0; i < eventCount; i++) {
        const allDay = this.rnd(0, 3) === 0
        const firstTimestamp = this.rnd(min.getTime(), max.getTime())
        const first = new Date(firstTimestamp - (firstTimestamp % 900000))

        const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000
        const second = new Date(first.getTime() + secondTimestamp)

        events.push({
          name: this.names[this.rnd(0, this.names.length - 1)],
          start: '2022-05-27 10:00:00',
          end: '2022-05-27 11:00:00',
          width: 200,
          color: this.colors[this.rnd(0, this.colors.length - 1)],
          timed: true,
          category: this.users[this.rnd(0, this.users.length - 1)],
          details: `Customer needs a haircut`,
        })
      }

      this.events = events
      console.log(this.events)
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a
    },
  },
}
</script>
<style>
.v-calendar-category__column-header {
  background-color: #f8f7ff;
  height: 30px;
}
.v-calendar-daily_head-day {
  background-color: #f8f7ff;
  color: white;
}
#formHeader {
  font-family: sans-serif;
  color: #b0bec5;
}
</style>