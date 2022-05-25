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
    <v-container v-if="client != ''">
      <ClientInfo
        :client="client"
        :clientId="clientId"
        :customer="selectedCustomer"
      />
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
    client: '',
    items: [],
  }),
  methods: {
    onChange(e) {
      console.log(e)
      this.selectedCustomer = e.Name
      this.clientId = e.idClient
      console.log(this.clientId)
      fetch(`${process.env.baseUrl}/client/getClient/${this.clientId}`, {
        method: 'GET',
        headers: { Authorization: this.$auth.strategy.token.get() },
      })
        .then((response) => response.json())
        .then((x) => {
          console.log('logging:', x[0])
          this.client = x.result[0]
        })
        .then((y) => {
          console.log('done')
          //   this.doneFetching = true
        })
    },
    loadClients() {
      fetch(`${process.env.baseUrl}/client/getClientList`, {
        headers: {
          Authorization: this.$auth.strategy.token.get(),
        },
      })
        .then((response) => response.json())
        .then((x) => {
          if (x.msg) {
            alert('Invalid Token')
            this.$auth.logout()
          } else {
            console.log(x)
            this.items = x.result
          }
        })
    },
  },
}
</script>