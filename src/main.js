'use strict'

import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@mdi/font/css/materialdesignicons.css'
import './components'

import App from './App.vue'
import plugins from './plugins'
import i18n from './i18n'
import router from './routes'
import store from './store'

Vue.config.productionTip = false

Vue.use(plugins)
Vue.use(Vuetify, {
	iconfont: 'mdi',
	lang: { t: (key, ...params) => i18n.t(key, params) },
	theme: {
		primary: '#ff751a',
		secondary: '#ff751a',
		accent: '#ff751a',
		error: '#ff1a1a',
		info: '#ff751a',
		success: '#ff751a',
		warning: '#ff1a1a'
	}
})



/* eslint-disable no-new */
new Vue({
	el: '#app',
	i18n,
	render: h => h(App),
	router,
	store
})
