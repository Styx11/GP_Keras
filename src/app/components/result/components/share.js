import Vue from 'vue/dist/vue.esm';
import 'Share/css/share.min.css';
import 'Share/js/social-share.min.js';

export default Vue.extend({
  name: 'Share',
  props: {
    dataUrl: {
      type: String
    },
  },
  data () {
    return {
      config: {
        mode: 'prepend',
        url: 'https://github.com/Styx11/GP_Keras',
        image: 'https://s2.ax1x.com/2019/05/29/Vu7Ots.png',
        initialized: true,
        wechatQrcodeTitle: '请打开微信扫一扫',
      }
    }
  },
  template: `
    <div class='share'>
      <div class='share-bg' @click='hideShare'></div>
      <img class='share-img' :src='dataUrl' ref='img'/>
      <div class='share-btns'>
        <div class='social-share'>
          <a href='#' class='social-share-icon icon-weibo'></a>
          <a href='#' class='social-share-icon icon-qq'></a>
          <a href='#' class='social-share-icon icon-wechat'></a>
          <a href='#' class='social-share-icon icon-qzone'></a>
          <a href='#' class='social-share-icon icon-douban'></a>
          <a
            class='social-share-icon iconfont share-download'
            @click.prevent='downloadShare'
          >&#xe6c0;</a>
        </div>
      </div>
    </div>
  `,
  mounted () {
    window.socialShare('.social-share', this.config);
  },
  methods: {
    hideShare () {
      this.$emit('hideShare');
    },
    downloadShare () {
      this.$emit('downloadShare');
    }
  }
});