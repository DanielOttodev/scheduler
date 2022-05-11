<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">Time</th>
          <th class="text-left">Service</th>
          <th class="text-left">Cost ($AUD)</th>
          <th class="text-left">Total ($AUD)</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in services" :key="item.name">
          <td class="tdItem">{{ item.time }}</td>
          <td class="pa-2">
            <v-list-item-title> {{ item.service }}</v-list-item-title>
            <v-list-item-subtitle>
              1h 30m with Dan
              {{ item.serviceDesc }}</v-list-item-subtitle
            >
          </td>
          <td class="tdItem">{{ item.cost }}</td>
        </tr>
        <tr v-for="item in services" :key="item.name">
          <td></td>
          <td></td>
          <td></td>
          <td><h2>A $25</h2></td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>
<script>
export default {
  data() {
    return {
      services: [
        {
          time: '9AM',
          service: 'Pilates Session',
          cost: '$25',
        },
      ],
    }
  },
}
</script>
<style>
.tdItem {
  font-size: 16px !important;
}
</style>
