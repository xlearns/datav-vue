+ 伪类、伪元素
  - 区别：伪类使用单冒号，而伪元素使用双冒号
  + 伪类：love hate:【link、visited、hover、active】
  + 伪元素：after、before
+ gzip
  + 什么是gzip：项目打包、减少体积，从而提升响应速度【会压缩html、js、css等但是不会压缩图片】
  + response设置字段Content-encodeing：gzip
  + nginx开启gzip
  + gzip原理：核心是Deflate压缩算法，而deflate采用L777与Huffman编码来压缩文件。

+ graphql
  + GET 【强、协商】
  + POST 缓存优化
    + 第一次是POST【生成哈希】,下一次传哈希字符串就即可
    + N + 1 Query

+ 图片懒加载
  + 虚拟滚动 -> elementUI
  + 图片压缩 -> webp/avif/jpegxl
  + Image【组件】 -> src/width/height/quality/webp
    + picture【兼容】

+ [大文件切片](https://juejin.cn/post/6844904046436843527)
  + blob -> blob.slice -> 标记顺序【添加个hash，eg：name+index】
  + 断点续传

+ canvas截图
  + 


+ 响应式布局
 + flex 
   + flex:1
 + rem :html元素的font-size
 + % 问题 margin、padding、widht、height都是父类的width
 + vw的问题 【不能设置最小宽度】


+ ajax
 + 原理 XMLHttpRequest
 + 取消发送 abort
 + axios
  + 请求拦截
  + 相应拦截

+ 数据大屏
 + canvas

 + echarts
  + 定制化开发
  + 圆饼

+ 路由懒加载
  + 动态路由 【addRouter】
  + vuex
  + cooKie && localstorage

+ vuex
  + state 仓库
  + action 
    + 直接操作state
  + mutation


+ vue3?

+ 空白5个月
 + 








 