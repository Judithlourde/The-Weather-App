import HomeView from './views/HomeView.vue';
import Page from './views/Page.vue';

export default [
	{ name: 'page', path: '/:page_id', component: Page },
	{ name: 'home', path: '/', component: HomeView },
];
