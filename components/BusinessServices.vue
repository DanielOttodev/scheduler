<template>
  <v-container>
    <v-row justify="center">
      <v-tabs v-model="tab" centered fixed-tabs>
        <v-tab> Classes </v-tab>
        <v-tab> Appointments </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item>
          <v-date-picker
            :allowed-dates="disablePastDates"
            v-model="picker"
            no-title
            full-width
            color="teal lighten-4"
            ref="datePick"
            class="mt-4"
          ></v-date-picker>
          <v-row justify="center">
            <v-col cols="4"> <v-divider></v-divider></v-col>
            <v-col cols="4"
              ><h3 color class="text-center mb-5 teal--text">
                {{ checkDate }}
              </h3></v-col
            >
            <v-col cols="4"> <v-divider></v-divider></v-col>
          </v-row>
          <BusinessClasses />
        </v-tab-item>
        <v-tab-item> <BusinessBookingsList /> </v-tab-item>
      </v-tabs-items>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      picker: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      readDate: new Date(this.picker)
        .toLocaleString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'long',
        })
        .toString(),
      tab: null,
    }
  },
  computed: {
    checkDate() {
      let x = new Date(this.picker).toLocaleString('en-US', {
        weekday: 'short',

        month: 'long',
        day: 'numeric',
      })
      return x
    },
  },
  methods: {
    disablePastDates(val) {
      return val >= new Date().toISOString().substr(0, 10)
    },
  },
}
</script>
<style>
.v-picker__title__btn {
  color: rgb(255, 255, 255) !important;
}
</style>