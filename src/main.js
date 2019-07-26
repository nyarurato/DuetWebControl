'use strict'

import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import './components'

import App from './App.vue'
import plugins from './plugins'
import i18n from './i18n'
import router from './routes'
import store from './store'

Vue.config.productionTip = false

Vue.use(plugins)
Vue.use(Vuetify, {
	lang: { t: (key, ...params) => i18n.t(key, params) },
	theme: {
		primary: '#ff6600',
		secondary: '#ff6600',
		accent: '#ff6600',
		error: '#ff0000',
  		info: '#ff6600',
 		success: '#ff6600',
  		warning: '#ff0000'
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
