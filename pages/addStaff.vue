<template>
  <v-container>
    <h1 class="text-center">New Staff</h1>
    <v-form v-model="valid">
      <v-container>
        <v-row class="justify-center">
          <v-col cols="12" md="4">
            <v-text-field
              v-model="firstname"
              :rules="nameRules"
              :counter="10"
              label="First name"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              v-model="lastname"
              :rules="nameRules"
              :counter="10"
              label="Last name"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              required
            ></v-text-field>
          </v-col>
          <v-btn class="primary" @click="submit">Confirm</v-btn>
        </v-row>
      </v-container>
    </v-form>
  </v-container>
</template>


<script>
export default {
  data: () => ({
    valid: false,
    firstname: '',
    lastname: '',
    nameRules: [
      (v) => !!v || 'Name is required',
      (v) => v.length <= 10 || 'Name must be less than 10 characters',
    ],
    email: '',
    emailRules: [
      (v) => !!v || 'E-mail is required',
      (v) => /.+@.+/.test(v) || 'E-mail must be valid',
    ],
  }),
  methods: {
    submit() {
      if (this.valid) {
        let staffName = this.firstname + ' ' + this.lastname
        console.log(staffName)
        fetch(`${process.env.baseUrl}/staff/addStaff`, {
          method: 'POST',
          headers: {
            Authorization: this.$auth.strategy.token.get(),
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: staffName,
            email: this.email,
          }),
        })
          .then((response) => response.json())
          .then((x) => {
            if (x.status === 'OK') {
              alert('Added new staff member')
              this.$router.push('/settings')
            }
          })
      }
    },
  },
}
</script>
