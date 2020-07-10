<template>
	<div class="container-fluid">

		<div class="row">

			<div class="col-12 col-md-8 offset-md-2 col-lg-6 offset-md-3 col-xl-4 offset-xl-4">

				<p>
					UMC link shortener, Lorem eirmod diam eirmod ipsum est labore gubergren rebum, takimata kasd gubergren clita gubergren erat diam et sed, clita rebum.
				</p>

				<b-form @submit="createLink">

					<b-form-group
						label="Link to shorten"
						label-for="link"
					>
						<b-form-input
							id="link"
							v-model="link"
							type="text"
							:state="(linkErr) ? false:null"
						></b-form-input>
						<b-form-invalid-feedback>Link is required and must be valid url</b-form-invalid-feedback>
					</b-form-group>

					<b-button variant="primary" type="submit">Generate link</b-button>
					
				</b-form>

				<b-card v-show="showSlink" class="mt-3 text-center" bg-variant="light" header="Generated link">
					<b-card-text>
						Erat ipsum et ipsum dolore aliquyam invidunt. Et justo ut.
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
		createLink(e) {
			e.preventDefault();

			console.log('moaefmopaefmop');

			Vue.set(this, 'linkErr', false);
			let err = false;

			if(this.$v.link.$invalid) {
				Vue.set(this, 'linkErr', true);
				err = true;
			}

			if(err) return;

			Vue.set(this, 'showSlink', !this.showSlink);
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
