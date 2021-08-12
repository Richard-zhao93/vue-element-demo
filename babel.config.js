module.exports = {
  presets: [
    // '@vue/app'
    ['@babel/preset-env', { 'modules': false }]
    // ['@vue/cli-plugin-babel/preset']
  ],
  'plugins': [
    [
      'component',
      {
        'libraryName': 'element-ui',
        'styleLibraryName': 'theme-chalk'
      }
    ],
    '@babel/plugin-transform-runtime'
  ]
}
