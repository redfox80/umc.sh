<template>
	<div class="container-fluid">

		<div class="row">

			<div class="col-6 offset-3">

				<b-tabs content-class="mt-4">
					<b-tab title="Links" active>
						<Links></Links>
					</b-tab>
					<b-tab title="Settings">
						<Settings></Settings>
					</b-tab>
				</b-tabs>

			</div>

		</div>

	</div>
</template>

<script>
import Links from '../components/account/Links';
import Settings from '../components/account/Settings';
export default {
	components: {
		Links,
		Settings
	}
};
</script>