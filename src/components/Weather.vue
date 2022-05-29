<template>
    <section class="weather">
        <header role="header" class="weather-header">
            <RouterLink aria-label="link to home" :to="{ name:'home' }" class="weather-header__logo">
                <img src="/images/svg/logo.svg" alt="weatherApp-logo-link-to-homePage">
                <h6>Home</h6>
            </RouterLink>  

            <div class="weather-header__search-weather" role="search">
                <button aria-label="search weather">
                    <!-- dispatch calling the actions in modules and sending the place (payload) -->
                    <img @click="this.$store.dispatch('fetchWeatherData', this.place); weatherDisplay()" src="/images/svg/search.svg" alt="Search-icon">
                </button>

                <!-- dispatch calling the actions in modules and sending the place (payload) -->
                <input type="text" placeholder="Enter your place... and press enter or press the search icon" v-model="place" @keyup.enter="this.$store.dispatch('fetchWeatherData', this.place); weatherDisplay()">
            </div> 
        </header>

        <main role="main" class="weather-main">
            <div class="weather__main-weather">
                <div>
                    <div class="spinner" :class="{spinnerVisible: !visible}">Loading...
                        <img src="/images/gif/clouds.gif" alt="moving clouds gif">
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
    export default {
        data() {
            return {  
                isWeatherVisible: false, 
                place: localStorage.getItem('place')
            }
        },

        created() {
            // When the app is created it calls the async function fetchGeoCode, it helps when the build server runs
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
        margin: 20px 10px;
    }
    .weather-header__logo {
        grid-column: 1/ span 3;
        margin-top: var(--top-xsmall);
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .weather-header__logo {
        color: black;
        text-decoration: none;
        font-family: 'Henny Penny', cursive;
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

    .weather-header__search-weather img {
        padding: 5px;
        width: 1.5em;
    }

    .weather-main {
		display: flex;
        flex-direction: column;
		align-items: center;
        width: 100%;
        height: 100%;
		text-align: center;
    }

    .weather__main-weather {
        background: var(--highlight);
        padding: 20px;
        margin: 0 10px;
        border-radius: 25px;
        width: 350px;
        height: 170px;
        display: flex;
        justify-content: space-between;
    }

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
            margin: 0 20px;
        }

        .weather-header__search-weather {
            grid-column: 4/ span 5;
        }

        .weather-header__search-weather input {
            font-size: var(--heading);
        }

        .weather__main-weather {
            width: 450px;
            height: 220px;
            display: flex;
            justify-content: space-evenly;
            text-align: left;
        }

        .currentWeatherData,
        .spinnerVisible,
        .weatherData {
            display: block;
            padding: 10px;
            margin: 10px;
        } 
    }
</style>