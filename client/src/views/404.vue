<template>
	<div class="container-fluid">
		<div class="row">
			<div class="col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4">
				<b-card bg-variant="light" class="text-center">

					<b-card-text>
					
						<h1>404</h1>

						<p>
							Oh no
							<b-icon-emoji-frown></b-icon-emoji-frown>
						</p>

						<p>
							There is no content here.<br/>
							If you believe this is a mistake you can <RouterLink to="/">contact us</RouterLink>
						</p>

						<p class="mt-5">
							<RouterLink to="/">
								<b-icon-house-fill></b-icon-house-fill>
								Go home
							</RouterLink>
						</p>

					</b-card-text>
				</b-card>
			</div>
		</div>
	</div>
</template>

<style lang="sass" scoped>
	h1
		font-size: 80px

	p
		font-size: 24px
</style>