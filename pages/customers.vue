<template>
  <v-container>
    <v-row>
      <v-col lg="10" sm="12">
        <v-select
          return-object
          :items="items"
          label="Select a client"
          solo
          @change="onChange"
          item-text="Name"
        ></v-select>
      </v-col>
      <v-col lg="2" sm="12"
        ><v-btn
          @click="dialog = true"
          :large="true"
          :dark="true"
          class="blue-grey darken-4"
        >
          Create New <v-icon class="ml-2">mdi-plus-circle</v-icon></v-btn
        ></v-col
      >
      <v-dialog v-model="dialog">
        <v-card class="pa-5">
          <v-card-title>Add New Client</v-card-title>
          <CreateClient />
        </v-card>
      </v-dialog>
    </v-row>
    <v-row v-if="selectedCustomer === ''" justify="center">
      <v-card class="pa-5">
        <v-row justify="center">
          <v-icon :large="true">mdi-account</v-icon></v-row
        >

        <v-card-subtitle
          >Get started by picking a client from the dropdown box or creating a
          new client.</v-card-subtitle
        >
      </v-card>
    </v-row>
    <v-container v-if="selectedCustomer != ''">
      <ClientInfo :clientId="clientId" :customer="selectedCustomer" />
    </v-container>
  </v-container>
</template>
<script>
export default {
  mounted() {
    this.loadClients()
  },
  data: () => ({
    dialog: false,
    selectedCustomer: '',
    clientId: '',
    items: [],
  }),
  methods: {
    onChange(e) {
      console.log(e)
      this.selectedCustomer = e.Name
      this.clientId = e.idClient
    },
    loadClients() {
      fetch(`${process.env.baseUrl}/client/getClientList`, {
        headers: {
          Authorization: this.$auth.strategy.token.get(),
        },
      })
        .then((response) => {
          if (response.status > 400) {
            console.log(response)
            console.log('Invalid Token')
          } else {
            return response.json()
          }
        })
        .then((x) => {
          //  console.log(x)
          this.items = x
        })
    },
  },
}
</script>