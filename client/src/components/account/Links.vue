<template>

	<div>
		<button @click="refreshLinks" class="btn btn-info">Refresh</button>

		<br/>
		<br/>

		<displayLinksTable :links="links"></displayLinksTable>
	</div>
</template>

<script>
import displayLinksTable from '../links/displayLinksTable';

export default {
	name: 'Links',
	data() {
		return {
			showDeleteModal: false,
			lind: null,
			copied: null
		};
	},
	components: {
		displayLinksTable
	},
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
		}
	}
};
</script>