<template>
    <section class="dog-page">
        <Weather />

        <div class="dog-idea">
            <img class="dog-idea__dog-image" src="/images/svg/dog.svg" alt="dog-image">

            <figure>
                <img src="/images/svg/cloud.svg" alt="dog idea background thinking image">

                <figcaption>
                    <p>Today's Activity?</p>
                   
                    <p>{{ activities }}</p>
                </figcaption>
            </figure>
        </div>
    </section>
</template>

<script>
import Weather from './Weather.vue';
    export default {
        components: {
            Weather,
        },

        data() {
            return {
                activities: '',
            }
        },

        created() {
            this.fetchBored();
        },

        methods: {
            async fetchBored() {
                const boredUrl = 'https://www.boredapi.com/api/activity?type=recreational';
                const boredResponse = await fetch(boredUrl);
				try {
					await this.handleBoredResponse(boredResponse);
				} catch (error) {
					this.error = error.message;
				}    
            },

            async handleBoredResponse(boredResponse) {
                if(boredResponse.status >= 200 && boredResponse.status < 300) {
                    const activities = await boredResponse.json();
                    this.activities = activities.activity;
					return true;

                } else {
					if(response.status === 404) {
						throw new Error('Url ikke funnet!');
					}
					if(response.status === 401) {
						throw new Error('ikke authorisert');
					}
					if(response.status > 500) {
						throw new Error('Servor error!');
					}
					throw new Error('Noe gikk galt!');
				}
            },

        },

        computed: {
            getCatIdeaStatus() {
                return this.$store.getters.catIdeaStatus;
            },

            getCatIdeaImage() {
                return this.$store.getters.catIdeaImage;
            }
        },

    }
</script>

<style>
    .dog-page {
        max-width: 100vw;
        max-height: 100vh;
        display: flex;
        flex-direction: column;
    }

    .dog-idea {
        margin-top: var(--top-xsmall);
        display: flex;
        flex-direction: column-reverse;
        align-items: center;
        width: 100%;
    }

    .dog-idea figure {
        position: relative;
    }

    .dog-idea figure img {
        margin-left: 130px;
        margin-bottom: var(--bottom-xsmall);
        width: 60%;

    }

    .dog-idea figure figcaption {
        font-size: var(--body);
        position: absolute;
        left: 200px;
        right: 60px;
        bottom: 130px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 35%;
    }

    .dog-idea figure figcaption > * {
        padding: 5px 0;
    }

    .dog-idea figure figcaption img {
        border-radius: 100%;
        width: 32%;
    }

    .dog-idea > img {
        margin-right: 140px;
        width: 28%;
        animation-name: transformIt; /* It refers to line 141 name som used in keyframes */
        animation-duration: 2s;
        animation-delay: 0.02s;
        animation-timing-function: ease-in-out;
        animation-iteration-count: 1; 
    }

    @keyframes transformIt { 
        from {
            transform: translateY(-100px);
        }

        50% {
            transform: translate(50px);
        }

        75% {
            transform: rotate(30deg);
        }

        110% {
            transform: translate(-100px);
        }
    }
    /* Medium screen devices (768px and above) */
    @media screen and (min-width: 768px) {
        .dog-idea {
            flex-direction: row;
            justify-content: center;
            align-items: center;
        }

        .dog-idea figure img {
            margin-left: 10px;
            margin-bottom: var(--bottom-xsmall);
            width: 85%;
        }

        .dog-idea figure figcaption {
            left: 130px;
            right: 0;
            bottom: 190px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            width: 40%;
            font-size: var(--highlight);
        }

        .dog-idea figure figcaption img {
            border-radius: 100%;
            width: 50%;
        }

        .dog-idea > img {
            margin-right: 10px;
            width: 13%;
        }

    }
</style>