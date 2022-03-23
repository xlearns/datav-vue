<template>
	<!-- <transform name="style">
		<slot></slot>
	</transform> -->
	<div>
		<slot></slot>
	</div>
</template>

<script lang="ts">
import GP from "gsap";
export default {
	name: "VTransForm",
	setup() {
		console.log(GP);
		return {};
	},
};
</script>

<style lang="scss" scoped>
.style-enter-active,
.style-leave-active {
	transition: all 0.5s ease;
}

.style-enter-from,
.style-leave-to {
	opacity: 0;
}
</style>
