<template>
  <v-card>
    <v-card-title>
      {{ clientName }}
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>

    <v-data-table
      :headers="headers"
      :items="history"
      :search="search"
    ></v-data-table>
  </v-card>
</template>
<script>
export default {
  props: ['clientName'],
  data() {
    return {
      search: '',
      headers: [
        {
          text: 'Booking Date',
          align: 'start',
          sortable: true,
          value: 'bookingDate',
        },

        { text: 'Event Type', value: 'eventType' },
        { text: 'Status', value: 'status' },
        { text: 'Staff Member', value: 'staffMember' },
        { text: 'Location', value: 'location' },
        { text: 'Date Booked', value: 'dateBooked' },
      ],
      history: [],
    }
  },
}
</script>