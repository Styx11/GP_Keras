import Vue from 'vue/dist/vue.esm';
import axios from 'axios';

import Inputs from './components/inputs';
import Loading from './components/loading';
import Result from './components/result/index';

export default Vue.extend({
  name: 'App',
  components: {
    Inputs,
    Loading,
    Result,
  },
  data () {
    return {
      res: [],
      pending: false,
      responsed: false,
    };
  },
  template: `
    <div id='main'>
      <Result :result='res' v-if='responsed' @recycle='recycle' key='result'/>
      <template v-else>
        <img class='logo' src='https://s2.ax1x.com/2019/05/18/EXV4H0.jpg'/>
        <Loading v-if='pending'/>
        <Inputs @request='getRes' v-else/>
      </template>
    </div>
  `,
  methods: {
    getRes ({ word, num }) {
      this.pending = true;
      axios.get(`/poetry?word=${word}&num=${num}`, {timeout: 60000})
        .then(res => {
          if (!res) return;
          this.res = res.data;
          this.responsed = true;
        })
        .catch(e => {
          console.error(e);
        })
        .finally(() => this.pending = false);
    },
    recycle () {
      this.res = [];
      this.responsed = false;
    }
  }
});