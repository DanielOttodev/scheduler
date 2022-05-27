<template>
  <v-container>
    <h1 class="text-center">All Services</h1>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th>Id</th>
            <th class="text-left">Description</th>
            <th class="text-left">Type</th>
            <th class="text-left">Category</th>
            <th class="text-left">Cost</th>
            <th class="text-left">Charge Per Hour</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in services" :key="item.serviceId">
            <td>{{ item.serviceId }}</td>
            <td>{{ item.sdesc }}</td>
            <td>{{ item.serviceType }}</td>
            <td>{{ item.Description }}</td>
            <td>${{ item.totalCost }}</td>
            <td>{{ isHourly(item.isHourly) }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      services: [],
    }
  },
  mounted() {
    fetch(`${process.env.baseUrl}/services/getServices`, {
      headers: { Authorization: this.$auth.strategy.token.get() },
    })
      .then((res) => res.json())
      .then((x) => {
        console.log(x)
        this.services = x.result
      })
  },
  methods: {
    isHourly(x) {
      if (x === 1) {
        return true
      } else {
        return false
      }
    },
  },
}
</script>

<style>
</style>