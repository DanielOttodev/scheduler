<template >
  <v-container>
    <div class="pb-4" style="overflow: auto">
      <h1 class="text-center">View Appointment</h1>
      <v-btn
        @click="$router.go(-1)"
        text
        :rounded="true"
        outlined
        class="float-right align-center"
        ><v-icon>mdi-close</v-icon></v-btn
      >
    </div>
    <v-divider></v-divider>
    <v-row>
      <v-col lg="9" sm="12">
        <h2 class="mt-2">Tuesday, 08 Feb 2022</h2>
        <v-container>
          <EventTable />
        </v-container>
        <h3 class="mt-2">History</h3>
        <p>Booking Reference: AKJ3H827CJ</p>
      </v-col>
      <!--  <v-divider vertical class="mt-3"> </v-divider>  -->
      <v-col lg="3" sm="12">
        <v-sheet>
          <v-sheet outlined class="pa-4">
            <v-row>
              <v-col cols="3">
                <v-avatar size="80">
                  <v-img
                    max-height="80"
                    max-width="80"
                    src="https://pbs.twimg.com/profile_images/2364560527/captain_jack_sparrow_400x400.jpg"
                  ></v-img>
                </v-avatar>
              </v-col>
              <v-col cols="9">
                <v-card-title>Jack Sparrow</v-card-title>
                <v-card-subtitle>sparrow@seabird.com</v-card-subtitle>
                <v-card-text>0413 864 377</v-card-text>
              </v-col>
            </v-row>
            <v-row justify="end">
              <v-btn @click.stop="rightDrawer = !rightDrawer" text small pill>
                <v-icon :right="true">mdi-arrow-right</v-icon></v-btn
              >
            </v-row>
          </v-sheet>
          <v-container>
            <v-row>
              <v-select v-model="defaultSelect" solo :items="eventStatus">
              </v-select>
              <!---
              <v-select :items="eventStatus" label="Status" outlined>
                <template #selection="{ item }">
                 <v-icon> {{ getItemIcon(item) }} </v-icon>  <p class="text--center">
                    {{ item }}
                  </p>
                </template>
              </v-select> -->
            </v-row>
          </v-container>
        </v-sheet>
      </v-col>
      <v-navigation-drawer
        width="800"
        v-model="rightDrawer"
        :right="!right"
        temporary
        fixed
        class="blue-grey darken-4"
      >
        <ClientProfile />
      </v-navigation-drawer>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'event',
  data: () => ({
    defaultSelect: 'New',
    eventStatus: ['New', 'Started', 'Finished', 'Cancelled'],
    rightDrawer: false,
  }),
  methods: {
    getItemIcon(item) {
      console.log(item)
      if (item === 'New') {
        return 'mdi-account'
      }
    },
  },
}
</script>
