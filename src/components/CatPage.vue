<template>
    <section class="cat-page">
        <Weather />

        <div class="cat-idea">
            <figure class="cat-idea__clouds">
                <img src="/images/svg/cloud.svg" alt="">
                <figcaption>{{ getWeatherStatus }}</figcaption>
            </figure>

            <img class="cat-idea__cat-image" src="/images/svg/cat.svg" alt="cat-image">        
        </div>
    </section>
</template>

<script>
import Weather from './Weather.vue';
    export default {
        components: {
            Weather,
        },

        computed: {
            getWeatherStatus() {
                return this.$store.getters.weatherStatus;
            }
        }
    }
</script>

<style>
    .cat-page {
        max-width: 100vw;
        max-height: 100vh;
        display: flex;
        flex-direction: column;
    }

    .cat-idea {
        margin-top: var(--top-small);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        /* height: 300px; */
    }

    .cat-idea__clouds {
        position: relative;
    }

    .cat-idea__clouds img {
        margin-left: 130px;
        margin-bottom: var(--bottom-small);
        width: 60%;
    }

    .cat-idea__clouds figcaption {
        position: absolute;
        bottom: 200px;
        left: 200px;
    }

    .cat-idea > img {
        margin-right: 100px;
        width: 40%;
    }

    /* Medium screen devices (768px and above) */
    @media screen and (min-width: 768px) {
        .cat-idea {
            flex-direction: row;
            justify-content: center;
        } 
        
        .cat-idea > img {
            margin-right: 100px;
            width: 20%;
        }

    }
</style>