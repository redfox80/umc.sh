<template>

	<div>
		<button @click="refreshLinks" class="btn btn-info">Refresh</button>

		<b-table
			striped
			:items="links"
			:fields="['link', 'short', 'actions']"
		>
			<template v-slot:cell(actions)="data">
				<button type="button" class="btn btn-outline-secondary">Copy link</button>
				&nbsp;
				<button type="button" class="btn btn-outline-danger" :iid="data.item.id" @click="removeLink">Delete</button>
			</template>
		</b-table>

	</div>
</template>

<script>
export default {
	name: 'Links',
	mounted() {
		this.$store.dispatch('getLinks');
	},
	computed: {
		links() {
			return this.$store.state.link.links;
		}
	},
	methods: {
		refreshLinks() {
			this.$store.dispatch('getLinks');
		},
		removeLink(e) {
			const id = e.target.attributes.iid.value;

			this.$store.dispatch('removeLink', id);
		}
	}
};
</script>

<style lang="sass" scoped>
td
	overflow: hidden
	white-space: nowrap
</style>