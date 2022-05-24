<template>
  <v-card>
    <v-tabs v-model="tab" background-color="blue-grey darken-4" dark fixed-tabs>
      <v-tab> Profile </v-tab>
      <v-tab> History </v-tab>
      <v-tab> Notes </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-card flat>
          <ClientProfile
            v-if="doneFetching"
            :client="client"
            :clientName="customer"
          />
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <ClientHistory :clientName="customer" />
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <ClientNotes />
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>
<script>
export default {
  props: ['customer', 'clientId'],
  data() {
    return {
      tab: null,
      client: '',
      doneFetching: false,
      phone: '',
      email: '',
      street: '',
    }
  },
  mounted() {
    console.log('client:' + this.clientId)
    fetch(`${process.env.baseUrl}/client/getClient/${this.clientId}`, {
      method: 'GET',
      headers: { Authorization: this.$auth.strategy.token.get() },
    })
      .then((response) => response.json())
      .then((x) => {
        console.log('logging:', x[0])
        this.client = x[0]
      })
      .then((y) => {
        console.log('done')
        this.doneFetching = true
      })
  },
}
</script>