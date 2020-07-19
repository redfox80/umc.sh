<template>
	<div>
		<b-form @submit.prevent="">

			<b-form-group
				label="Username"
				label-for="username"
			>
				<b-form-input
					id="username"
					v-model="username"
					type="text"
					disabled
				></b-form-input>
			</b-form-group>

			<b-form-group
				label="Password"
				label-for="password"
			>
				<b-form-input
					id="password"
					v-model="password"
					:state="passwordErr ? false:null"
					type="password"></b-form-input>
					<b-form-invalid-feedback>Password must be atleast 6 characters long</b-form-invalid-feedback>
			</b-form-group>

			<b-form-group
				label="Confirm password"
				label-for="passwordConfirm"
			>
				<b-form-input
					id="passwordConfirm"
					v-model="passwordConfirm"
					:state="passwordConfirmErr ? false:null"
					type="password"></b-form-input>
					<b-form-invalid-feedback>Confirm password must match password</b-form-invalid-feedback>
			</b-form-group>

			<button type="submit" class="btn btn-success" @click="updatePassword">Update password</button>

			<b-icon-check2-circle scale="2" class="text-success ml-3" v-show="passwordSuccess"></b-icon-check2-circle>
			<span v-show="passwordFail" class="text-danger ml-3">
				<b-icon-x-circle scale="2" class="ml-3"></b-icon-x-circle>
				<b class="ml-3">Something went wrong on the server when attempting to update password</b>
			</span>

		</b-form>
	</div>
</template>

<script>
import Vue from 'vue';
import { required, sameAs, minLength } from 'vuelidate/lib/validators';

export default {
	name: 'Settings',
	data() {
		return {
			password: null,
			passwordErr: false,
			passwordConfirm: null,
			passwordConfirmErr: false,
			passwordSuccess: false,
			passwordFail: false
		};
	},
	computed: {
		username() {
			return this.$store.state.auth.user.username;
		}
	},
	methods: {
		updatePassword() {
			Vue.set(this, 'passwordErr', false);
			Vue.set(this, 'passwordConfirmErr', false);
			let err = false;

			if(this.$v.password.$invalid) {
				Vue.set(this, 'passwordErr', true);
				err = true;
			}

			if(this.$v.passwordConfirm.$invalid) {
				Vue.set(this, 'passwordConfirmErr', true);
				err = true;
			}

			if(err) return;


			const data = {
				id: this.$store.state.auth.user.id,
				password: this.password,
			};

			this.$store.dispatch('updatePassword', data)
				.then(() => {
					Vue.set(this, 'password', null);
					Vue.set(this, 'passwordConfirm', null);
					Vue.set(this, 'passwordFail', false);
					Vue.set(this, 'passwordSuccess', true);
					setTimeout(() => {
						Vue.set(this, 'passwordSuccess', false);
					}, 2500);
				})
				.catch(() => {
					Vue.set(this, 'password', null);
					Vue.set(this, 'passwordConfirm', null);
					Vue.set(this, 'passwordSuccess', false);
					Vue.set(this, 'passwordFail', true);
				});
		}
	},
	validations: {
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