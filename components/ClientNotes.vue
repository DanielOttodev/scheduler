<template>
  <v-container>
    <v-row class="pa-5"
      ><v-text-field placeholder="Enter Notes"></v-text-field>
    </v-row>
    <v-row justify="center">
      <v-btn class="teal lighten-4">Submit</v-btn></v-row
    >

    <v-row>
      <v-col>
        <v-card
          ><v-card-title>Previous Notes</v-card-title>
          <v-card-subtitle v-if="notes.length <= 0"
            >None to display</v-card-subtitle
          >
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  props: ['customer'],
  data() {
    return {
      notes: [],
    }
  },
}
</script>