<template>
  <v-row justify="center" align="center"> </v-row>
</template>

<script>
export default {
  name: 'IndexPage',
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()

      setTimeout(() => this.$nuxt.$loading.finish(), 500)
    })
  },
}
</script>
