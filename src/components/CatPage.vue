<template>
    <header class="cat-header">
        <img src="/images/svg/logo-with-clouds.svg" alt="logo-with-clouds-icon">
    </header>

    <main class="cat-main">
        <div class="cat-main__search">
            <input type="text" placeholder="Enter your place..." v-model="place" @keypress="fetchWeatherData">
            <button>
                <img src="/images/svg/search.svg" alt="Search-icon">
            </button>
        </div>

        <div class="cat-main__weather">
            <h2>{{ getPlace }}</h2>
            <div v-if=" place !== '' " v-bind="convertWholeNumber">{{ weather }}°C</div>
            <img :src="getWeatherIcon" alt="">
            <div>{{ getDescription }}</div>
        </div>
    </main>

    <div class="cat-image">
        <img class="" src="/images/svg/cat.svg" alt="cat">
        <img src="/images/svg/cat-says.svg" alt="Cat-Says-Meow">
    </div>
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
                weather: '',
            }
        },

        created() {
            this.fetchWeatherData();
        },

        methods: {
            async fetchWeatherData() {
                const client_id_key = import.meta.env.VITE_OPENWEATHER_ACCES_KEY;
                console.log(client_id_key);

                const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${this.place}&units=metric&appid=${client_id_key}`;
                const responseWeather = await fetch(weatherURL);
                const weatherOutput = await responseWeather.json();

                console.log(weatherOutput);
                
                this.getPlace = weatherOutput.name;
                this.getWeather = weatherOutput.main.temp;
                this.getDescription = weatherOutput.weather[0].description;

                this.getWeatherIcon = `https://openweathermap.org/img/wn/${weatherOutput.weather[0].icon}.png`;
            }
        },

        computed: {
            convertWholeNumber() {
                this.weather = Math.round(this.getWeather);
                // this.weather = '';
            }
        },
    }
</script>

<style>
    .cat-header {
        height: 20%;
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

    .cat-image {
        width: 50%;
        margin-top: 20px;
		margin-left: auto;
		margin-right: auto;
		display: flex;
        flex-direction: column;
		justify-content: center;
		align-items: center;
    }

    .cat-image img {
        width: 30%;
    }
</style>