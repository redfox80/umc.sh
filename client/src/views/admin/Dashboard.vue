<template>
	<div class="container-fluid">
		<div class="row">
			<div class="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2 col-xl-6 offset-xl-3">
				
				<b-tabs content-class="mt-4">
					<b-tab title="Links" active>
						<Links></Links>
					</b-tab>
					<b-tab title="Users">
						<Users></Users>
					</b-tab>
				</b-tabs>

			</div>
		</div>
	</div>
</template>

<script>
import Links from '../../components/admin/Links.vue';
import Users from '../../components/admin/Users.vue';

export default {
	components: {
		Links,
		Users
	},
	mounted() {
		this.$store.dispatch('getUsers');
		this.$store.dispatch('getLinksAdmin');
	},
	computed: {
		users() {
			return this.$store.state.user.users;
		},
		links() {
			return this.$store.state.link.linksAdmin;
		}
	}
};
</script>