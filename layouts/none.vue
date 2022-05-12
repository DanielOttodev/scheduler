<template>
  <v-app>
    <v-app-bar
      height="120"
      :light="true"
      app
      elevation="2"
      color="#fff"
      class="teal lighten-5"
    >
      <v-container>
        <v-row align="center">
          <v-col cols="8">
            <v-row class="mt-3" align="center">
              <v-col cols="2">
                <v-img
                  src="/zenly.png"
                  max-width="120"
                  max-height="80"
                  class="mb-5"
                ></v-img>
              </v-col>
              <v-col cols="5">
                <v-text-field
                  :rounded="true"
                  outlined
                  color="teal lighten-4"
                  placeholder="Search"
                ></v-text-field>
              </v-col>
              <v-col cols="5"
                ><v-text-field
                  :rounded="true"
                  outlined
                  color="teal lighten-4"
                  placeholder="Location"
                  prepend-inner-icon="mdi-map-marker"
                ></v-text-field
              ></v-col>
            </v-row>
          </v-col>

          <v-col cols="4">
            <v-row justify="end">
              <v-btn large class="mr-3" text>Login</v-btn>
              <v-btn color="teal darken-3" large text outlined>Sign Up</v-btn>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>

    <v-footer app>
      <span>&copy; {{ new Date().getFullYear() }} Zenly</span>
    </v-footer>
  </v-app>
</template>