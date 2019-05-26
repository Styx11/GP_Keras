import Vue from 'vue/dist/vue.esm';
import isChinese from 'is-chinese';

export default Vue.extend({
  name: 'Inputs',
  data () {
    return {
      accord: true,
      word: '',
      wordError: false,
      num: '',
      numError: false,
      charactor: {
        5: true,
        7: true
      }
    }
  },
  template: `
    <div class='input-blocks'>
      <div class='input-blk'>
        <input
          :value='word'
          @input='inputWord'
          class='input input-word'
          :class="{'input-error': wordError}"
          placeholder='请输入藏头字（仅限四字）'/>
        <span class='iconfont info' v-show='wordError'>&#xe630;</span>
      </div>
      <div class='input-blk'>
        <input
          :value='num'
          @input='inputNum'
          class='input input-num'
          :class="{'input-error': numError}"
          placeholder='请输入言律（仅限五、七言）'/>
        <span class='iconfont info' v-show='numError'>&#xe630;</span>
      </div>
      <div class='iconfont arrow-up' @click='request'>&#xe63a;</div>
    </div>
  `,
  methods: {
    inputWord (w) {
      this.wordError && (this.wordError = false);
      this.accord || (this.accord = true);
      this.word = w.target.value;
    },
    inputNum (n) {
      this.numError && (this.numError = false);
      this.accord || (this.accord = true);
      this.num = n.target.value;
    },
    request () {
      const word = this.word;
      const num = this.num;

      (!word || !isChinese(word) || word.length !== 4) && this.disableInputWord();
      !this.charactor[num] && this.disableInputNum();
      this.accord && this.$emit('request', { word, num });
    },
    disableInputWord () {
      this.word = '';
      this.wordError = true;
      this.accord = false;
    },
    disableInputNum () {
      this.num = '';
      this.numError = true;
      this.accord = false;
    }
  }
});