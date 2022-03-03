<template>
    <section class="cat-page">
        <RouterLink :to="{ name:'home' }">
			<Logo />
		</RouterLink>    

        <main class="cat-page__main">
            <div class="cat-page__main-search">
                <input type="text" placeholder="Enter your place..." v-model="place" @keyup.enter="fetchWeatherData">
                <button>
                    <img @click="fetchWeatherData" src="/images/svg/search.svg" alt="Search-icon">
                </button>
            </div>
        
        
            <div class="cat-page__main-weather">
                <img class="cat-page__main-weather-cat" src="/images/svg/cat.svg" alt="cat-image">

                <div class="cat-page__main-weather-display">
                    <div>{{ location }}</div>

                    <h3>{{ getPlace }}</h3>
                    <h4>{{ getWeather }}</h4>
                    <div v-if="handleError">{{ error }}</div>
                    <h6>{{`Feels Like: ${getFeelsWeather}` }}</h6>
                    <img :src="getWeatherIcon" alt="">
                    <div>{{ getDescription }}</div>
                    
                    
                    <!-- <div v-if="handleError">Type the correct palce</div> -->


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
                place: '',
                getPlace: '',
                getWeather: '',
                getFeelsWeather: '',
                getDescription: '',
                getWeatherIcon: '',
                mainDescription: '',
                error: '',
                latitude: '',
                fixedLatitude: '',
                longitude: '',
                fixedLongitude: '',
                location: '',
            }
        },

        mounted() {
            // this.fetchGeolocation();
        },

        created() {
            // this.fetchWeatherData();
            // this.checkWeatherIcon();
            this.fetchGeolocation();
            // this.changeLatitude();
        },

        methods: {
            async fetchGeolocation() {
                navigator.geolocation.getCurrentPosition(position => {
                    this.latitude = position.coords.latitude;
                    this.longitude = position.coords.longitude;
                    this.fixedLatitude = this.latitude.toFixed(1);
                    this.fixedLongitude = this.longitude.toFixed(1);
                    // console.log(Number (this.latitude.toFixed(1)));
                    // console.log( typeof(this.latitude) === "number");
                    // console.log(this.longitude.toFixed (1));
                    this.fetchLocation();
                });
            },

            async fetchLocation() {
                const client_id_key = import.meta.env.VITE_OPENWEATHER_ACCES_KEY;
                const locationUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${this.fixedLatitude}&lon=${this.fixedLongitude}&units=metric&appid=${client_id_key}`;
                

                try {
                    const responseLocation = await fetch(locationUrl);
                    const locationOutput = await responseLocation.json();
                    console.log(locationOutput);
                    this.location = locationOutput.name;

                } catch {

                }
            },
            
            async fetchWeatherData() {
                const client_id_key = import.meta.env.VITE_OPENWEATHER_ACCES_KEY;
                const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${this.place}&units=metric&appid=${client_id_key}`;
                
                try {
                    const responseWeather = await fetch(weatherURL);
                    const weatherOutput = await responseWeather.json();

                    // console.log(responseWeather);
                    if(responseWeather.status >= 200 && responseWeather.status < 300) {
                        this.handleWeatherData(weatherOutput); 
                        // return true;
                        this.error = '';
                        console.log('ok');
                    } else {
                        this.handleError(responseWeather);
                       
				}
                
                } catch (error) {
                    // console.log(error);
                    this.getPlace = '';
                    this.getWeather = '';
                    this.getFeelsWeather = '';
                    this.getDescription = '';
                    this.getWeatherIcon = '';
                    this.error = error.message;
                }
            },

            handleWeatherData(weatherOutput) {
                this.getPlace = weatherOutput.name;
                this.getWeather = `${Math.round(weatherOutput.main.temp)}°C`;    // Math.round helps to display the integer (whole number) temprature
                this.getFeelsWeather = `${Math.round(weatherOutput.main.feels_like)}°C`;
                this.getDescription = weatherOutput.weather[0].description;
                this.mainDescription = weatherOutput.weather[0].main; 
                this.getWeatherIcon = `https://openweathermap.org/img/wn/${weatherOutput.weather[0].icon}.png`;

            },

            handleError(responseWeather) {
                // let error = '';
                let data = responseWeather.status;
                // console.log(data);
                if(data === 404) {
                    console.log('Url ikke funnet!');
                    throw new Error('Place does not exist, Write the correct Place!');
                }
                if(data === 401) {
                    console.log('ikke authorisert');
                    throw new Error('ikke authorisert');
                }
                if(data > 500) {
                    console.log('server error');
                    throw new Error('Servor error!');
                }
                throw new Error('Noe gikk galt!');
                
            }
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