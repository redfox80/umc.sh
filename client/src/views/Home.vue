<template>
	<div class="container-fluid">

		<div class="row">

			<div class="col-12 col-md-8 offset-md-2 col-lg-6 offset-md-3 col-xl-4 offset-xl-4">

				<b-form @submit="createLink">

					<b-form-group
						label="Link to shorten"
						label-for="link"
						description="A url must start with http:// or https://"
					>
						<b-form-input
							id="link"
							ref="link"
							v-model="link"
							type="text"
							:state="(linkErr) ? false:null"
							autocomplete="off"
							autofocus
							:disabled="(done) ? true:false"
						></b-form-input>
						<b-form-invalid-feedback>Invalid url</b-form-invalid-feedback>
					</b-form-group>

					<b-button variant="primary" type="submit" v-show="!done">Generate link</b-button>
					<b-button variant="primary" type="button" v-show="done" @click="newLink">New link</b-button>
					
				</b-form>

				<b-card v-show="showSlink" class="mt-3 text-center" bg-variant="light" header="Generated link">
					<b-card-text>
						<p>
							{{ link }}
						</p>
						<a :href="slink">{{ slinks }}</a>

						<b-icon-files class="ml-4 text-primary cursor-pointer" scale="1.2" v-b-tooltip.hover title="Copy" style="cursor: pointer;" @click="copy"></b-icon-files>
						<b-icon-check-circle class="ml-4 text-success" scale="2" v-show="copied"></b-icon-check-circle>
					</b-card-text>
				</b-card>
				
			</div>

		</div>

	</div>
</template>

<script>
// @ is an alias to /src
import Vue from 'vue';
import { required, url } from 'vuelidate/lib/validators';

export default {
	name: 'Home',
	data() {
		return {
			link: null,
			linkErr: false,
			slink: null,
			slinks: null,
			showSlink: false,
			copied: false,
			done: false
		};
	},
	components: {
	},
	methods: {
		async createLink(e) {
			e.preventDefault();

			Vue.set(this, 'linkErr', false);
			let err = false;

			if(this.$v.link.$invalid) {
				Vue.set(this, 'linkErr', true);
				err = true;
			}

			if(err) return;

			const input = {
				link: this.link
			};

			this.$store.dispatch('postLink', input)
				.then( r => {
					Vue.set(this, 'slink', `https://umc.sh/${r.short}`);
					Vue.set(this, 'slinks', `umc.sh/${r.short}`);
					Vue.set(this, 'showSlink', true);
					Vue.set(this, 'done', true);
				});
		},
		newLink() {
			Vue.set(this, 'link', null);
			Vue.set(this, 'slink', null);
			Vue.set(this, 'slinks', null);
			Vue.set(this, 'showSlink', false);
			Vue.set(this, 'done', false);
			setTimeout(() => { //WAT !?!?!?!? doesn't work without zero delay :$
				document.querySelector('#link').focus();
			}, 0);
		},
		copy() {
			const el = document.createElement('textarea');
			el.value = this.slink;
			document.body.appendChild(el);
			el.select();
			document.execCommand('copy');
			document.body.removeChild(el);
			Vue.set(this, 'copied', true);
			setTimeout(() => {
				Vue.set(this, 'copied', false);
			}, 2500);
		}
	},
	validations: {
		link: {
			required,
			url
		}
	}
};
</script>
