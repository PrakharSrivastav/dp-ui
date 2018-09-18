import Vue from 'vue';
//import './plugins/vuetify';
import Vuetify from 'vuetify';
import App from './App.vue';
import VueRouter from 'vue-router';
import appRoutes from './routes';
import 'vuetify/dist/vuetify.min.css' 

Vue.use(VueRouter);
Vue.use(Vuetify);
Vue.config.productionTip = false

const router = new VueRouter({
  mode: "history",
  routes: appRoutes
});


new Vue({
  render: h => h(App),
  router: router
}).$mount('#app')
