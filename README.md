# rollup
- `npm run xx`操作的时候会执行node_modules下的.bin对应的xx文件

## output
- 可以输入多个文件
```json
output:[
  {
  file:path.resolve(__dirname,url),
  name:"datav",
  format:'umd'
}
]
```
## format
- umd :js 函数 【node、浏览器都支持】
- cjs 【conmmonjs】 `module.exports = {}` 默认浏览器不支持
- em 【es6】 `export default` 【`script type='module'`】

## external:[xx] 不允许打包到项目中

## 插件

### rollup-plugin-terser
- 代码压缩

### rollup-plugin-babel
- es6->es5

### rollup-plugin-commonjs
- 作用：支持node打包

### rollup-plugin-vue
- 加载vue文件

### rollup-plugin-node-resolve
- `npm install -D rollup-plugin-node-resolve`
- 作用：打包第三方模块到项目中

## babel-node
- 作用：node支持export module 【支持es6】

## babel-core
- 作用：代码转译

## tree shaking
- export module必须解构赋值不然不会触发tree shaking
- commojs 触发tree shaking可以直接`export.x= x`
- 不会触发tree shaking[https://www.jb51.net/article/162079.htm]

## rollup打包vue文件
- 打包vue文件
- 打包style
- 注意：由于plugin 是有顺序的，vue要在前面调用
```
rollup-plugin-vue
@vue/compiler-sfc
rollup-plugin-postcss
npm i -D sass
```



