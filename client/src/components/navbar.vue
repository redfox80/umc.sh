<template>
	<b-navbar toggleable="lg" type="dark" variant="success" class="mb-5">
		<b-navbar-brand href="#" to="/">UMC URL Shortener</b-navbar-brand>

		<b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

		<b-collapse id="nav-collapse" is-nav>
			<b-navbar-nav>
				<b-nav-item to="/" active-class="active" exact>Home</b-nav-item>
				<b-nav-item to="/contact" active-class="active" exact>Contact</b-nav-item>
				<b-nav-item to="/privacy" active-class="active" exact>Privacy</b-nav-item>
				<b-nav-item to="/terms" active-class="active" exact>Terms & Conditions</b-nav-item>
				<!-- <b-nav-item to="/about" active-class="active" exact>About</b-nav-item> -->
			</b-navbar-nav>

			<b-navbar-nav class="ml-auto mr-md-5">
				<b-nav-item to="/login" active-class="active" exact v-show="!authStatus">Login</b-nav-item>
				<b-nav-item to="/account" active-class="active" exact v-show="authStatus" v-b-tooltip title="Account">{{ user.username }}</b-nav-item>
				<b-nav-item @click="logout" v-show="authStatus">logout</b-nav-item>
			</b-navbar-nav>

		</b-collapse>

	</b-navbar>

</template>

<script>
export default {
	name: 'Navbar',
	computed: {
		authStatus() {
			return this.$store.state.auth.status;
		},
		user() {
			return this.$store.state.auth.user;
		},
	},
	methods: {
		logout() {
			this.$store.dispatch('logout');
			this.$router.push('/');
		}
	}
};
</script>