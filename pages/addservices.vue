<template>
  <v-container>
    <h1 class="text-center">Add Services</h1>
    <v-form>
      <v-container>
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="service_description"
              :counter="60"
              label="Service Description"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-select
              v-model="serviceType"
              placeholder="Service Type"
              :items="serviceTypes"
              required
            ></v-select>
          </v-col>

          <v-col cols="12" md="4">
            <v-select
              v-model="serviceCat"
              :items="fetchedScat"
              return-object
              required
              placeholder="Category"
              item-text="Description"
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="cost"
              prefix="$"
              label="Cost"
              required
            ></v-text-field>
          </v-col>
          <v-col>
            <v-checkbox v-model="cph" label="Charge per hour?"> </v-checkbox>
          </v-col>

          <v-col> </v-col>
        </v-row>
      </v-container>
    </v-form>
    <v-container>
      <v-row class="justify-end"> </v-row>
    </v-container>
    <v-btn class="success float-end mt-5" @click="saveService">Submit</v-btn>
    <div class="text-center">
      <v-dialog v-model="dialog" width="500">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" text dark v-bind="attrs" v-on="on">
            Add Service Categories</v-btn
          >
        </template>

        <v-card>
          <v-card-title class="text-h5 grey lighten-2">
            New Service Category
          </v-card-title>

          <v-card-text>
            <v-text-field v-model="sCatDesc" label="Description"></v-text-field>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="saveCat"> Save </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      service_description: '',
      serviceType: '',
      serviceCat: null,
      cph: false,
      priceperhour: null,
      serviceTypes: ['Class', 'Booking'],
      dialog: false,
      sCatDesc: '',
      fetchedScat: [],
      cost: null,
    }
  },
  computed: {},
  methods: {
    saveService() {
      console.log(this.serviceCat.idServiceCategories)
      if (
        this.service_description != '' &&
        this.serviceType != '' &&
        this.serviceCat != ''
      ) {
        fetch(`${process.env.baseUrl}/services/addService`, {
          method: 'POST',
          headers: {
            Authorization: this.$auth.strategy.token.get(),
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            Description: this.service_description,
            IsHourly: this.cph,
            PricePerUnit: this.priceperhour,
            serviceCategory: this.serviceCat.idServiceCategories,
            serviceType: this.serviceType,
            totalCost: this.cost,
          }),
        })
          .then((res) => res.json())
          .then((x) => {
            console.log(x.result)
            alert('Service Added')
          })
      } else {
        alert('You must fill in all fields')
      }
    },
    saveCat() {
      this.dialog = false
      console.log(this.sCatDesc)
      if (this.sCatDesc != '') {
        fetch(`${process.env.baseUrl}/scat/addScat`, {
          method: 'POST',
          headers: {
            Authorization: this.$auth.strategy.token.get(),
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ description: this.sCatDesc }),
        })
          .then((res) => res.json())
          .then((x) => {
            console.log(x.result)
          })
      } else {
        alert('Description must be filled in')
      }
    },
  },
  mounted() {
    fetch(`${process.env.baseUrl}/scat/getSCat`, {
      headers: { Authorization: this.$auth.strategy.token.get() },
    })
      .then((res) => res.json())
      .then((x) => {
        console.log(x.result)
        this.fetchedScat = x.result
      })
  },
}
</script>

<style>
</style>