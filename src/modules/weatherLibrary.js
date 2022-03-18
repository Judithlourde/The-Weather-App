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
            catIdeaStatus: '',
            catIdeaImage: '',
            currentWeatherVisible: false,
        }
    },

    mutations: {
        catIdea(state, payload) {
            if(payload.weather[0].id > 800) {
                state.catIdeaStatus = 'Can we sleep extra today! 😴';
                state.catIdeaImage = '/images/cat_sleeping.jpg';
            }

            if(payload.weather[0].id === 800) {
                state.catIdeaStatus = 'Can we go out today! 🍦';
                state.catIdeaImage = '/images/cat_sunglass.jpg';
            }

            if(payload.weather[0].id > 700 && payload.weather[0].id < 799) {
                state.catIdeaStatus = 'Can drink a cup of tea! 🫖';
                state.catIdeaImage = '/images/cat_with_tea.jpg';
            }

            if(payload.weather[0].id >= 600 && payload.weather[0].id < 700) {
                console.log(payload)
                state.catIdeaStatus = `Don't forget to wear the winter jakket! 🧥`;
                state.catIdeaImage = '/images/cat_in_snow.jpg';
            }

            if(payload.weather[0].id >= 500 && payload.weather[0].id < 599) {
                console.log(payload)
                state.catIdeaStatus = `Don't forget umbrella today!`;
                state.catIdeaImage = '/images/cat_umbrella.jpg';
            }

            if(payload.weather[0].id >= 300 && payload.weather[0].id < 399) {
                console.log(payload)
                state.catIdeaStatus = `Can we drink soup today?`;
                state.catIdeaImage = '/images/soup.jpg';
            }

            if(payload.weather[0].id >= 200 && payload.weather[0].id < 299) {
                console.log(payload)
                state.catIdeaStatus= `Don't forget wear rain coat and boots`;
                state.catIdeaImage = '/images/rain_boots.jpg';
            }
        },

        handleCurrentWeather(state, payload) {
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
            // state.currentWeather.id = payload.weather[0].id;

            console.log(state.currentWeather.icon)
            console.log(payload)

            // Local storage for search place
            localStorage.setItem('place', state.currentWeather.place);
            const savedPlaced = localStorage.getItem('place')
            console.log(savedPlaced)
        },

        // I have only one error handling mutation with payload for to different fetch data functions to avoid DRY code.  
        handleError(state, payload) {
            if(payload.status === 404) {
                throw new Error('Sorry, Weather could not be found. Please write the correct place.');
            }
            if(payload.status === 401) {
                throw new Error('Unauthorized');
            }
            if(payload.status > 500) {
                throw new Error('Servor Error!');
            }
            throw new Error('Something went wrong!'); 
        },
    },

    actions: {
        // Function fetchGeoCode gives the current position data and dispatch (action) fetchCurrentLocation with payload position
        async fetchGeoCode({ state, commit, dispatch }) {
            navigator.geolocation.getCurrentPosition(position => { 
                dispatch('fetchCurrentLocation', position);
                console.log(position);
                // (method) Geolocation.getCurrentPosition(successCallback: PositionCallback, errorCallback?: PositionErrorCallback, options?: PositionOptions
            });
        },
        
        // fetchCurrentLocation fetching data by latitude and longitude
        async fetchCurrentLocation({ state, commit }, position) {               //Destucturing state, commit helps to use many commits and states in the (actions) function 
            const locationUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${client_id_key}`;   
            try {
                const responseLocation = await fetch(locationUrl, headers);
                const locationOutput = await responseLocation.json();

                //if status is ok (between >= 200 and < 300) go to the data handling function - commit (mutation) getLocation with payload (response)
                if(responseLocation.status >= 200 && responseLocation.status < 300) { 
                    state.currentLocationWeather.error = '';
                    state.currentWeatherVisible = true;
                    commit('handleCurrentWeather', locationOutput);
                    commit('catIdea', locationOutput)
                    return true;

                // else go to the error handling function with the response - commit (mutation)
                } else {  
                    commit('handleError', responseLocation); 
                }
            
            //Catch - gets the message from handleError mutation
            } catch(error) {
                state.currentLocationWeather.error = error.message;
            }    
        },

        async fetchWeatherData({ state, commit }, place) {             //Destucturing state, commit helps to use many commits and states in the (actions) function 
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
                state.currentWeather.error = error.message;
            }
        },
    },

    getters: {
        currentWeather: state => state.currentWeather,
        currentLocationWeather: state => state.currentLocationWeather,
        currentWeatherVisible: state => state.currentWeatherVisible,
        catIdeaStatus: state => state.catIdeaStatus,
        catIdeaImage: state => state.catIdeaImage,
    },

}