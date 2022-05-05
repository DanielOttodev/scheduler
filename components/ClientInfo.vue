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
          <ClientProfile :clientName="customer" />
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>
<script>
export default {
  props: ['customer'],
  data() {
    return {
      tab: null,
    }
  },
}
</script>