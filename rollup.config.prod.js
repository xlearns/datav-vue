// 生产环境 压缩

// 开发环境
const path = require('path')
const resolve = require("rollup-plugin-node-resolve")
const commonjs = require('rollup-plugin-commonjs')
const babel = require('rollup-plugin-babel') 
const json = require('rollup-plugin-json')
const {terser} = require('rollup-plugin-terser')
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
      name:"datav",
      format:'umd',
      globals:{
        vue:'vue',
        echarts:"echarts"
      }
    },
    {
      file:pathFn('./dist/datav.es.js'),
      name:"datav",
      format:'es',
      globals:{
        vue:'vue'
      }
    },
    {
      file:pathFn('./dist/datav.cjs.js'),
      name:"datav",
      format:'cjs',
      globals:{
        vue:'vue'
      }
    }
  ],
  plugins:[
    vue(), //vue必须放在前面否则会报错
    resolve(),  //解决第三方依赖打包问题
    commonjs(), // commonjs 语法模块
    //正确实现json 文件打包
    json(),
    //代码压缩
    terser(),
     //打包vue 组件
    postcss({
      plugins:[]
    }),
    babel({
      // 不进行编译
      exclude:"node_modules/**"
    }),
  ],
  external:['vue',"echarts"]
}