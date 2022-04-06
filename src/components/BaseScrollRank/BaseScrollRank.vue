<template>
	<div class="BaseScrollRank">
		<div
			class="BaseScollRank-item"
			v-for="(item, index) in tableData"
			:key="'key' + index"
		>
			<div class="BaseScollRank-item-top">
				<div class="BaseScollRank-item-top__rank">No.{{ item.ranking }}</div>
				<div class="BaseScollRank-item-top__name" v-html="item.name"></div>
				<div class="BaseScollRank-item-top__value">
					{{ item.value ? item.value : "" }}
				</div>
			</div>
			<div class="BaseScollRank-item-bottom">
				<div class="inside-column">
					<div class="shine" />
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { computed, ref } from "vue";
export default {
	props: {
		data: {
			type: Array,
		},
	},
	setup(props) {
		const tableData = computed({
			get() {
				return props.data;
			},
			set() {
				// console.log()
			},
		});
		return {
			tableData,
		};
	},
};
</script>
<style lang="scss" scoped>
.BaseScrollRank {
	&-item {
	}
}
</style>
