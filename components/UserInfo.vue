<template>
  <v-row justify="center">
    <v-col cols="12" sm="10" md="8" lg="6">
      <v-card ref="form">
        <v-card-text>
          <v-text-field
            ref="name"
            v-model="name"
            :rules="[() => !!name || 'This field is required']"
            :error-messages="errorMessages"
            label="Full Name"
            placeholder="John Doe"
            required
            outlined
            :disabled="isDisabled"
            >{{ name }}</v-text-field
          >
          <v-text-field
            ref="phone"
            v-model="phone"
            :rules="[
              () =>
                (!!phone && phone.length <= 12) ||
                'phone must be less than 12 characters',
              phoneCheck,
            ]"
            label="phone Line"
            placeholder="Snowy Rock Pl"
            counter="12"
            required
            outlined
            :disabled="isDisabled"
            >{{ phone }}</v-text-field
          >
          <v-text-field
            ref="email"
            v-model="email"
            :rules="[() => !!email || 'This field is required', phoneCheck]"
            label="email"
            placeholder="El Paso"
            outlined
            required
            :disabled="isDisabled"
          ></v-text-field>
        </v-card-text>
        <v-divider class="mt-12"></v-divider>
        <v-card-actions>
          <v-btn @click="cancel" :disabled="isDisabled" text> Cancel </v-btn>
          <v-spacer></v-spacer>
          <v-slide-x-reverse-transition>
            <v-tooltip v-if="formHasErrors" left>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  class="my-0"
                  v-bind="attrs"
                  @click="resetForm"
                  v-on="on"
                >
                  <v-icon>mdi-refresh</v-icon>
                </v-btn>
              </template>
              <span>Refresh form</span>
            </v-tooltip>
          </v-slide-x-reverse-transition>
          <v-btn color="primary" text @click="edit"> Edit </v-btn>
          <v-btn color="primary" text :disabled="isDisabled" @click="submit">
            Submit
          </v-btn>
        </v-card-actions>
      </v-card>
      <ToastAlert :msg="msg" :snackbar="showtoast" />
    </v-col>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    errorMessages: '',
    name: null,
    phone: null,
    email: null,
    showtoast: false,
    msg: '',
    formHasErrors: false,
    isDisabled: true,
  }),

  computed: {
    form() {
      return {
        name: this.name,
        phone: this.phone,
        email: this.email,
      }
    },
  },
  mounted() {
    this.getUserInfo()
  },
  watch: {
    name() {
      this.errorMessages = ''
    },
  },

  methods: {
    phoneCheck() {
      this.errorMessages = this.phone && !this.name ? `Hey! I'm required` : ''

      return true
    },
    resetForm() {
      this.errorMessages = []
      this.formHasErrors = false

      Object.keys(this.form).forEach((f) => {
        this.$refs[f].reset()
      })
    },
    getUserInfo() {
      console.log(process.env.BASE_URL)
      fetch(`${process.env.baseUrl}/users/getUsers`, {
        method: 'GET',
        headers: {
          Authorization: this.$auth.strategy.token.get(),
        },
      })
        .then((response) => response.json())
        .then((x) => {
          console.log(x)
          let data = x[0]
          this.name = data.Name
          this.email = data.email
          this.phone = data.phone
        })
    },
    updateUserInfo() {
      fetch(
        'http://zenlynodeapi-env.eba-pjmeubm4.ap-southeast-2.elasticbeanstalk.com/users/updateUser',
        {
          method: 'POST',
          headers: {
            Authorization: this.$auth.strategy.token.get(),
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: this.email,
            name: this.name,
            phone: this.phone,
          }),
        }
      )
        .then((response) => {
          if (response.ok) {
            console.log('OK')
            return response.json()
          } else {
            this.msg = 'Failed to update, please retry'
            this.showtoast = true
          }
        })
        .then((x) => {
          console.log(x)
          this.msg = 'Update successful'
          this.showtoast = true
        })
    },
    submit() {
      this.formHasErrors = false

      Object.keys(this.form).forEach((f) => {
        if (!this.form[f]) this.formHasErrors = true
        this.$refs[f].validate(true)
      })
      if (!this.formHasErrors) {
        this.updateUserInfo()
      }
    },
    edit() {
      this.isDisabled = false
    },
    cancel() {
      this.isDisabled = true
    },
  },
}
</script>