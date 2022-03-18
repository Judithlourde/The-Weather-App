<template>
    <section class="cat-page">
        <Weather />

        <!-- <div class="dog-idea">
            <figure>
                <img src="/images/svg/cloud.svg" alt="">
                <figcaption></figcaption>
            </figure>

            <img class="dog-idea__cat-image" src="/images/svg/dog.svg" alt="dog-image"> 
       
        </div> -->

        <section class="cat-idea">
            <div class="cat-idea__text">
                <p>{{ getCatIdeaStatus }}</p>
                <img :src="getCatIdeaImage" alt="">
            </div>

            <figure>
                <img class="cat-idea__cat-image" src="/images/svg/cat.svg" alt="cat-image">  
                <!-- <img class="cat-idea__cloud-image" src="/images/svg/cloud.svg" alt="thinking-cloud-image"> -->
            </figure>        
        </section>
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
    .cat-page {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .cat-idea {
        /* background-color: var(--highlight); */
        padding: 20px;
        border-radius: 25px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        height: 300px;
    }

    .cat-idea figure {
        display: flex;
    }

    .cat-idea figure img {
        width: 150px;
    }

    .cat-idea__cloud-image {
        width: 20px;
    }

    .cat-idea__text {
        background-image: url('/images/svg/cloud.svg');
        background-repeat: no-repeat;
        background-size: cover;
        width: 100%;
        /* height: 100%; */
        display: flex;
    }

    .cat-idea__text img {
        width: 50px;
        border-radius: 100%;
    }

    /* Medium screen devices (768px and above) */
    @media screen and (min-width: 768px) {
        .cat-idea {
            margin: 50px;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
        } 
        
        .cat-idea__text {
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .cat-idea__tips img {
            width: 100%;
        }

    }
</style>