<template>
  <v-container>
    <BusinessProfile />
    <v-row justify="center">
      <v-divider :inset="true" class="mt-5 mb-5"></v-divider
    ></v-row>
    <BusinessServices />
    <BusinessLocation />
  </v-container>
</template>
<script>
export default {
  middleware: '',
  layout: 'none',
  data: () => ({}),

  methods: {},
}
</script>