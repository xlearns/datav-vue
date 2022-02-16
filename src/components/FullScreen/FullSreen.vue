<template>
	<div class="test">{{ a }}</div>
</template>

<script>
import { ref } from "vue";
export default {
	name: "FullSreen",
	setup() {
		const a = "hello word";
		return {
			a,
		};
	},
};
</script>

<style lang="scss" scoped>
.test {
	color: red;
}
</style>
