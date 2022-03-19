<template>
	<section class="home">
		<RouterLink :to="{ name:'home' }" class="home__logo">
			<img src="/images/svg/logo.svg" alt="weatherApp-logo-link-to-homePage">
		</RouterLink>

		<main class="home__pet-select">
			<div class="home__pet-select-question">
				<h2>Are you a cat or a dog person?</h2>

				<h4>(Don't worry we won't judge!)</h4>

				<img src="/images/svg/basket.svg" alt="animal-basket">
			</div>
		
			<div class="home__pet-select-buttons">
				<RouterLink v-for="page in pagesFromStore" :key="page.id" :to="{ name: 'page', params: { page_id: page.id } }">
					<nav class="">
						<!-- <button @click="catButton"> -->
							<img :src="page.file" :alt="page.caption">
							<h5>{{ page.title }}</h5>
						<!-- </button> -->
					</nav>
				</RouterLink>
			</div>
		</main>
	</section>
</template>

<script>
	export default {
		data() {
			return {
				clientID: import.meta.env.VITE_APP_NAME
			}
			
		},

		computed: {
			pagesFromStore() {
				return this.$store.getters.getPages;
			}
		},
	}
</script>

<style>
	.home {
		background-image: url('/images/rays-grey.png'); 
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;
		height: 100vh;
		/* position: relative; */
	}

	.home__logo img {
		margin: 30px 10px;
		width: 24%;
	}

	.home__pet-select {
		margin: 20px;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		text-align: center;
	}

	.home__pet-select-question {
		font-size: var(--body);
	}

	.home__pet-select-question > * {
		padding: var(--padding-small);
	}

	.home__pet-select-question img {
		width: 9em;
	}

	.home__pet-select-buttons {
		width: 70%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		cursor: pointer;
	}

	.home__pet-select-buttons a {
		text-decoration: none;
		color: inherit;
	}

	.home__pet-select-buttons img {
		margin-top: var(--top-medium);
		width: 2.5em;
	}

	.home__pet-select-buttons img:hover {
		width: 3em;	
	}

	/* Medium screen devices (968px and above) */
    @media screen and (min-width: 968px) {
		.home__logo img {
			margin: 20px 26px;
			width: 7.2%;
		}

		.home__pet-select-question {
			font-size: var(--heading);
		}

		.home__pet-select-question > * {
			padding: var(--padding-medium);
		}

		.home__pet-select-buttons {
			width: 50%;
		}

		.home__pet-select-buttons img {
			width: 3em;
		}

		.home__pet-select-buttons img:hover {
			width: 4em;	
		}

	}
</style>

