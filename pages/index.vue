<template>
  <div class="home">
    <hemoBanner :data="bannerData"></hemoBanner>
    <div class="wave-wrapper">
      <div class="wave wave_before wave-1"></div>
      <div class="wave wave_after wave-1"></div>
      <div class="wave wave_before wave-2"></div>
      <div class="wave wave_after wave-2"></div>
      <div class="wave wave_before wave-3"></div>
      <div class="wave wave_after wave-3"></div>
    </div>
    <div class="home-main-container">
      <div class="home-main-wrapper">
        <div class="card-wrapper">
          <Card
            v-for="item in docsList"
            :key="item.fileName"
            :data-key="item.fileName"
            class="doc-card"
            shadow="hover"
          >
            <div class="doc-title-wrapper">
              <span v-if="item.attributes.order === -1" class="zd-tag"
                ><i class="iconfont icon-ziyuan"></i>[置顶]</span
              >
              <nuxt-link
                class="doc-title"
                :to="{ name: 'slug', params: { slug: item.fileName } }"
                >{{ item.attributes.title }}</nuxt-link
              >
            </div>
            <div class="doc-date">
              <span
                ><i class="iconfont icon-riqi"></i
                >{{ item.attributes.date | dateFormat('mm月 dd, yyyy') }}</span
              >
            </div>
            <div class="doc-description">
              <span>{{ item.attributes.description }}</span>
            </div>
            <!-- <div
            class="doc-preview"
            v-html="repairHTML(item.html.slice(0, 500))"
          ></div> -->
            <HtmlView
              class="doc-preview"
              :html="item.html.slice(0, 200)"
            ></HtmlView>
            <div class="doc-readMore">
              <nuxt-link
                :to="{ name: 'slug', params: { slug: item.fileName } }"
              >
                <span>查看全文 <i class="iconfont icon-jiantou-you"></i></span>
              </nuxt-link>
            </div>
            <!-- <HtmlView></HtmlView> -->
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Card } from 'element-ui';
import dateFormat from 'dateformat';
// import htmlScoped from '~/mixins/html-scoped';
import hemoBanner from '~/components/home/banner';
import HtmlView from '~/components/html-view';

export default {
  name: 'Home',
  components: { hemoBanner, Card, HtmlView },
  filters: { dateFormat },
  data() {
    return {
      // bannerData: [
      //   {
      //     title: '',
      //   },
      // ],
    };
  },
  computed: {
    bannerData() {
      return this.$store.state.docs.list
        .filter((v) => {
          return v.attributes.order === -1;
        })
        .slice(0, 3);
    },
    docsList() {
      return this.$store.state.docs.list.slice(this.bannerData.length);
    },
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
  head() {
    return Object.assign(
      {
        title: '首页',
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: '一个简单的博客',
          },
        ],
      },
      // htmlScoped.head.call(this),
    );
  },
};
</script>

<style lang="stylus" scoped>
.wave-wrapper
  position relative
  z-index 1
  overflow hidden
  // display flex
  margin-top -80px
  height 80px

  // background-color red
  .wave
    position absolute
    // display none
    // top 0
    bottom 0
    // flex none
    width 1920px
    height 80px
    background-image url('~@/assets/image/wave-light.png')
    background-size 100% 100%
    transform translateX(0%)
    animation move_wave 20s linear infinite
    mask-image linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1))

    @keyframes move_wave
      from
        transform translateX(0%)

      to
        transform translateX(-100%)

  .wave-2
    animation-duration 10s
    animation-delay -3s
    animation-direction reverse

  .wave-3
    animation-duration 7s
    animation-delay -6s

  .wave_before
    left 0

  .wave_after
    left 1920px

.home-main-container
  position relative
  z-index 1
  // margin-top -40px
  // overflow hidden
  background-color #fff

  // margin-top -80px
  .home-main-wrapper
    margin auto
    max-width 1200px
.card-wrapper
  overflow hidden
.doc-card
  margin 10px

  .zd-tag
    padding 2px
    border 1px solid #999
    border-radius 6px
    // background-image linear-gradient(
    // to right,
    // #0052d4,
    // #0ed2f7,
    // #b2fefa
    // )
    color #999
    font-size .5em

  .doc-title
    text-decoration none
    font-size 24px

  .doc-date
    margin-top .5em
    color #999
    font-size 14px

  .doc-description
    margin-top 1em
    color #999

  .doc-readMore
    // margin-left auto
    text-align right

    a
      text-decoration none
</style>
