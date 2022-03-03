<template>
	<section class="home">
		<RouterLink :to="{ name:'home' }">
			<Logo />
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
							<h4>{{ page.title }}</h4>
						<!-- </button> -->
					</nav>
				</RouterLink>
			</div>
		</main>
	</section>
</template>

<script>
import Logo from '../components/Logo.vue';
	export default {
		components: {
			Logo
		},

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
		/* position: relative; */
	}

	.home__pet-select {
		min-height: 100vh;
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
	}

	.home__pet-select-buttons img {
		width: 3.5em;
	}

	/* Medium screen devices (968px and above) */
    @media screen and (min-width: 968px) {
		.home__pet-select-question {
			font-size: var(--heading);
		}

		.home__pet-select-buttons {
			width: 50%;
		}

	}
</style>

