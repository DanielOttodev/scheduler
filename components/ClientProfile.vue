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
                    src="https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"
                  ></v-img>
                </v-avatar>
                <h3 class="large mt-2">{{ clientName }}</h3>
                <p>{{ client.dateCreated }}</p>
                <p>Member since: 01 May 22</p>
                <v-btn text class="ma-1 primary--text" flat small>Edit</v-btn>
                <v-btn text class="ma-1 red--text" flat small>Remove</v-btn>
              </v-col>
              <v-divider vertical></v-divider>
              <v-col>
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title>Phone</v-list-item-title>
                    <v-list-item-subtitle>{{
                      client.phone
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title>Email</v-list-item-title>
                    <v-list-item-subtitle>{{ email }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title>Address</v-list-item-title>
                    <v-list-item-subtitle>{{
                      client.streetAddress
                    }}</v-list-item-subtitle>
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
  props: ['clientName', 'client'],
  data: () => {
    return {
      //email: '',
      phone: '',
    }
  },
  computed: {
    email: function () {
      return this.client.email
    },
  },
}
</script>
