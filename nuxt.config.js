import colors from 'vuetify/es5/util/colors'

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:8080/', //process.env.BASE_URL,
  },
  ssr: false,
  // Auth
  auth: {
    strategies: {
      awsCognito: {
        scheme: 'oauth2',

        endpoints: {
          authorization:
            'https://zenly.auth.ap-southeast-2.amazoncognito.com/login',
          token: 'https://zenly.auth.ap-southeast-2.amazoncognito.com/token',
          userInfo:
            'https://zenly.auth.ap-southeast-2.amazoncognito.com/oauth2/userInfo',
          logout: 'https://zenly.auth.ap-southeast-2.amazoncognito.com/logout',
        },
        token: {
          property: 'access_token',
          type: 'Bearer',
          maxAge: 3600,
        },
        refreshToken: {
          property: 'refresh_token',
          maxAge: 60 * 60 * 24 * 30,
        },
        responseType: 'token',
        redirectUri: 'https://master.d365ae9mfl52zg.amplifyapp.com/login',
        logoutRedirectUri: 'https://master.d365ae9mfl52zg.amplifyapp.com/login',
        clientId: '4rgm19j0b6erotf1afroishjih',
        scope: ['email', 'openid', 'profile'],
        codeChallengeMethod: 'S256',
      },
    },
  },
  // Router Middleware
  router: {
    middleware: ['auth'],
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - scheduler',
    title: 'Zenly',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/main.css'],
  loading: {
    name: 'circle',
    color: '#3B8070',
    background: 'white',
    throttle: 0,
  },
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['nuxt-material-design-icons', '@nuxtjs/axios', '@nuxtjs/auth-next'],

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
