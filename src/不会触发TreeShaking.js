const  a = 1
const  b = 2
function fn(){
  console.log('hello world')
}

let plugin = {
  a,b,fn
 }
//https://www.jb51.net/article/162079.htm

export default plugin

// 原因是import {a} form 'xx' 访问的是xx.default.a 由于defualt是undefine所有找不到
