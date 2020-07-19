<template>
	<div class="container-fluid">

		<div class="row">

			<div class="col-12 col-md-6 offset-md-3 col-lg-4 offset-lg-4 col-xl-2 offset-xl-5">

				<h3>Login</h3>

				<br/>

				<b-form @submit="login">

					<div class="form-group">
						<label for="username">Username</label>
						<b-input type="text" id="username" class="form-control" v-model="username" :state="(usernameErr) ? false:null"/>
						<b-form-invalid-feedback>Username is required</b-form-invalid-feedback>
					</div>

					<div class="form-group">
						<label for="password">Password</label>
						<b-input type="password" id="password" class="form-control" v-model="password" :state="(passwordErr) ? false:null"/>
						<b-form-invalid-feedback>Password is required</b-form-invalid-feedback>
					</div>

					<ul v-show="(errors.length > 0)" class="list-group">
						<li v-for="(err, key) of errors" v-bind:key="key" class="list-group-item list-group-item-danger mb-3">{{ err }}</li>
					</ul>

					<div class="d-flex align-items-center">
						<button type="submit" class="btn btn-success mr-3 flex-grow-1">Login</button>
						<RouterLink to="/register" class="btn btn-outline-secondary flex-grow-1">Register</RouterLink>
					</div>
				</b-form>

			</div>

		</div>

	</div>
</template>

<script>
import { required } from 'vuelidate/lib/validators';
import Vue from 'vue';

export default {
	name: 'Login',
	data: () => {
		return {
			username: null,
			usernameErr: false,
			password: null,
			passwordErr: false,
			errors: []
		};
	},
	mounted() {
		if(this.$store.state.auth.status === true) this.$router.push('/');
	},
	methods: {
		async login(e) {
			e.preventDefault();
			Vue.set(this, 'usernameErr', false);
			Vue.set(this, 'passwordErr', false);
			Vue.set(this, 'errors', []);
			let err = false;

			if(this.$v.username.$invalid) {
				Vue.set(this, 'usernameErr', true);
				err = true;
			}

			if(this.$v.password.$invalid) {
				Vue.set(this, 'passwordErr', true);
				err = true;
			}

			if(err) return;

			const input = {
				username: this.username,
				password: this.password
			};

			const res = this.$store.dispatch('login', input);

			res
				.then(() => {
					this.$router.push(this.$route.query.redirect || '/');
				})
				.catch(err => {
					this.errors.push(err.message);
				});
		}
	},
	validations: {
		username: {
			required
		},
		password: {
			required
		}
	}
};
</script>