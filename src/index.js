import Vue from 'vue/dist/vue.esm';
import bluebird from 'bluebird';

import App from './app';
import './styles/index.css';
import './styles/iconfont.css';

Promise = bluebird;
window.Promise = bluebird;

new Vue({
  el: '#app',
  components: {
    App
  },
  render: h => h(App)
});