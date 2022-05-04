<template>
  <v-app dark>
  <!-- <v-navigation-drawer v-if="sideDrawer"
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      :dark=true
      fixed
      app
     
    >
<h6>hello</h6> 
    </v-navigation-drawer>   -->  
    <v-app-bar  :clipped-left="clipped" fixed app class="blue-grey darken-4">

        <v-btn
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact

          outlined
          class="ml-3 ml-3"
          dark
          large=true
          text
         
        >
   
            <v-icon>{{ item.icon }}</v-icon>
    
         
         {{item.title}}
    
        </v-btn>

      <!---<v-toolbar-title
      color="white"
       v-text="title" />  -->
      <v-spacer />
      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon color="white"  :left="true">mdi-account-circle</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed >
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
          sideDraw:false
        },
        {
          icon: 'mdi-calendar',
          title: 'Bookings',
          to: '/bookings',
          sideDraw:true
        },
        {
          icon: 'mdi-account-supervisor-circle',
          title: 'Customers',
          to: '/customers',
          sideDraw:false
        },
        
        {
          icon: 'mdi-cog',
          title: 'Settings',
          to: '/settings',
          sideDraw:false
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
.v-toolbar__content{
  color:white;
}
</style>