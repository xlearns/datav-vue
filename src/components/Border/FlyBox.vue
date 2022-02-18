<template>
	<div class="vdata-border-flybox">
		<svg width="400" height="400">
			<defs>
				<path
					id="border"
					fill="none"
					d="M 2.5, 2.5 L 2.5, 237.5 L 396.5, 237.5 L 396.5, 2.5 L 2.5, 2.5"
				/>
				<mask id="mask">
					<circle r="100" cx="0" cy="0" fill="white">
						<animateMotion
							path="M 2.5, 2.5 L 2.5, 237.5 L 396.5, 237.5 L 396.5, 2.5 L 2.5, 2.5"
							dur="1.5s"
							repeatCount="indefinite"
							rotate="0"
						></animateMotion>
					</circle>
				</mask>
			</defs>
			<!-- 背景 -->
			<use href="#border" stroke-width="1" stroke="#235fa7"></use>
			<!-- 实际 -->
			<use
				href="#border"
				stroke-width="3"
				stroke="#4fd2dd"
				mask="url(#mask)"
			></use>
		</svg>
	</div>
</template>

<script lang="ts">
export default {
	name: "VFlyBox",
	setup() {
		return {};
	},
};
</script>

<style scoped></style>
