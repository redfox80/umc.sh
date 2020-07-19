<template>
	<b-modal
		v-model="show"
		title="Warning"
		header-bg-variant="danger"
		header-text-variant="light"
		centered
		modal-ok="Delete"
	>
		<b-container fluid>
			<b-row>
				<b-col class="text-center font-weight-bold">
					Deleting this will make the short link unusable!
				</b-col>
			</b-row>
			<b-row v-if="typeof(link) != 'undefined'">
				<b-col class="text-center">
					umc.sh/{{ link.short }}
				</b-col>
			</b-row>
		</b-container>

		<template v-slot:modal-footer="{ ok, cancel }">
			<b-button size="md" variant="danger" @click="ok(); deleteLink();">
				Delete
			</b-button>
			<b-button size="md" variant="success" @click="cancel(); cancelDelete();">
				Cancel
			</b-button>
		</template>
	</b-modal>
</template>

<script>
export default {
	props: [
		'link',
		'show'
	],
	methods: {
		deleteLink() {
			this.$emit('update:show', false);
			this.$store.dispatch('removeLink', this.link.id);
		},
		cancelDelete() {
			this.$emit('update:show', false);
		}
	}
};
</script>