<template>
  <form>
    <h2>New Booking</h2>
    <v-stepper v-model="e6" vertical>
      <v-stepper-step :hover="true" :complete="e6 > 1" @click="e6 = 1" step="1">
        Create a booking
        <small>Service details</small>
      </v-stepper-step>

      <v-stepper-content step="1">
        <v-card class="pa-3" outlined>
          <v-row>
            <v-col>
              <v-menu
                ref="menu"
                :close-on-content-click="false"
                :return-value.sync="date"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="date"
                    label="Date"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="date" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="menu = false">
                    Cancel
                  </v-btn>
                  <v-btn text color="primary" @click="$refs.menu.save(date)">
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="4">
              <v-select
                v-model="selectTime"
                :items="gettime"
                outlined
                label="Time"
              ></v-select>
            </v-col>
            <v-col cols="8">
              <v-select
                v-model="selectService"
                return-object
                :items="services"
                item-text="sdesc"
                outlined
                label="Service"
              ></v-select
            ></v-col>
          </v-row>
          <v-row>
            <v-col cols="4">
              <v-select
                v-model="duration"
                :items="minutes"
                outlined
                menu-props="auto"
                label="Duration(mins)"
              ></v-select>
            </v-col>
            <v-col cols="8">
              <v-select
                v-model="selectStaff"
                :items="staff"
                item-text="name"
                outlined
                label="Staff Member"
                return-object
              ></v-select
            ></v-col>
          </v-row>
        </v-card>
        <v-btn class="mt-3" color="primary" @click="e6 = 2"> Continue </v-btn>
      </v-stepper-content>

      <v-stepper-step :complete="e6 > 2" @click="e6 = 2" step="2">
        Select client
      </v-stepper-step>

      <v-stepper-content step="2">
        <v-select
          v-model="selectClient"
          :items="clients"
          return-object
          item-text="Name"
          outlined
          label="Client"
        ></v-select>
        <v-btn @click="e6 = e6 - 1" text> Back </v-btn>
        <v-btn color="primary" @click="e6 = 3"> Continue </v-btn>
      </v-stepper-content>

      <v-stepper-step step="3" @click="e6 = 3"> Confirm </v-stepper-step>
      <v-stepper-content step="3">
        <v-card color="grey lighten-4" class="mb-12" height="200px">
          <v-container>
            <v-row>
              <v-col>
                <v-card-title v-if="selectService != null">
                  {{ selectService.sdesc }}
                </v-card-title>
                <v-card-subtitle v-if="selectStaff != null" class="float-left"
                  >with {{ selectStaff.name }}</v-card-subtitle
                >
              </v-col>
              <v-col>
                <v-card-title>{{ selectTime }}</v-card-title>
                <v-card-subtitle v-if="duration != null" class="float-left"
                  >{{ duration }} minutes
                </v-card-subtitle>
              </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-row>
              <v-col>
                <v-card-subtitle v-if="selectClient != null" class="float-left"
                  >Client: {{ selectClient.Name }}</v-card-subtitle
                >
              </v-col>
            </v-row>

            <h2 class="mb-5" v-if="serviceCost != null">
              Total: ${{ serviceCost }}
            </h2>
          </v-container>
        </v-card>

        <v-btn @click="e6 = e6 - 1" text> Back </v-btn>
        <v-btn
          class="ml-4"
          color="blue-grey darken-4 white--text"
          @click="submit"
          :disabled="isDisabled"
        >
          Save Booking
        </v-btn>
      </v-stepper-content>
    </v-stepper>

    <!---  -->
  </form>
</template>
<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength, email } from 'vuelidate/lib/validators'
import loginVue from '../pages/login.vue'

export default {
  mixins: [validationMixin],

  validations: {
    name: { required, maxLength: maxLength(10) },
    email: { required, email },
    select: { required },
    checkbox: {
      checked(val) {
        return val
      },
    },
  },
  props: ['staff'],

  data: () => ({
    name: '',
    email: '',
    select: null,
    checkbox: false,
    e6: 1,
    services: [],
    clients: [],
    selectStaff: null,
    selectClient: null,
    selectTime: null,
    duration: null,
    selectService: null,
    // serviceCost: 0,
    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
  }),

  computed: {
    serviceCost() {
      if (this.selectService != null) {
        let total = (this.selectService.totalCost / 60) * this.duration
        return total.toFixed(2)
      } else return 0
    },

    gettime() {
      var x = 5 //minutes interval
      var times = [] // time array
      var tt = 0 // start time
      var ap = ['AM', 'PM'] // AM-PM

      //loop to increment the time and push results in array
      for (var i = 0; tt < 24 * 60; i++) {
        var hh = Math.floor(tt / 60) // getting hours of day in 0-24 format
        var mm = tt % 60 // getting minutes of the hour in 0-55 format
        times[i] = ('0' + (hh % 24)).slice(-2) + ':' + ('0' + mm).slice(-2) // pushing data in array in [00:00 - 12:00 AM/PM format]
        tt = tt + x
      }

      return times
    },

    isDisabled() {
      if (
        this.selectService === null ||
        this.selectClient === null ||
        this.selectService === null ||
        this.selectStaff === null ||
        this.selectTime === null ||
        this.duration === null
      ) {
        return true
      } else {
        return false
      }
    },
    minutes() {
      let mins = []
      for (let x = 0; x < 500; x += 5) {
        mins.push(x)
      }
      return mins
    },
    checkboxErrors() {
      const errors = []
      if (!this.$v.checkbox.$dirty) return errors
      !this.$v.checkbox.checked && errors.push('You must agree to continue!')
      return errors
    },
    selectErrors() {
      const errors = []
      if (!this.$v.select.$dirty) return errors
      !this.$v.select.required && errors.push('Item is required')
      return errors
    },
    nameErrors() {
      const errors = []
      if (!this.$v.name.$dirty) return errors
      !this.$v.name.maxLength &&
        errors.push('Name must be at most 10 characters long')
      !this.$v.name.required && errors.push('Name is required.')
      return errors
    },
    emailErrors() {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Must be valid e-mail')
      !this.$v.email.required && errors.push('E-mail is required')
      return errors
    },
  },

  methods: {
    /*getService() {
      fetch(
        `${process.env.baseUrl}/services/getService/serviceid=${this.selectService.serviceId}`,
        { headers: { Authorization: this.$auth.strategy.token.get() } }
      )
        .then((res) => res.json())
        .then((x) => console.log(x))
    },*/
    loadClients() {
      fetch(`${process.env.baseUrl}/client/getClientList`, {
        headers: {
          Authorization: this.$auth.strategy.token.get(),
        },
      })
        .then((response) => response.json())
        .then((x) => {
          if (x.msg) {
            alert('Invalid Token')
            this.$auth.logout()
          } else {
            this.clients = x.result
          }
        })
    },
    submit() {
      console.log(this.selectStaff)
      console.log(this.selectStaff.idStaff)
      fetch(`${process.env.baseUrl}/booking/addBooking`, {
        method: 'POST',
        headers: {
          Authorization: this.$auth.strategy.token.get(),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          serviceid: this.selectService.serviceId,
          clientid: this.selectClient.idClient,
          staffid: this.selectStaff.idStaff,
          Date: this.date,
          timestart: this.selectTime + ':00',
          minutesBilled: this.duration,
          totalCost: this.serviceCost,
        }),
      })
        .then((res) => res.json())
        .then((x) => alert('Event Saved!'))
    },
    clear() {
      this.$v.$reset()
      this.name = ''
      this.email = ''
      this.select = null
      this.checkbox = false
    },
  },

  mounted() {
    fetch(`${process.env.baseUrl}/services/getServices`, {
      headers: { Authorization: this.$auth.strategy.token.get() },
    })
      .then((res) => res.json())
      .then((x) => {
        this.services = x.result
      })
    this.loadClients()
  },
}
</script>