<template>
    <section class="cat-page">
        <RouterLink :to="{ name:'home' }">
			<Logo />
		</RouterLink>    

        <main class="cat-page__main">
            <div class="cat-page__main-search" role="search">
                <button>
                    <!-- dispatch calling the actions in modules and sending the place (payload) -->
                    <img @click="this.$store.dispatch('fetchWeatherData', this.place), weatherDisplay()" src="/images/svg/search.svg" alt="Search-icon">
                </button>

                <!-- dispatch calling the actions in modules and sending the place (payload) -->
                <input type="text" placeholder="Enter your place..." v-model="place" @keyup.enter="this.$store.dispatch('fetchWeatherData', this.place), weatherDisplay()">
            </div>
        
            <div class="cat-page__main-weather">
                <!-- <div class="cat-page__main-catIdea">
                    <img class="cat-page__main-weather-cat" src="/images/svg/cat.svg" alt="cat-image"> 

                    <figure>
                        <img src="/images/svg/cloud.svg" alt="">
                        <figcaption></figcaption>
                    </figure>
                </div> -->

                <div class="cat-page__main-weather-display">
                    
                        <h4>Current Location Weather:</h4>

                        <div class="spinner" :class="{spinnerVisible: !visible}">Loading...
                            <img src="/images/gif/clouds.gif" alt="clouds moving gif">
                        </div>

                        <div class="currentWeather" :class="{currentWeatherData: visible}">
                            <h4>{{ getLocation.place }}</h4>
                            <div>{{ getLocation.temprature }}</div>
                            <img v-if="getLocation.error === ''" :src="getLocation.icon" alt="Weather-icon">
                            <div>{{ getLocation.description }}</div>
                            <div>{{ getLocation.error }}</div>
                        </div>
                 

                    <hr> 
                
                        <h4>Search Result:</h4>

                        <div class="weather" :class="{weatherData: isWeatherVisibile}">
                            <h4>{{ getWeather.place }}</h4>
                            <div>{{ getWeather.temprature }}</div>

                            <!-- Checking the error message to avoid display img default icon -->
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
                isWeatherVisible: false, 
            }
        },

        mounted: async function() { 
            // Calling the fetchGeoCode when the page mounted because it is a async function
            this.$store.dispatch('fetchGeoCode');
        },

        computed: {
            getWeather() {
                return this.$store.getters.currentWeather;
            }, 

            getLocation() {
                return this.$store.getters.currentLocationWeather;
            }, 

            getError() {
                return this.$store.getters.errorMessage;
            },

            visible() {
                return this.$store.getters.currentWeatherVisible;
            }

        },

        methods: {
            weatherDisplay() {
                this.isWeatherVisibile = !this.isWeatherVisibile;
            },

            currentWeatherDisplay() {
                this.isLocationWeather = !this.isLocationWeather;
            }
        }
            
    }
</script>

<style>
    .cat-page__main {
        min-height: 100vh;
        min-width: 100vw;
		display: flex;
        flex-direction: column;
		align-items: center;
		/* justify-content: space-around; */
		text-align: center;
    }

    .cat-page__main-search {
        display: flex;
        align-items: center;
        padding: var(--padding-xsmall);
        margin-top: 70px;
        margin-bottom: var(--bottom-small);
        background: var(--highlight);
        border-radius: 22px;
        width: 2em; 
        z-index: 300;
        /* height: 30%; */
    }

    .cat-page__main-search input {
        border: none;
        outline: none;
        /* padding: 0.4em 0.6em; */
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
        /* flex-direction: row; */
		justify-content: center;
		align-items: center;
    }

    .cat-page__main-catIdea {
        display: flex;
    }

    .cat-page__main-weather-cat {
        width: 20%;
    }

    .cat-page__main-weather-display {
        background: var(--highlight);
        padding: 30px;
        border-radius: 25px;
        width: 500px;
        height: 300px;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .weather,
    .spinner,
    .currentWeather {
        display: none;
    }     

    .currentWeatherData,
    .spinnerVisible,
    .weatherData {
        display: block;
    } 

    /* Medium screen devices (968px and above) */
    @media screen and (min-width: 968px) {
        .cat-page__main-search {
            /* margin: 0; */
            width: 15em; 
        }
    }
</style>