const client_id_key = import.meta.env.VITE_OPENWEATHER_ACCES_KEY;
const headers = { Accept: "application/json" }
export default {
    state() {
        return {
            localStoreName: 'weather-state',
            weather: '',
            currentLocationWeather: {
                place: '',
                temprature: '',
                feelsLike: '',
                description: '',
                icon: '',
                error: '',
            },
            currentWeather: {
                place: '',
                temprature: '',
                feelsLike: '',
                description: '',
                icon: '',
                error: '',
            },
            
        }
    },

    mutations: {
        getLocation(state, payload) {
            state.currentLocationWeather.place = payload.name;
            state.currentLocationWeather.temprature = `${Math.round(payload.main.temp)}°C`;
            state.currentLocationWeather.feelsLike = `${Math.round(payload.main.feels_like)}°C`;
            state.currentLocationWeather.icon = `https://openweathermap.org/img/wn/${payload.weather[0].icon}.png`;
            state.currentLocationWeather.description = payload.weather[0].description;
        },

        handleWeatherData(state, payload) {
            // state.error = '';
            state.currentWeather.place = payload.name;
            state.currentWeather.temprature = `${Math.round(payload.main.temp)}°C`;
            state.currentWeather.feelsLike = `${Math.round(payload.main.feels_like)}°C`;
            state.currentWeather.icon = `https://openweathermap.org/img/wn/${payload.weather[0].icon}.png`;
            state.currentWeather.description = payload.weather[0].description;
        },

        handleError(state, payload) {
            // state.currentWeather = {};
            if(payload.status === 404) {
                console.log('Url ikke funnet!');
                throw new Error('Url ikke funnet!');
            }
            if(payload.status === 401) {
                console.log('ikke authorisert');
                throw new Error('ikke authorisert');
            }
            if(payload.status > 500) {
                console.log('server error');
                throw new Error('Servor error!');
            }
            throw new Error('Noe gikk galt!'); 
        }
    },

    actions: {
        async fetchGeoCode(state) {
            navigator.geolocation.getCurrentPosition(position => {
                // const locationUrl = `http://api.openweathermap.org/data/2.5/weather?lati=${position.coords.latitude.toFixed(1)}&lon=${position.coords.longitude.toFixed(1)}&units=metric&appid=${client_id_key}`;
                state.dispatch('fetchLocation', position);
            });
        },

        async fetchLocation({ state, commit }, payload) {               //Destructuring helps to commit,state many times
            const locationUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${payload.coords.latitude.toFixed(1)}&lon=${payload.coords.longitude.toFixed(1)}&units=metric&appid=${client_id_key}`;
            try {
                const responseLocation = await fetch(locationUrl, headers);
                const locationOutput = await responseLocation.json();

                if(responseLocation.status >= 200 && responseLocation.status < 300) { 
                    state.currentLocationWeather.error = '';
                    commit('getLocation', locationOutput);
                    return true;
                } else {
                    state.currentLocation = {};
                    commit('handleError', responseLocation); 
                }
            } catch(error) {
                state.currentLocationWeather.error = error.message;
                console.log(error);
            }
            
            
        },

        async fetchWeatherData({ state, commit }, place) {             //Destucturing state, commit
            const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${place}&units=metric&appid=${client_id_key}`;
            try {
                const responseWeather = await fetch(weatherURL, headers);
                const weatherOutput = await responseWeather.json();

                if(responseWeather.status >= 200 && responseWeather.status < 300) {
                    state.currentWeather.error = '';
                    commit('handleWeatherData', weatherOutput); 
                    return true;
                } else {
                    state.currentWeather = {};
                    commit('handleError', responseWeather);               
                }

            } catch (error) {
                state.currentWeather.error = error.message;ªk
                console.log(state.error);
            }
        },
    },

    getters: {
        currentWeather: state => state.currentWeather,

        currentLocationWeather: state => state.currentLocationWeather,

        // errorMessage: state => state.error,

    },

}