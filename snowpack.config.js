export default {
  mount: {
    'src/client': { url: '/' }
  },
  plugins: [
    '@snowpack/plugin-sass'
  ],
  routes: [
    {
      match: 'routes',
      src: '.*',
      dest: '/index.html'
    },
  ],
  optimize: {
    //bundle: true,
    //minify: true,
  },
  packageOptions: {
  },
  devOptions: {
    port: 4000,
    open: 'default',
    hmr: true
  },
  buildOptions: {
    //watch: true,
  }
};

