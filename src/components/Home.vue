<template>
	<section class="home">
		<header class="home__header">
			<img src="/images/svg/logo.svg" alt="logo-icon">
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

	</section>
	
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

		methods: {
			catButton() {

			},

			dogButton() {

			}
		}

		
	}
</script>

<style>
	.home {
		height: 100%;
		display: grid;
		grid-template-columns: var(--grid-column-12);
		grid-template-rows: 100px repeat(2, 1fr);
		column-gap: 20px;
	}

	.home__header {
		margin-top: 50px;
		grid-column: 2/ span 6;
	}

	.home__main {
		grid-column: 5/ span 4;
		grid-row: 2;
		text-align: center;
	}

	.home__main > * {
		margin-bottom: var(--bottom-small) ;
	}

	.home__buttons {
		grid-row: 3;
		grid-column: 5/ span 4;
		display: flex;
		justify-content: space-between;
	}
</style>

