import Vue from 'vue/dist/vue.esm';
import axios from 'axios';

import Inputs from './components/inputs';
import Loading from './components/loading';

export default Vue.extend({
  name: 'App',
  components: {
    Inputs,
    Loading,
  },
  data () {
    return {
      
    };
  },
  template: `
    <div id='main'>
      
    </div>
  `,
  methods: {
    
  }
});