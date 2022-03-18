<template>
    <section class="dog-page">
        <Weather />

        <div class="dog-idea">
            <img class="dog-idea__cat-image" src="/images/svg/dog.svg" alt="dog-image"> 

            <figure>
                <img src="/images/svg/cloud.svg" alt="">
                <figcaption>{{ getCatIdeaStatus }}</figcaption>
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

        computed: {
            getCatIdeaStatus() {
                return this.$store.getters.catIdeaStatus;
            },

            getCatIdeaImage() {
                return this.$store.getters.catIdeaImage;
            }

        }
    
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
        /* height: 200px; */
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
        position: absolute;
        left: 180px;
        bottom: 130px;
    }

    .dog-idea > img {
        margin-right: 140px;
        width: 30%;
    }

    /* Medium screen devices (768px and above) */
    @media screen and (min-width: 768px) {
        .dog-idea {
            flex-direction: row;
            justify-content: center;
        } 
        
        .dog-idea > img {
            margin-right: 100px;
            width: 15%;
        }

    }
</style>