<template>
	<div class="container-fluid">

		<div class="row">

			<div class="col-12 col-md-6 offset-md-3 col-lg-4 offset-lg-4 col-xl-2 offset-xl-5">

				<h3>Register</h3>

				<br/>

				<b-form @submit="register" novalidate>

					<div class="form-group">
						<label for="username">Username</label>
						<b-input type="text" id="username" class="form-control" v-model="username" :state="(usernameErr) ? false:null"></b-input>
						<b-form-invalid-feedback>Username is required</b-form-invalid-feedback>
					</div>

					<div class="form-group">
						<label for="password">Password</label>
						<b-input type="password" id="password" class="form-control" v-model="password" :state="(passwordErr) ? false:null"></b-input>
						<b-form-invalid-feedback>Password is required and must be atleast 6 characters long</b-form-invalid-feedback>
					</div>

					<div class="form-group">
						<label for="passwordConfirm">Confirm password</label>
						<b-input type="password" id="passwordConfirm" class="form-control" v-model="passwordConfirm" :state="(passwordConfirmErr) ? false:null"></b-input>
						<b-form-invalid-feedback>Confirm password must match password</b-form-invalid-feedback>
					</div>

					<ul v-show="(errors.length > 0)" class="list-group">
						<li v-for="(err, key) of errors" v-bind:key="key" class="list-group-item list-group-item-danger mb-3">{{ err }}</li>
					</ul>

					<div class="d-flex align-items-center">
						<button type="submit" class="btn btn-success mr-3 flex-grow-1">Register</button>
						<RouterLink to="/login" class="btn btn-outline-secondary flex-grow-1">Login</RouterLink>
					</div>
					
				</b-form>

			</div>

		</div>

	</div>
</template>

<script>
import { required, minLength, sameAs } from 'vuelidate/lib/validators';
import Vue from 'vue';

export default {
	data() {
		return {
			valo: false,
			errors: [],
			username: null,
			usernameErr: false,
			password: null,
			passwordErr: false,
			passwordConfirm: null,
			passwordConfirmErr: false
		};
	},
	mounted() {
		if(this.$store.state.auth.status === true) this.$router.push('/home');
	},
	methods: {
		async register(e) {
			e.preventDefault();
			let err = false;
			Vue.set(this, 'usernameErr', false);
			Vue.set(this, 'passwordErr', false);
			Vue.set(this, 'passwordConfirmErr', false);

			if(this.$v.username.$invalid) {
				Vue.set(this, 'usernameErr', true);
				err = true;
			}

			if(this.$v.password.$invalid) {
				Vue.set(this, 'passwordErr', true);
				err = true;
			}

			if(this.$v.passwordConfirm.$invalid) {
				Vue.set(this, 'passwordConfirmErr', true);
				err = true;
			}

			if(err) return;

			let input = {
				username: this.username,
				password: this.password
			};

			this.$store.dispatch('register', input)
				.then(() => {
					this.$router.push('/home');
				})
				.catch(err => {
					for(let i = 0; i < err.errors.length; i++) {
						
						if(err.errors[i].validatorKey == 'not_unique') {
							this.errors.push('That username is allready taken');
						}
					}
				});
		}
	},
	computed: {
		validateUsername() {
			return this.$v.username.$error;
		}
	},
	validations: {
		username: {
			required,
			minLength: minLength(3)
		},
		password: {
			required,
			minLength: minLength(6)
		},
		passwordConfirm: {
			required,
			sameAsPassword: sameAs('password')
		}
	}
};
</script>