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
            <v-col cols="5"> <v-divider></v-divider></v-col>
            <v-col cols="2"
              ><h3 color class="text-center mb-5 teal--text">
                {{ picker }}
              </h3></v-col
            >
            <v-col cols="5"> <v-divider></v-divider></v-col>
          </v-row>

          <v-container>
            <v-row v-for="(item, i) in services" :key="i">
              <v-col cols="6">
                <v-row justify="center">
                  <v-card class="mr-5">
                    <v-img
                      max-height="100"
                      max-width="100"
                      src="https://media1.popsugar-assets.com/files/thumbor/WoXGvbj4le-XQgSlRfhSfbTAoOA/862x0:5692x4830/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2019/07/16/731/n/1922729/85d1ce265d2dfc639070a3.22857928_/i/25-Minute-Total-Body-Strength-Workout.jpg"
                    ></v-img>
                  </v-card>
                  <v-col>
                    <h3>{{ item.service }}</h3>
                    <h2>60 Min Casual Session</h2>
                    <small>Emma Skye</small>
                  </v-col>
                </v-row>
              </v-col>
              <v-divider vertical></v-divider>
              <v-col cols="6"></v-col>
            </v-row>
          </v-container>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <h3>Another Tab!</h3>
          </v-card>
        </v-tab-item>
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
      readDate: this.$refs.datePick,
      tab: null,
      services: [{ service: 'Pilates' }],
    }
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