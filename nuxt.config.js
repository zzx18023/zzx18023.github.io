export default {
  // mode: 'spa',
  /*
   ** Headers of the page
   */
  head: {
    htmlAttrs: {
      lang: 'zh-CN',
    },
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      {
        hid: 'author',
        name: 'author',
        content: process.env.npm_package_author_name,
      },
      {
        hid: 'version',
        name: 'version',
        content: process.env.npm_package_version,
      },
      {
        hid: 'viewport',
        name: 'viewport',
        content:
          'width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no,shrink-to-fit=no,viewport-fit=cover',
      },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
      { hid: 'robots', name: 'robots', content: 'all' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        hid: 'aliicon',
        rel: 'stylesheet',
        href: '//at.alicdn.com/t/font_1676309_21lwihxs3k6.css',
      },
    ],
    noscript: [{ innerHTML: 'This website requires JavaScript.' }],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['normalize.css', '~/assets/style/normalize.styl'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~/plugins/main'],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/stylelint-module
    // [
    //   '@nuxtjs/stylelint-module',
    //   {
    //     fix: true,
    //   },
    // ],
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    '@nuxtjs/style-resources',
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   */
  build: {
    babel: {
      plugins: [
        [
          'import',
          {
            libraryName: 'vant',
            libraryDirectory: 'es',
            style: true,
          },
          'vant',
        ],
        [
          'component',
          {
            libraryName: 'element-ui',
            styleLibraryName: 'theme-chalk',
          },
          'element-ui',
        ],
      ],
    },
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      config.module.rules.push({
        test: /\.md$/,
        // loader: 'frontmatter-markdown-loader',
        // options: {
        //   mode: ['hrml', 'body', 'meta'],
        // },
        use: [
          // { loader: 'html-loader' },
          // { loader: 'markdown-loader' },
          {
            loader: 'frontmatter-markdown-loader',
            options: {
              // mode: ['html', 'body'],
            },
          },
        ],
      });
    },
    loaders: {},
  },
  styleResources: {
    stylus: './assets/style/base.styl',
  },
  server: {
    // port: 80,
    // port: 8000, // default: 3000
    host: '0.0.0.0', // default: localhost,
    timing: {
      total: true,
    },
  },
};
