import weatherLibrary from "./modules/weatherLibrary.js";

export default {
	state() {
		return {
			navigation: {
				visible: false,
				pages: [
					{ title: 'Cat', id: 'cat-page', file: '/images/svg/fish.svg', caption: 'fish-icon-link-to-catPge' },
					{ title: 'Dog', id: 'dog-page', file: '/images/svg/bone.svg', caption: 'bone-icon-link-to-dogPge' },
				]
			}
		};
	},

	getters: {
		getPages(state) {
			return state.navigation.pages;
		},
	},

	mutations: {
		addPage(state, page) {
			state.navigation.pages.push(page);
		},
	},

	modules: {
		weatherLibrary,
	}
};
