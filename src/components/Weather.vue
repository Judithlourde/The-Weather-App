<template>
    <section class="weather">
        <header class="weather-header">
            <RouterLink :to="{ name:'home' }" class="weather-header__logo">
                <img src="/images/svg/logo.svg" alt="weatherApp-logo-link-to-homePage">
            </RouterLink>  

            <div class="weather-header__search-weather" role="search">
                <button>
                    <!-- dispatch calling the actions in modules and sending the place (payload) -->
                    <img @click="this.$store.dispatch('fetchWeatherData', this.place); weatherDisplay()" src="/images/svg/search.svg" alt="Search-icon">
                </button>

                <!-- dispatch calling the actions in modules and sending the place (payload) -->
                <input type="text" placeholder="Enter your place..." v-model="place" @keyup.enter="this.$store.dispatch('fetchWeatherData', this.place); weatherDisplay()">
            </div> 
        </header>

        <main class="weather-main">
            <div class="weather__main-weather">
                <div>
                    <div class="spinner" :class="{spinnerVisible: !visible}">Loading...
                        <img src="/images/gif/clouds.gif" alt="clouds moving gif">
                    </div>

                    <div class="currentWeather" :class="{currentWeatherData: visible}">
                        <h5>{{ getLocation.place }}</h5>
                        <h5>{{ getLocation.temprature }}</h5>
                        <img v-if="getLocation.error === ''" :src="getLocation.icon" alt="Weather-icon">
                        <h6>{{ getLocation.description }}</h6>
                        <h6>{{ getLocation.error }}</h6>
                    </div>
                </div>

                <hr>                

                <div>  
                    <div class="weather__display" :class="{weatherData: isWeatherVisibile}">
                        <h5>{{ getWeather.place }}</h5>
                        <h5>{{ getWeather.temprature }}</h5>

                        <!-- Checking the error message to avoid display img default icon  -->
                        <img v-if="getWeather.error === ''" :src="getWeather.icon" alt="Weather-icon">
                        <h6>{{ getWeather.description }}</h6>
                    </div>
                    
                    <h6>{{ getWeather.error }}</h6>
                </div>
            </div>

           
        </main> 
    </section>
</template>

<script>
// import Header from './Header.vue';
    export default {
        components: {
			
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
                this.isWeatherVisibile = true;
            },

            currentWeatherDisplay() {
                this.isLocationWeather = !this.isLocationWeather;
            }
        }       
    }
</script>

<style>
    .weather-header {
        display: grid;
        grid-template-columns: var(--grid-column-12);
        width: 100vw;
        gap: var(--gap-small);
        margin: 20px;
    }
    .weather-header__logo {
        grid-column: 1/ span 3;
        margin-top: var(--top-xsmall);
    }

    .weather-header__logo img {
        width: 100%;
    }

    .weather-header__search-weather {
        grid-column: 4/ span 7;
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: center;
        padding: 5px;
        margin: 20px;
        background: var(--highlight);
        border-radius: 22px;
    }

    .weather-header__search-weather input {
        width: 100%;
        border: none;
        outline: none;
        padding: 0.1em;
        font-size: var(--body);
        cursor: pointer;
    }

    .weather-header__search-weather button img {
        width: 1.6em;
    }

    .weather-main {
		display: flex;
        flex-direction: column;
		align-items: center;
        width: 100%;
        height: 100%;
		/* justify-content: space-around; */
		text-align: center;
    }

    .weather__main-weather {
        background: var(--highlight);
        padding: 20px;
        border-radius: 25px;
        width: 350px;
        height: 150px;
        display: flex;
        /* flex-direction: column; */
        justify-content: space-between;
        /* text-align: left; */
    }
    .weather__main-catIdea {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 10px;
    }
    
    .weather__main-catIdea img {
        width: 50%;
    }

    .weather__main-catIdea-cat {
        padding: 10px;
    }

    /* .cat-page__main-catIdea figure {
        margin: 10px;
    }

    .cat-page__main-catIdea figure img {
        margin-right: 50px;
    } */

    .weather__display,
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
    @media screen and (min-width: 768px) {
        .weather-header__logo {
            grid-column: 1/ span 3;
            width: 100px;
        }

        .weather-header__search-weather {
            grid-column: 4/ span 5;
        }

        .weather-header__search-weather input {
            font-size: var(--heading);
        }

        .weather__main-weather {
            width: 450px;
            height: 170px;
            display: flex;
            /* flex-direction: column; */
            justify-content: space-evenly;
            text-align: left;
        }
    }
</style>