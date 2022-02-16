// 生产环境 压缩

// 开发环境
const path = require('path')
const resolve = require("rollup-plugin-node-resolve")
const commojs = require('rollup-plugin-commonjs')
const babel = require('rollup-plugin-babel')
const json = require('rollup-plugin-json')
const pathFn = function(url){
  return path.resolve(__dirname,url)
}

// commonjs协议
module.exports = {
  input:pathFn('./src/index.js'),
  output:[
    {
      file:pathFn('./dist/datav.umd.js'),
      name:"datav",
      format:'umd'
    },
    {
      file:pathFn('./dist/datav.es.js'),
      name:"datav",
      format:'es'
    },
    {
      file:pathFn('./dist/datav.cjs.js'),
      name:"datav",
      format:'cjs'
    }
  ],
  plugins:[
    resolve(),
    commojs(),
    babel({
      // 不进行编译
      exclude:"node_modules/**"
    }),
    json()
  ],
  external:['vue']
}