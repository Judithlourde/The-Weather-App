<template>
    <section class="cat-page">
        <Weather />

        <div class="cat-idea">
            <img class="cat-idea__cat-image" src="/images/svg/cat.svg" alt="cat-image">

            <figure>
                <img src="/images/svg/cloud.svg" alt="Thinking-clould-image">

                <figcaption>
                    <img :src="getCatIdeaImage" alt="cat idea background thinking image">
                    <p>{{ getCatIdeaStatus }}</p>
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
        max-width: 100vw;
        max-height: 100vh;
        display: flex;
        flex-direction: column;
    }

    .cat-idea {
        margin-top: var(--top-xsmall);
        display: flex;
        flex-direction: column-reverse;
        align-items: center;
        width: 100%;
    }

    .cat-idea figure {
        position: relative;
    }

    .cat-idea figure img {
        margin-left: 130px;
        margin-bottom: var(--bottom-xsmall);
        width: 60%;

    }

    .cat-idea figure figcaption {
        font-size: var(--body);
        position: absolute;
        left: 150px;
        right: 60px;
        bottom: 135px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 35%;
    }

    .cat-idea figure figcaption img {
        border-radius: 100%;
        width: 32%;
    }

    .cat-idea > img {
        margin-right: 140px;
        width: 40%;
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
        .cat-idea {
            flex-direction: row;
            justify-content: center;
            align-items: center;
        }

        .cat-idea figure img {
            margin-left: 10px;
            margin-bottom: var(--bottom-xsmall);
            width: 85%;
        }

        .cat-idea figure figcaption {
            left: 100px;
            right: 0;
            bottom: 210px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            width: 40%;
            font-size: var(--highlight);
        }

        .cat-idea figure figcaption img {
            border-radius: 100%;
            width: 50%;
        }

        .cat-idea > img {
            margin-right: 10px;
            width: 15%;
        }

    }
</style>