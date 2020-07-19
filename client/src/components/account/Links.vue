<template>

	<div>
		<button @click="refreshLinks" class="btn btn-info">Refresh</button>

		<br/>
		<br/>

		<b-table
			striped
			:items="links"
			:fields="['link', 'short', 'clicks', 'actions']"
		>
			<template v-slot:cell(short)="data">
				<a 
					href="#"
					:short="data.item.short"
					@click="copy"
					v-b-tooltip.hover
					title="Click to copy link"
					style="transition: ease 0.3s;"
					:class="(copied==data.item.short) ? 'text-light':null"
				>{{ data.item.short }}</a>
			</template>

			<template v-slot:cell(clicks)="data">
				{{ data.item.clicks }}
			</template>

			<template v-slot:cell(actions)="data">
				<button type="button" class="btn btn-outline-danger" :iid="data.item.id" @click="removeLink">Delete</button>
			</template>
		</b-table>

		<ConfirmDeleteLinkModal :link="links[lind]" :show.sync="showDeleteModal"></ConfirmDeleteLinkModal>
	</div>
</template>

<script>
import ConfirmDeleteLinkModal from '../modals/ConfirmDeleteLinkModal';
import Vue from 'vue';

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
		ConfirmDeleteLinkModal
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
		},
		removeLink(e) {
			e.preventDefault();

			const links = this.links;
			const id = e.target.attributes.iid.value;
			let ind;

			for(let i = 0; i < links.length; i++) {
				if(links[i].id == id) {
					ind = i;
					break;
				}
			}

			Vue.set(this, 'lind', ind);
			Vue.set(this, 'showDeleteModal', true);
		},
		copy(e) {
			const short = e.target.attributes.short.value;
			Vue.set(this, 'copied', e.target.attributes.short.value);
			const el = document.createElement('textarea');
			el.value = `https://umc.sh/${short}`;
			document.body.appendChild(el);
			el.select();
			document.execCommand('copy');
			document.body.removeChild(el);
			setTimeout(() => {
				Vue.set(this, 'copied', null);
			}, 200);
		}
	}
};
</script>