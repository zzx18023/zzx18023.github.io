<template>
  <!--  eslint-disable-next-line vue/no-v-html -->
  <div class="html-view line-numbers" v-html="html2"></div>
</template>

<script>
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
// import 'prismjs/plugins/toolbar/prism-toolbar';
// import 'prismjs/plugins/toolbar/prism-toolbar.css';
// import 'prismjs/plugins/show-language/prism-show-language';
// import 'prismjs/components/index';
// import 'prismjs/components/prism-sass';
import 'prismjs/components/prism-scss';
import 'prismjs/components/prism-less';
import 'prismjs/components/prism-stylus';
// import 'prismjs/components/prism-markup';
// import 'prismjs/components/prism-css';
// import 'prismjs/components/prism-javascript';
// import 'prismjs/components/prism-markup-templating';

// import 'prismjs/plugins/autoloader/prism-autoloader';
export default {
  name: 'HtmlView',
  props: {
    html: { type: String, default: '' },
  },
  computed: {
    html2() {
      let html = this.html;
      // 修复html 避免出现尚未闭合的节点
      const cheerio = require('cheerio');
      const $ = cheerio.load(html);
      html = $('body').html();

      // 转义script标签为纯文本
      // html = html.replace(/<(\/?)script( [^>]*)?>/g, '&lt;$1script$2&gt;');
      // html = html.replace(/<(\/?)script( [^>]*)?>/g, '&lt;$1script$2&gt;');

      return html;
    },
  },
  mounted() {
    // console.log(Prism);
    // console.log(lineNumbers);
    Prism.highlightAllUnder(this.$el);
    // console.log(this.$el);
  },
  methods: {
    // repairHTML(html) {
    //   // 修复因html截取导致的标签未闭合
    //   if (process.server) {
    //     // 服务端使用cheerio修复，
    //     const cheerio = require('cheerio');
    //     const $ = cheerio.load(html, { decodeEntities: false });
    //     return $('body').html();
    //   } else {
    //     // 客户端不用修复，浏览器会自动修复
    //     return html;
    //   }
    // },
  },
};
</script>

<style lang="stylus" scoped>
.html-view
  // display block
  /deep/
    pre[class*='language-']
      border-radius 6px
      font-size .7em

    pre[class*=language-]:before
      position absolute
      top .8em
      right 1em
      z-index 3
      color rgba(255, 255, 255, .4)
      font-size .75rem

    pre.language-js:before
      content 'js'

    pre.language-html:before
      content 'html'

    pre.language-css:before
      content 'css'

    pre.language-scss:before
      content 'scss'

    pre.language-less:before
      content 'less'

    pre.language-stylus:before
      content 'stylus'

    blockquote
      margin-left 0
      padding-left 14px
      border-left 4px solid #ddd
      color #666

    table
      margin 1em 0
      border-collapse collapse

      // border-spacing: 10px;
      // display: block;
      // width: 100%;
      // overflow: auto;
      // word-break: normal;
      // word-break: keep-all
      th
        font-weight 700

      th, td
        padding 6px 13px
        border 1px solid #ddd

      thead
        background-color #F8F8F8

      tbody
        tr:nth-child(2n)
          background-color #F8F8F8

    code
      border 1px solid #ddd
      border-radius 3px
      background-color #f6f6f6
</style>
