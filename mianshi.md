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



首先这个chrome的protocolhandler机制我一开始并不熟悉，但是程序员嘛。碰到问题第一件事就是去找权威文档。
分析问题：我刚才看你说到了这个是chrome的机制，所以我本能的就去google一下goole的手册。然后找到了它其实是一个[自定义注册自定义协议处理程序](https://developers.google.com/web/updates/2011/06/Registering-a-custom-protocol-handler),ok首先第一个问题解决了。现在的问题就变成了，怎么通过这个自定义程序去打开vscode。这里我用了vscode的timmoverlaan.uri-open-recent插件【这个插件正好实现了vscode的自定义协议和向vscode传递参数】，当然这个插件底层实现也很简单。根据(vscode文档)[https://github.com/microsoft/vscode-docs/blob/master/api/advanced-topics/remote-extensions.md#callbacks-and-uri-handlers]callbacks-and-uri-handlers该 API 允许你的扩展注册自定义 URI，如果在浏览器中打开该 URI，则会在扩展中触发回调函数。考虑到通用性我打算写一个chrome扩展。自从分析完毕。上代码







 