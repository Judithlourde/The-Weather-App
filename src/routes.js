import HomeView from './views/HomeView.vue';
import DogPageView from './views/DogPageView.vue';
import CatPageView from './views/CatPageView.vue';

export default [
	{ name: 'home', path: '/', component: HomeView },
	{ name: 'dog-page', path: '/dog-page', component: DogPageView },
	{ name: 'cat-page', path: '/cat-page', component: CatPageView },
];
