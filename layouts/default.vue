<template>
  <v-app dark>
    <div v-if="$vuetify.breakpoint.xsOnly" class="text-center">
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" dark v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="(item, index) in items" :key="index">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
    <v-app-bar
      v-if="$vuetify.breakpoint.smAndUp"
      :clipped-left="clipped"
      fixed
      app
      class="blue-grey darken-4"
    >
      <v-btn
        v-for="(item, i) in items"
        :key="i"
        :to="item.to"
        router
        exact
        outlined
        class="ml-3 ml-3"
        dark
        :large="true"
        text
      >
        <v-icon>{{ item.icon }}</v-icon>

        {{ item.title }}
      </v-btn>

      <!---<v-toolbar-title
      color="white"
       v-text="title" />  -->
      <v-spacer />
      <v-btn icon ripple>
        <v-icon color="grey">mdi-bell</v-icon>
      </v-btn>
      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon color="white" :left="true">mdi-account-circle</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-item to="/userProfile">
          <v-list-item-action>
            <v-icon light> mdi-account </v-icon>
          </v-list-item-action>
          <v-list-item-title>Profile</v-list-item-title>
        </v-list-item>
        <v-list-item to="/login">
          <v-list-item-action>
            <v-icon light> mdi-arrow-top-right </v-icon>
          </v-list-item-action>
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      clipped: true,
      drawer: true,
      fixed: false,
      sideDraw: true,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Dashboard',
          to: '/',
          sideDraw: false,
        },
        {
          icon: 'mdi-calendar',
          title: 'Schedule',
          to: '/bookings',
          sideDraw: true,
        },
        {
          icon: 'mdi-account-supervisor-circle',
          title: 'Clients',
          to: '/customers',
          sideDraw: false,
        },

        {
          icon: 'mdi-cog',
          title: 'Settings',
          to: '/settings',
          sideDraw: false,
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Joes Yoga & Fitness',
    }
  },
}
</script>

<style >
.v-toolbar__content {
  color: white;
}
</style>