<template>
    <section class="cat-page">
        <RouterLink :to="{ name:'home' }">
			<Logo />
		</RouterLink>    

        <main class="cat-page__main">
            <div class="cat-page__main-search">
                <input type="text" placeholder="Enter your place..." v-model="place" @keyup.enter="this.$store.dispatch('fetchWeatherData', this.place)">
                <button>
                    <img @click="this.$store.dispatch('fetchWeatherData', this.place)" src="/images/svg/search.svg" alt="Search-icon">
                </button>
            </div>
        
        
            <div class="cat-page__main-weather">
                <img class="cat-page__main-weather-cat" src="/images/svg/cat.svg" alt="cat-image">

                <div class="cat-page__main-weather-display">
                    <div>
                        <h4>{{ getLocation.place }}</h4>
                        <div>{{ getLocation.temprature }}</div>
                        <img v-if="getLocation.error === ''" :src="getLocation.icon" alt="Weather-icon">
                        <div>{{ getLocation.description }}</div>
                        <div>{{ getLocation.error }}</div>
                    </div>
                    
                    <div v-if="getWeather.error === ''">
                        <h4>{{ getWeather.place }}</h4>
                        <div>{{ getWeather.temprature }}</div>
                        <img v-if="getWeather.error === ''" :src="getWeather.icon" alt="Weather-icon">
                        <div>{{ getWeather.description }}</div>
                    </div>
                    
                    <div>{{ getWeather.error }}</div>
                     
                </div>
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
                
            }
        },

        mounted: async function() {
            this.$store.dispatch('fetchGeoCode');
        },

        created() {
            // this.$store.getters.currentWeather;
        },

        computed: {
            checkWeatherIcon() {
                if(this.mainDescription === 'Clouds') {
                    this.getWeatherIcon = '/images/gif/clouds.gif';
                } if(this.mainDescription === 'Clear') {
                    this.getWeatherIcon = '/images/gif/sun.gif';
                }  if(this.mainDescription === 'Rain') {

                }
            },

            getWeather() {
                return this.$store.getters.currentWeather;
            }, 

            getLocation() {
                return this.$store.getters.currentLocationWeather;
            }, 

            getError() {
                return this.$store.getters.errorMessage;
            }
        },
            
    }
</script>

<style>
    .cat-page__main {
        min-height: 100vh;
		display: flex;
        flex-direction: column;
		align-items: center;
		/* justify-content: space-around; */
		text-align: center;
    }

    .cat-page__main-search {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: var(--padding-xsmall);
        margin: 50px;
        background: #FEE100;
        border-radius: 22px;
        width: 15em; 
        z-index: 300;
        /* height: 30%; */
    }

     .cat-page__main-search input {
        border: none;
        outline: none;
        padding: 0.5em 1em;
        font-size: var(--body);
        cursor: pointer;
    }

    .cat-page__main-search button img {
        width: 1.5em;
        margin: .3em;
    }

    .cat-page__main-weather {
        height: 100%;
        width: 100%;
		display: flex;
        flex-direction: row;
		justify-content: center;
		align-items: center;
    }

    .cat-page__main-weather-cat {
        width: 20%;
    }

    .cat-page__main-weather-display {
        background: #FEE100;
        padding: 30px;
        border-radius: 25px;
        width: 400px;
        height: 400px;
    }

    /* Medium screen devices (968px and above) */
    @media screen and (min-width: 968px) {
        .cat-page__main-search {
            /* margin: 0; */
            width: 25em; 
        }
    }
</style>