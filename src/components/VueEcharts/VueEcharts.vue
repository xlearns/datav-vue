<script>
import { onMounted, onUnmounted, ref, watch } from "vue";
import Echarts from "echarts"; // rollup配置了外部引入echarts，所以无需npm安装echarts

export default {
	name: "VEcharts",
	props: {
		options: Object,
		theme: {
			type: [Object, String],
			default: "",
		},
		open: {
			type: Boolean,
			default: false,
		},
		type: {
			type: Object,
			default: {
				renderer: "canvas",
			},
		},
	},
	setup(props) {
		let dom = ref();
		let charts;
		watch(
			() => props.options,
			() => {
				charts.setOption(props.options);
			},
			{
				deep: true,
			}
		);
		const onResize = function () {
			charts?.resize();
		};
		onMounted(() => {
			let _dom = dom.value;
			if (!props.open) {
				_dom.style.height = "150px";
				_dom.style.width = "300px";
			} else {
				_dom.style.height = "100%";
				_dom.style.width = "100%";
			}
			charts = Echarts.init(_dom, props.theme, props.type);
			charts.setOption(props.options);
			window.addEventListener("resize", onResize);
		});
		onUnmounted(() => {
			window.removeEventListener("resize", onResize);
		});
		return {
			dom,
		};
	},
};
</script>

<template>
	<div class="echats" ref="dom"></div>
</template>
