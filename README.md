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

### uuid
- 生成唯一id

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
## svg
- viewBox 【固化】 真是大小，svg设置的width、height、会根据viewBox设置的来算缩放比。然后将svg内的坐标乘以缩放比。也就是说将viewBox固化之后，就可以做到等比例缩放。

- 真实开发中可以先固定width与height，然后写完如果要改成等比缩放只需要将width与height的值赋值给viewBox的w与h，同时将width、height设置100%即可




# svg 动画
```html
<!--  属性变换 -->
<set>  
<!--  补间动画-->
<animate>
<animateColor>
<!-- 过渡动画 -->
<animateTransform>
<!-- 路径动画 -->
<animateMotion>
```
## set
```html
<!-- set 延迟设置不会补间-->
       <rect x="0" y="0" fill="red" width="100" height="50">
					<set attributeName="x" to="10" begin="1s"></set>
					<set attributeName="x" to="20" begin="2s"></set>
					<set attributeName="x" to="30" begin="3s"></set>
					<set attributeName="fill" to="blue" begin="4s"></set>
				</rect>
```
## animate
```html
svg width="200px" height="200px">
				<!-- animate 延迟设置不会补间-->
				<!-- <rect x="0" y="0" fill="blue" width="100" height="50"></rect> -->
				<circle
					cx="0"
					cy="0"
					r="30"
					fill="blue"
					stroke="black"
					stroke-width="1"
				>
        <!-- 
          多个animate会叠加
          repeatCount:次数 indefinite【无限】
          attributeName：要渐变的名称
          attributeType：xml【dom】、css【style】
          from 开始
					to 结束
					dur 时间
          fill 结束的状态 ：freeze【最后的状态】/remove【回归】
         -->
					<animate
						repeatCount="indefinite"
						attributeName="cx"
						attributeType="XML"
						from="0"
						to="100"
						dur="5s"
            fill='freeze'
					></animate>

          	<animate
						repeatCount="indefinite"
						attributeName="cy"
						attributeType="XML"
						from="0"
						to="100"
						dur="5s"
            fill='freeze'
					></animate>
				</circle>
			</svg>
```
## animateTransform
```html
		<svg width="200px" height="200px">
				<!-- animate 延迟设置不会补间-->
				<!-- <rect x="0" y="0" fill="blue" width="100" height="50"></rect> -->
				<circle
					cx="0"
					cy="0"
					r="30"
					fill="blue"
					stroke="black"
					stroke-width="1"
				>
					<animateTransform
						attributeName="transform"
						attributeType="XML"
						begin="0"
						dur="3s"
						type="scale"
						from="1"
						to="4"
						fill="freeze"
						repeatCount="1"
					></animateTransform>
				</circle>
			</svg>
```


## animateMotion
- 按path运动

## 圆环效果

## 图形穿梭动效【补帧动画】

## svg图形描边绘制【补帧动画】

## 路径动画
```html
<svg width="500px" height="500px" viewBox="0 0 200 200">
				<!-- 运动的矩形 -->
				<rect x="0" y="0" width="10" height="10" fill="red">
					<animateMotion
						path="M10 10 L110 10 L110 110 L10 110 Z"
						dur="5s"
						rotate="0"
						repeatCount="indefinite"
					></animateMotion>
				</rect>

				<path
					d="M10 10 L110 10 L110 110 L10 110 Z"
					fill="none"
					stroke="black"
					stroke-width="3"
				></path>
			</svg>
```

## 路径动画反向
```html
<div class="contatiner">
			<!-- 矩形周长：4r-->
			<svg width="500px" height="500px" viewBox="0 0 200 200">
				<!-- 运动的矩形 -->
				<rect x="0" y="0" width="10" height="10" fill="red">
					<animateMotion
						id="forward-rect"
						path="M10 10 L110 10 L110 110 L10 110"
						dur="2s"
						rotate="0"
						fill="freeze"
						begin="0;backward-rect.end+0.5"
					></animateMotion>
					<animateMotion
						id="backward-rect"
						path="M10 110 L110 110 L110 10 L10 10 "
						dur="2s"
						rotate="0"
						fill="freeze"
						begin="forward-rect.end + 0.5s"
					></animateMotion>
				</rect>

				<path
					d="M10 10 L110 10 L110 110 L10 110"
					fill="none"
					stroke="black"
					stroke-width="1"
				></path>
			</svg>
		</div>
```
## 形状补间动画
```html
<svg widt='400' height='400'>
  <polygon points='30 30 70 30 90 70 19 70' fill='#fcc' stroke='black'>
    <animate attributeName='points' attributeType='XML' to='40 300 700 30 90 700 19 70' dur="5s" fill="freeze" repeatCount='1'>
  </polygon>
</svg>
```





## Loading组件
## FlyBox组件


# MutationObserver
-  对DOM、DOM属性监听
- 使用场景：