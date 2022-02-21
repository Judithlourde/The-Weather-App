<template>
    <section class="cat-section">
        <header class="cat-header">
            <img src="/images/svg/logo-with-clouds.svg" alt="logo-with-clouds-icon">
        </header>

        <main class="cat-main">
            <div class="cat-main__search">
                <input type="text" placeholder="Enter your place..." v-model="place" @keyup.enter="fetchWeatherData">
                <button>
                    <img @click="fetchWeatherData" src="/images/svg/search.svg" alt="Search-icon">
                </button>
            </div>

            <div class="cat-main__weather">
                <h2>{{ getPlace }}</h2>
                <h3>{{getWeather}}</h3>
                <img :src="getWeatherIcon" alt="">
                <div>{{ getDescription }}</div>
            </div>
        </main>

        <div class="cat-image">
            <img class="" src="/images/svg/cat.svg" alt="cat">
            <img src="/images/svg/cat-says.svg" alt="Cat-Says-Meow">
        </div>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                place: '',
                getPlace: '',
                getWeather: '',
                getDescription: '',
                getWeatherIcon: '',
                mainDescription: '',
            }
        },

        created() {
            // this.fetchWeatherData();
            // this.checkWeatherIcon();
        },

        methods: {
            async fetchWeatherData() {
                const client_id_key = import.meta.env.VITE_OPENWEATHER_ACCES_KEY;
                const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${this.place}&units=metric&appid=${client_id_key}`;
                
                let error = '';
                try {
                    const responseWeather = await fetch(weatherURL);
                    const weatherOutput = await responseWeather.json();
                    
                    if(weatherOutput.cod !== 200) {
                        // console.log('hi')
                        this.handleError(weatherOutput);
                        // console.log('hi')
                    } else {
                        this.handleWeatherData(weatherOutput);  
                    } 
                
                } catch (error) {
                    return 'error';
                }
            },

            handleWeatherData(weatherOutput) {
                this.getPlace = weatherOutput.name;
                this.getWeather = `${Math.round(weatherOutput.main.temp)}°C`;    // Math.round helps to display the integer temprature
                this.getDescription = weatherOutput.weather[0].description;
                this.mainDescription = weatherOutput.weather[0].main; 
                this.getWeatherIcon = `https://openweathermap.org/img/wn/${weatherOutput.weather[0].icon}.png`;

            },

            handleError(weatherOutput) {

                console.log(weatherOutput.cod);
                const data = weatherOutput.cod;
                console.log(data);
                if(data === 404) {
                    
                    error = 'file is not found';
                    console.log(error);
                }
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
            }
        },
    }
</script>

<style>
    .cat-section {
        display: flex;
        flex-direction: column;
        height: 100vh;
    }

    .cat-header {
        height: 10%;
    }

    .cat-header img {
        width: 22%;
    }

    .cat-main {
        display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
    }

    .cat-main > * {
        margin-bottom: var(--bottom-small);
    }

    .cat-main__search {
        display: flex;
    }

    .cat-image__weather {
        background: url('/images/3klZ.gif');
    }

    .cat-main__search input {
        width: 30vw;
        border: none;
        outline: none;
        padding: 0.5em 1em;
        background: #FEE100;
        border-radius: 25px;
        cursor: pointer;
    }

    .cat-image {
        height: 100%;
        width: 50%;
        /* margin-top: 50px; */
		margin-left: auto;
		margin-right: auto;
		display: flex;
        flex-direction: column;
		justify-content: center;
		align-items: center;
    }

    .cat-image img {
        width: 20%;
    }
</style>