<template>
    <header class="header">
		<img src="/images/svg/logo.svg" alt="weatherApp-logo-link-to-homePage">
	</header>
</template>

<style>
    .header {
        width: 100%;
        position: fixed;
        top: 5px;
        left: 5px;
        /* bottom: 10px; */
        /* display: flex; */
        /* align-items: center; */
        /* justify-content: space-between; */
        z-index: 99;
        max-width: 100vw;
    }

    .header img {
        width: 20%;
    }

    /* Medium screen devices (968px and above) */
    @media screen and (min-width: 968px) {
        .header img {
            width: 10%;
        }
    }
</style>