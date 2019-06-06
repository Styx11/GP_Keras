import Vue from 'vue/dist/vue.esm';
import domToImg from 'dom-to-image';
import { saveAs } from 'file-saver';

import Share from './components/share';

export default Vue.extend({
  name: 'Result',
  components: {
    Share
  },
  props: {
    result: {
      type: Array
    }
  },
  data () {
    return {
      showShare: false,
      dataUrl: '',
      blob: ''
    }
  },
  computed: {
    title () {
      let title = '';
      this.result
        .forEach(words => title += words[0]);
      title += ' 赋';

      return title;
    }
  },
  template: `
    <div class='result-blocks'>
      <div class='result-main' ref='result'>
        <img src='https://s2.ax1x.com/2019/05/22/V9bSR1.png' class='result-bg'/>
        <div class='result-title'>{{ title }}</div>
        <div
          class='result'
          v-for='(words, index) in result'
          :style='{marginLeft: (index * 2.4) + "rem"}'
        >
          <span v-for='i in words.length' :class="{'result-no-key': i > 1}">
            {{ words[i-1] }}
          </span>
        </div>
      </div>
      <div class='result-btns'>
        <div class='result-btn result-btn-left' @click='showShare = true'>
          <span class='result-btn-share iconfont'>&#xe63f;</span>
          <span class='result-btn-info'>分享</span>
        </div>
        <div class='result-btn result-btn-right' @click='recycle'>
          <span class='result-btn-recycle iconfont'>&#xe62f;</span>
          <span class='result-btn-info'>重做</span>
        </div>
      </div>
      <transition name="fade">
        <Share
          v-if='showShare'
          :dataUrl='dataUrl'
          @hideShare='showShare = false'
          @downloadShare='downloadShare'
        />
      </transition>
    </div>
  `,
  mounted () {
    const result = this.$refs.result;
    domToImg.toPng(result)
      .then(dataUrl => {
        this.dataUrl = dataUrl;
      })
      .catch(e => {
        console.error(e);
      });
  },
  methods: {
    recycle () {
      this.$emit('recycle');
    },
    downloadShare () {
      if (this.blob) {
        return saveAs(blob, 'poetry.png');
      }
      const result = this.$refs.result;
      domToImg.toBlob(result)
        .then(blob => {
          this.blob = blob;
          saveAs(blob, 'poerty.png');
        })
        .catch(e => {
          console.error('Error in downloading image', e);
        })
    }
  }
});