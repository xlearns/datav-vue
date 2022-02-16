<template>
	<div class="test">{{ a }}</div>
</template>

<script>
import { ref } from "vue";
export default {
	name: "comTest",
	setup() {
		const a = ref(222);
		return {
			a,
		};
	},
};
</script>

<style lang="scss" scoped>
.test {
	color: #6fc;
}
</style>
