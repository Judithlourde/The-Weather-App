<template>
	<header class="home__header">
		<img src="/images/svg/logo-with-clouds.svg" alt="logo-with-clouds-icon">
	</header>

	<main class="home__main">
		<h2>Are you a cat or a dog person?</h2>

		<h4>(Don't worry we won't judge!)</h4>

		<img src="/images/svg/basket.svg" alt="animal-basket">
	</main>

	<div class="home__buttons">
		<RouterLink :to="{ name: 'cat-page', path: '/cat-page', component: CatPageView }">
			<div class="home__buttons--fish">
				<button @click="catButton">
					<img src="/images/svg/fish.svg" alt="fish-icon">
					<h4>Cat</h4>
				</button>
			</div>
		</RouterLink>

		<RouterLink :to="{ name: 'dog-page', path: '/dog-page', component: DogPageView }">
			<div class="home__buttons-bone">
					<button>
						<img src="/images/svg/bone.svg" alt="bone-icon">
						<h4>Dog</h4>
					</button>
			</div>
		</RouterLink>
	</div>
</template>

<script>
// import DogPage from './DogPage.vue'
	export default {
		components: {
			// DogPage
		},

		data() {
			return {
				clientID: import.meta.env.VITE_APP_NAME
			}
			
		},
	}
</script>

<style>
	.home__header {
		height: 20%;
	}

	.home__header img {
		width: 22%;
	}

	.home__main {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
	}

	.home__main > * {
		margin-bottom: var(--bottom-small) ;
	}

	.home__buttons {
		width: 50%;
		margin-left: auto;
		margin-right: auto;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>

