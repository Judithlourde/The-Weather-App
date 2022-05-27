const client_id_key = '22472f42832eb6d9fd13004d1fb61926';
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
        // CatIdea function gives the ideas and images depends upon the weather condition
        catIdea(state, payload) {
            if(payload.weather[0].id === 804) {
                state.catIdeaStatus = 'Can we sleep extra today?';
                state.catIdeaImage = '/images/cat_sleeping.jpg';
            }

            if(payload.weather[0].id === 800 || payload.weather[0].id <= 803) {
                state.catIdeaStatus = 'Can we go out today?';
                state.catIdeaImage = '/images/cat_sunglass.jpg';
            }

            if(payload.weather[0].id > 700 && payload.weather[0].id < 799) {
                state.catIdeaStatus = 'Canwe drink a cup of tea?';
                state.catIdeaImage = '/images/cat_with_tea.jpg';
            }

            if(payload.weather[0].id >= 600 && payload.weather[0].id < 700) {
                console.log(payload)
                state.catIdeaStatus = `Don't forget to wear the winter jakket!`;
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
            state.currentWeather.place = ''         // To avoid repeating the place in state when change the page from cat to dog or dog to cat
            state.currentLocationWeather.place = payload.name;
            state.currentLocationWeather.temprature = `${Math.round(payload.main.temp)}°C`;
            state.currentLocationWeather.feelsLike = `${Math.round(payload.main.feels_like)}°C`;
            state.currentLocationWeather.icon = `https://openweathermap.org/img/wn/${payload.weather[0].icon}.png`;
            state.currentLocationWeather.description = payload.weather[0].description;    
        },

        handleWeatherData(state, payload) {
            // state.error = '';
            // state.currentWeather = {};
            state.currentWeather.place = payload.name;
            state.currentWeather.temprature = `${Math.round(payload.main.temp)}°C`;
            state.currentWeather.feelsLike = `${Math.round(payload.main.feels_like)}°C`;
            state.currentWeather.icon = `https://openweathermap.org/img/wn/${payload.weather[0].icon}.png`;
            state.currentWeather.description = payload.weather[0].description;

            // Local storage for search place
            localStorage.setItem('place', state.currentWeather.place);
            const savedPlaced = localStorage.getItem('place');
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
            const locationUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${'22472f42832eb6d9fd13004d1fb61926'}`;   
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

        //Destucturing state, commit helps to use many commits and states in the (actions) function 
        async fetchWeatherData({ state, commit }, place) {            
            const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${place}&units=metric&appid=${'22472f42832eb6d9fd13004d1fb61926'}`;
            try {
                const responseWeather = await fetch(weatherURL, headers);
                const weatherOutput = await responseWeather.json();

                if(responseWeather.status >= 200 && responseWeather.status < 300) {
                    state.currentWeather.error = '';
                    // state.currentWeather = {};
                    console.log(weatherOutput)
                    console.log(state.currentWeather.place)
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