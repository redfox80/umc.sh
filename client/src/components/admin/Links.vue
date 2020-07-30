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
	data() {
		return {
			showDeleteModal: false,
			lind: null,
			copied: null
		};
	},
	computed: {
		links() {
			return this.$store.state.link.linksAdmin;
		}
	},
	components: {
		displayLinksTable
	},
	mounted() {
		this.$store.dispatch('getLinksAdmin');
	},
	methods: {
		refreshLinks() {
			this.$store.dispatch('getLinksAdmin');
		}
	}
};
</script>