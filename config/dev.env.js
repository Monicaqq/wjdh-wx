var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  URL_NJ: '"https://www.angeasycloud.com/nanjing_server"',
  URL_ZJ: '"https://www.angeasycloud.com/zhenjiang_server"'
})
