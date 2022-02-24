// 开发环境
const path = require('path')
const resolve = require("rollup-plugin-node-resolve")
const commojs = require('rollup-plugin-commonjs')
const babel = require('rollup-plugin-babel')
const json = require('rollup-plugin-json')
const vue = require('rollup-plugin-vue')
const postcss = require('rollup-plugin-postcss')

const pathFn = function(url){
  return path.resolve(__dirname,url)
}

// commonjs协议
module.exports = {
  input:pathFn('./src/index.js'),
  output:[
    {
      file:pathFn('./dist/datav.umd.js'),
      name:"datav", //模块名称
      format:'umd',
      globals:{
        'vue':'Vue'
      },
      sourcemap: true,
    },
    {
      file:pathFn('./dist/datav.es.js'),
      name:"datav",
      format:'es',
      globals:{
        'vue':'Vue'
      }
    }
  ],
  plugins:[
    vue(),
    resolve(
      { preferBuiltins: true,browser: true}
    ),
    commojs(),
    babel({
      // 不进行编译
      exclude:"node_modules/**",
      runtimeHelpers: true,
      plugins: [
        ['@babel/transform-runtime', {
          regenerator: true
        }]
      ]
    }),
    json(),
    postcss({plugins:[]}),
  ],
  external:['vue']
}