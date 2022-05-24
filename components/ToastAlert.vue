<template>
  <div class="text-center ma-2">
    <v-snackbar v-model="snackbar">
      {{ msg }}

      <template v-slot:action="{ attrs }">
        <v-btn color="yellow" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
<script>
export default {
  props: ['msg', 'snackbar'],
  data: () => ({
    // snackbar: false,
    // text: `Hello, I'm a snackbar`,
  }),
}
</script>