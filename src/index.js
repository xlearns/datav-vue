import {a,b,fn} from './TreeShaking'
import json from '../package.json'
console.log(a,b,fn)

// 必须输出 否则引用的时候会报错
export default{}