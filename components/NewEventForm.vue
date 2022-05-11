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
            <v-col cols="4">
              <v-select outlined label="Time"></v-select>
            </v-col>
            <v-col cols="8">
              <v-select outlined label="Service"></v-select
            ></v-col>
          </v-row>
          <v-row>
            <v-col cols="4">
              <v-select outlined label="Duration"></v-select>
            </v-col>
            <v-col cols="8">
              <v-select outlined label="Staff Member"></v-select
            ></v-col>
          </v-row>
        </v-card>
        <v-btn class="mt-3" color="primary" @click="e6 = 2"> Continue </v-btn>
      </v-stepper-content>

      <v-stepper-step :complete="e6 > 2" step="2">
        Select client
      </v-stepper-step>

      <v-stepper-content step="2">
        <v-select outlined label="Client"></v-select>

        <v-btn color="primary" @click="e6 = 3"> Continue </v-btn>
        <v-btn @click="e6 = e6 - 1" text> Back </v-btn>
      </v-stepper-content>

      <v-stepper-step :complete="e6 > 3" step="3">
        Additional Details
        <small>Optional</small>
      </v-stepper-step>

      <v-stepper-content step="3">
        <v-card color="grey lighten-1" class="mb-12" height="200px"></v-card>
        <v-btn color="primary" @click="e6 = 4"> Continue </v-btn>
        <v-btn text @click="e6 = e6 - 1"> Cancel </v-btn>
      </v-stepper-content>

      <v-stepper-step step="4"> View setup instructions </v-stepper-step>
      <v-stepper-content step="4">
        <v-card color="grey lighten-1" class="mb-12" height="200px"></v-card>

        <v-btn @click="clear"> Cancel </v-btn>
        <v-btn
          class="mr-4"
          color="blue-grey darken-4 white--text"
          @click="submit"
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
  }),

  computed: {
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
    submit() {
      this.$v.$touch()
    },
    clear() {
      this.$v.$reset()
      this.name = ''
      this.email = ''
      this.select = null
      this.checkbox = false
    },
  },
}
</script>