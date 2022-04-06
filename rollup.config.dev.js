import commonjs from "@rollup/plugin-commonjs";
import resolve from '@rollup/plugin-node-resolve';
import postcss from "rollup-plugin-postcss";
import {terser} from "rollup-plugin-terser";
import json from '@rollup/plugin-json';
import vue from 'rollup-plugin-vue'
import babel from 'rollup-plugin-babel';
import path from 'path';

const pathFn = function(url){
  return path.resolve(__dirname,url)
}

export default {
  input:pathFn('./src/index.js'),
  output:[
    {
      file:pathFn('./dist/datav.umd.js'),
      name:"datav", //模块名称
      format:'umd',
      globals:{
        'vue':'Vue',
        'echarts':"echarts",
        'gsap':"gsap"
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
    commonjs(),
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
  external:['vue',"echarts","gsap"]
}