<template>
  <v-container>
    <v-row class="blue-grey lighten-5">
      <v-col>
        <v-card class="pa-3 text-center">
          <v-container>
            <v-row>
              <v-col>
                <v-avatar size="200">
                  <v-img
                    max-height="200"
                    max-width="200"
                    src="https://pbs.twimg.com/profile_images/2364560527/captain_jack_sparrow_400x400.jpg"
                  ></v-img>
                </v-avatar>
                <h3 class="large mt-2">{{ clientName }}</h3>
                <p>Birthday: 01 Dec 1996</p>
                <p>Member since: 01 May 22</p>
                <v-btn text class="ma-1 primary--text" flat small>Edit</v-btn>
                <v-btn text class="ma-1 red--text" flat small>Remove</v-btn>
              </v-col>
              <v-divider vertical></v-divider>
              <v-col>
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title>Phone</v-list-item-title>
                    <v-list-item-subtitle>+61 413 864 377</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title>Email</v-list-item-title>
                    <v-list-item-subtitle
                      >sparrow@seabird.com</v-list-item-subtitle
                    >
                  </v-list-item-content>
                </v-list-item>
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title>Address</v-list-item-title>
                    <v-list-item-subtitle
                      >123 MeHearty Lane, Oceanview</v-list-item-subtitle
                    >
                  </v-list-item-content>
                </v-list-item>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
      <v-col>
        <v-card><ClientProfileInfo /></v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: ['clientName'],
  data: () => {
    return {}
  },
}
</script>
