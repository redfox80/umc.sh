<template>
	<div class="container-fluid">
		<div class="row">
			<div class="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2 col-xl-6 offset-xl-3">
				
				<form @submit.prevent="">

					<div class="form-group">
						<label for="contacterEmail">Your email</label>
						<b-input type="email" id="contacterEmail" class="form-control" v-model="contacterEmail"/>
					</div>

					<div class="form-group">
						<label for="contacterMessage">Message</label>
						<b-textarea rows="6" id="contacterMessage" class="form-control" v-model="contacterMessage"/>
					</div>

					<button type="submit" class="btn btn-success">Send</button>
					&nbsp;
					<button type="reset" class="btn btn-secondary">Clear</button>

				</form>

			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			contacterEmail: this.$store.state.auth.user.email || null,
			contacterMessage: null
		};
	}
};
</script>