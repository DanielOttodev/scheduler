<template>
  <v-row>
    <v-col class="text-center">
      <v-row class="mt-3">
        <v-col class="blue-grey lighten-5" cols="12" sm="12" lg="3">
          <v-card height="100%" :dark="true">
            <v-date-picker
              class="mt-5"
              :dark="false"
              elevation="15"
              v-model="picker"
            ></v-date-picker>
            <v-card-subtitle>Select Date</v-card-subtitle>
            <v-tabs
              v-model="tab"
              background-color="transparent"
              color="basil"
              grow
            >
              <v-tab v-for="item in items" :key="item">
                {{ item }}
              </v-tab>
            </v-tabs>
            <v-container>
              <v-tabs-items v-model="tab">
                <v-tab-item v-for="item in items" :key="item">
                  <v-card :rounded="true" color="blue-grey lighten-5" flat>
                    <v-card-text v-if="item === 'Staff'">
                      <v-checkbox
                        v-for="item in staffName"
                        :key="item"
                        v-model="selected"
                        :label="item"
                        :value="item"
                      ></v-checkbox>
                    </v-card-text>
                    <v-card-text v-if="item === 'Category'">
                      <v-checkbox
                        v-for="item in category"
                        :key="item"
                        v-model="selectedCategory"
                        :label="item"
                        :value="item"
                      ></v-checkbox>
                    </v-card-text>
                  </v-card>
                </v-tab-item>
              </v-tabs-items>
            </v-container>
          </v-card>
        </v-col>
        <v-col cols="12" sm="12" lg="9">
          <Calendar
            v-if="staffName.length > 0"
            :pickerDate="picker"
            :users="staffName"
            :filterUser="selected"
            :events="bookings"
            :allstaff="staff"
          />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'Bookings',

  data: () => ({
    bookings: [],
    tab: null,
    staff: null,
    staffName: [],
    category: ['Class', 'Appointment'],
    selected: [],
    selectedCategory: [],
    items: ['Staff', 'Category'],
    text: 'Filter by User',
    picker: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    //picker2: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
  }),
  methods: {
    allowedDates: (val) => parseInt(val.split('-')[2], 10) % 2 === 0,

    loadStaff() {
      fetch(`${process.env.baseUrl}/staff/getStaff`, {
        method: 'GET',
        headers: {
          Authorization: this.$auth.strategy.token.get(),
        },
      })
        .then((response) => response.json())
        .then((x) => {
          this.staff = x.result
          for (let y = 0; y < x.result.length; y++) {
            this.staffName.push(x.result[y].name)
          }
        })
    },
    loadEvents() {
      fetch(`${process.env.baseUrl}/booking/getBookings`, {
        method: 'GET',
        headers: {
          Authorization: this.$auth.strategy.token.get(),
        },
      })
        .then((response) => response.json())
        .then((x) => {
          console.log(x.result)

          for (let y = 0; y < x.result.length; y++) {
            console.log(
              `${x.result[y].Date.split('T')[0]}T${x.result[y].TimeStart}`
            )
            let startDate = new Date(
              `${x.result[y].Date.split('T')[0]}T${x.result[y].TimeStart}`
            )

            let setDate = new Date(startDate)
            console.log('set', setDate)
            console.log('startd', startDate)
            setDate.setMinutes(startDate.getMinutes() + x.result[y].Duration)
            console.log('set2', setDate)

            let endDate = new Date(setDate).toLocaleTimeString().substring(0, 4)
            if (endDate.split(':')[0].length === 1) {
              endDate = '0' + endDate
            }
            console.log(`${x.result[y].Date.split('T')[0]} ${endDate}`)

            this.bookings.push({
              name: x.result[y].Description,
              start: `${x.result[y].Date.split('T')[0]} ${
                x.result[y].TimeStart
              }`,
              end: `${x.result[y].Date.split('T')[0]} ${endDate}`,
              width: 200,
              color: 'blue',
              timed: true,
              category: x.result[y].name,
              details: x.result[y].sdesc,
            })
          }
          console.log(this.bookings)
        })
    },
  },
  mounted() {
    this.loadStaff()
    this.loadEvents()
  },
}
</script>
