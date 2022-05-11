<template>
  <v-container>
    <v-row justify="center" class="mt-3 mb-4">
      <v-col lg="6" sm="12" align-self="center">
        <v-row justify="center">
          <v-card :flat="true">
            <v-img
              src="https://images.squarespace-cdn.com/content/v1/56e76754c6fc08a43254ebea/1608677386497-Y9IDY6FOSTQX3QW2MU7E/reformation1027-Copy1.jpg?format=2500w"
              max-height="500"
              max-width="750"
              position="center center"
            />
          </v-card>
        </v-row>
      </v-col>
      <v-col lg="6" sm="12">
        <v-container>
          <v-img
            src="https://t3.ftcdn.net/jpg/03/62/27/68/360_F_362276875_1JHK5DLxW4KAYKqsaGXn2MQV8yUjkm1c.jpg"
            max-width="150"
            max-height="150"
          ></v-img>
          <h1>Doreen Pilates and Yoga</h1>
          <small style="font-weight: bold">
            PILATES | YOGA | BODY RECOVERY | PHYSIOTHERAPY
          </small>

          <v-card-actions>
            <v-btn text><v-icon>mdi-facebook</v-icon></v-btn>
            <v-btn text><v-icon>mdi-instagram</v-icon></v-btn>
            <v-btn text><v-icon>mdi-twitter</v-icon></v-btn>
          </v-card-actions>
          <v-container>
            <v-row class="mt-5">
              <p>
                <v-icon :left="true">mdi-map</v-icon> 123 Fake Road, Doreen, VIC
                , 3754
              </p>
            </v-row>
            <v-row>
              <p><v-icon :left="true">mdi-phone</v-icon> 0413 864 377</p>
            </v-row>
          </v-container>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>