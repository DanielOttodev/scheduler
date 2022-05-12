<template>
  <v-container>
    <v-container v-if="services.length > 0">
      <v-sheet v-for="(item, i) in services" :key="i">
        <v-row>
          <v-col cols="6">
            <v-row align="center" justify="center">
              <v-col class="d-flex justify-end">
                <v-card>
                  <v-img
                    max-height="100"
                    max-width="150"
                    src="https://media1.popsugar-assets.com/files/thumbor/WoXGvbj4le-XQgSlRfhSfbTAoOA/862x0:5692x4830/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2019/07/16/731/n/1922729/85d1ce265d2dfc639070a3.22857928_/i/25-Minute-Total-Body-Strength-Workout.jpg"
                  ></v-img>
                </v-card>
              </v-col>
              <v-col>
                <h3>{{ item.service }}</h3>
                <h2>60 Min Casual Session</h2>
                <small>Emma Skye</small>
              </v-col>
            </v-row>
          </v-col>
          <v-divider vertical></v-divider>

          <v-col cols="6">
            <v-row align="center">
              <v-col cols="6">
                <v-sheet class="pl-5">
                  <h3>5:30pm</h3>
                  <p>Doreen</p>
                  <small>{{ checkDate }}</small>
                </v-sheet>
              </v-col>
              <v-col cols="6" class="d-flex">
                <h3>$45</h3>
                <v-btn x-large class="ml-5 teal darken-3 white--text"
                  >Book</v-btn
                ></v-col
              >
            </v-row>
          </v-col>
          <small style="color: white">.</small>
          <v-divider></v-divider>
        </v-row>
      </v-sheet>
    </v-container>
    <v-container v-else>
      <h2 class="text-center">No classes to show for this date</h2></v-container
    >
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      services: [
        { service: 'Pilates' },
        { service: 'Yoga' },
        { service: 'Pilates' },
      ],
    }
  },
}
</script>
