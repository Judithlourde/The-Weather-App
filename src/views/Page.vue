<template>
    <CatPage v-if="$route.params.page_id === 'cat-page'" />
    <DogPage v-if="$route.params.page_id === 'dog-page'" />
</template>

<script>
    import CatPage from '../components/CatPage.vue';
    import DogPage from '../components/DogPage.vue';
    export default {
        components: {
            CatPage,
            DogPage
        },
    }
</script>
