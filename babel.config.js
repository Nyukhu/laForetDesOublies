module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "@/assets/sass/style.scss";
          @import "@/assets/sass/fonts.scss";
        `
      }
    }}
}
