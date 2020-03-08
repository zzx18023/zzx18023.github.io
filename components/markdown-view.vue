<template>
  <!--  eslint-disable-next-line vue/no-v-html -->
  <div class="html-view line-numbers" v-html="html"></div>
</template>

<script>
// import Prism from 'prismjs';
// import 'prismjs/themes/prism-tomorrow.css';
// import 'prismjs/plugins/line-numbers/prism-line-numbers';
// import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
// import 'prismjs/components/prism-scss';
// import 'prismjs/components/prism-less';
// import 'prismjs/components/prism-stylus';

// import 'prismjs/components/prism-markup';
// import 'prismjs/components/prism-css';
// import 'prismjs/components/prism-javascript';
// import 'prismjs/components/prism-markup-templating';
// import 'prismjs/plugins/toolbar/prism-toolbar';
// import 'prismjs/plugins/toolbar/prism-toolbar.css';
// import 'prismjs/plugins/show-language/prism-show-language';
// import 'prismjs/components/index';
// import 'prismjs/components/prism-sass';
// import 'prismjs/plugins/autoloader/prism-autoloader';

import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark-reasonable.css';
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight(str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value;
      } catch (__) {}
    }
    return ''; // 使用额外的默认转义
  },
});

// console.log(md);

export default {
  name: 'MarkdownView',
  props: {
    str: { type: String, default: '' },
  },
  computed: {
    html() {
      const html = md.render(this.str);
      // 修复html 避免出现尚未闭合的节点
      // const cheerio = require('cheerio');
      // const $ = cheerio.load(html);
      // html = $('body').html();

      // 转义script标签为纯文本
      // html = html.replace(/<(\/?)script( [^>]*)?>/g, '&lt;$1script$2&gt;');
      // html = html.replace(/<(\/?)script( [^>]*)?>/g, '&lt;$1script$2&gt;');
      // const result = md.render('# markdown-it rulezz!');
      // console.log(result);
      return html;
    },
  },
  mounted() {
    // console.log(Prism);
    // console.log(lineNumbers);
    // Prism.highlightAllUnder(this.$el);
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
    // pre[class*='language-']
    // border-radius 6px
    // font-size .7em
    pre
      overflow auto
      padding 1em
      border-radius 6px
      background-color #2d2d2d
      color #999
      font-size .7em

    table
      margin 1em 0
      border-collapse collapse

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

    :not(pre)>code
      padding 3px
      border 1px solid #ddd
      border-radius 3px
      background #f6f6f6
      font-size .8em
    blockquote
      color: #666;
      border-left: 4px solid #ddd;
      padding-left: 20px;
      margin-left: 0;
      font-size: .8em;
      // font-style: italic;
</style>
