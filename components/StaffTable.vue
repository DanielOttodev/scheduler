<template>
  <v-simple-table fixed-header height="300px">
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">Name</th>
          <th class="text-left">Email</th>
          <th class="text-left">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in staff" :key="item.name">
          <td>{{ item.name }}</td>
          <td>{{ item.email }}</td>
          <td>
            <v-btn text small class="align-center"
              ><v-icon dark>mdi-close</v-icon></v-btn
            >
            <!--  <v-btn small text><v-icon dark>mdi-pencil</v-icon> </v-btn>  -->
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>
<script>
export default {
  data() {
    return {
      staff: [],
    }
  },
  mounted() {
    fetch(`${process.env.baseUrl}/staff/getStaff`, {
      method: 'GET',
      headers: {
        Authorization: this.$auth.strategy.token.get(),
      },
    })
      .then((response) => response.json())
      .then((x) => {
        this.staff = x.result
      })
  },
}
</script>

