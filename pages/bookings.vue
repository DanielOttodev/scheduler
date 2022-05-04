<template>
  <v-row>

    <v-col class="text-center">

      <v-row class="mt-3">
        <v-col class="blue-grey lighten-5" cols="12" sm="12" lg="3">

          <v-card height="100%" :dark=true>
            <v-date-picker class="mt-5" :dark=false elevation="15" v-model="picker"></v-date-picker>
            <v-card-subtitle>Select Date</v-card-subtitle>
             <v-tabs
      v-model="tab"
      background-color="transparent"
      color="basil"
      grow
    >
 
      <v-tab
        v-for="item in items"
        :key="item"
      >
        {{ item }}
      </v-tab>
    </v-tabs>
  <v-container>
    <v-tabs-items v-model="tab">
      <v-tab-item
        v-for="item in items"
        :key="item"
      >
        <v-card
          color="basil"
          flat
        >
          <v-card-text>{{ text }}</v-card-text>
        </v-card>
        
      </v-tab-item>
      
    </v-tabs-items>
    </v-container>
          </v-card>
        </v-col>
        <v-col cols="12" sm="12" lg="9">
          <Calendar />
        </v-col>
      </v-row>

    </v-col>
  </v-row>

</template>

<script>
export default {
  
  name: 'Bookings',
  data: () => ({
    tab:null,
    items: [
          'Users', 'Category',
        ],
        text: 'Filter by User',
      picker: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        picker2: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
    }),
      methods: {
      allowedDates: val => parseInt(val.split('-')[2], 10) % 2 === 0,
    },
}
</script>
