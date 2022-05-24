<template>
  <v-container>
    <v-row class="pa-2">
      <v-col align="center">
        <h3>01 Dec 2020</h3>
        <p>Last Session</p>
      </v-col>
      <v-divider vertical></v-divider>
      <v-col align="center">
        <h3>23</h3>
        <p>Sessions Attended</p>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row class="pa-2">
      <v-col align="center">
        <h3>1</h3>
        <p>Cancellations</p>
      </v-col>
      <v-divider vertical></v-divider>
      <v-col align="center">
        <h3>2</h3>
        <p>No Shows</p>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row>
      <v-col>
        <!--- Booleans will determine this with a few v-if's   -->
        <v-chip class="ma-2" color="primary"> New Starter </v-chip>
        <v-chip class="ma-2" color="red white--text"> Overdue </v-chip>
        <v-chip class="ma-2" color="green white--text"> Active Member </v-chip>
        <v-chip class="ma-2" color="orange white--text"> Trial </v-chip>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: ['clientName', 'client'],
  data: () => {
    return {}
  },
}
</script>
