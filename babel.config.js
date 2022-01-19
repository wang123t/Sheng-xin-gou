module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
  ],
  //按需引入element-Ui的配置
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}
