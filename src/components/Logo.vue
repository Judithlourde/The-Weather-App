<template>
    <header class="header">
		<img src="/images/svg/logo-with-clouds.svg" alt="weatherApp-logo-link-to-homePage">
	</header>
</template>

<style>
    .header {
        width: 100%;
        position: fixed;
        top: 0;
        left: 0;
        /* display: flex; */
        /* align-items: center; */
        /* justify-content: space-between; */
        z-index: 99;
        max-width: 100vw;
    }

    .header img {
        width: 30%;
    }

    /* Medium screen devices (968px and above) */
    @media screen and (min-width: 968px) {
        .header img {
            width: 10%;
        }
    }
</style>