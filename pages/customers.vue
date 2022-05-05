<template>
    <v-container>
        <v-row>
            <v-col  lg=10 sm=12>
          <v-select
          :items="items"
          label="Select a client"
          solo
          @change='onChange'
        ></v-select>
            </v-col>
            <v-col lg=2 sm=12><v-btn :large=true  :dark=true class="blue-grey darken-4"> Create New <v-icon class="ml-2">mdi-plus-circle</v-icon></v-btn></v-col>
        </v-row>
    <v-row  v-if="selectedCustomer === ''" justify="center">
        <v-card class="pa-5">
            <v-row justify="center"> <v-icon  :large=true>mdi-account</v-icon></v-row>
               
                <v-card-subtitle>Get started by picking a client from the dropdown box or creating a new client.</v-card-subtitle>
        </v-card>
    </v-row>
    <v-container  v-if="selectedCustomer != ''">
        <ClientInfo :customer="selectedCustomer" />
    </v-container>
    </v-container>
</template>
<script>
  export default {
    data: () => ({
      selectedCustomer: '',
      items: ['Cpt Jack Sparrow', 'Bar', 'Fizz', 'Buzz','proof','budge','pig','tune','passive','ethics','crude','opposed','reflection'],
    }
    ),
    methods:{
        onChange(e){
            this.selectedCustomer = e
        },

    }
  }
</script>