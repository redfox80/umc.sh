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
							v-model="link"
							type="text"
							:state="(linkErr) ? false:null"
							autocomplete="off"
							autofocus
						></b-form-input>
						<b-form-invalid-feedback>Invalid url</b-form-invalid-feedback>
					</b-form-group>

					<b-button variant="primary" type="submit">Generate link</b-button>
					
				</b-form>

				<b-card v-show="showSlink" class="mt-3 text-center" bg-variant="light" header="Generated link">
					<b-card-text>
						<p>
							{{ link }} turned into
						</p>
						<a :href="slink">{{ slink }}</a>
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
			showSlink: false
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
					console.log(r);
					Vue.set(this, 'slink', `https://umc.sh/${r.short}`);
					Vue.set(this, 'showSlink', !this.showSlink);
				});


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
