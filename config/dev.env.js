var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // URL_NJ: '"http://192.168.1.141:8848/face-community-server"',
  // URL_ZJ: '"http://192.168.1.141:8848/face-community-server11"'
  URL_NJ: '"https://angeasycloud.com/nanjing_server"',
  URL_ZJ: '"https://angeasycloud.com/zhenjiang_server"'
})
