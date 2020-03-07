<template>
  <div
    ref="swiperContainer"
    class="banner-wrapper swiper-container"
    :style="{ height: height ? `${height}px` : null }"
  >
    <div class="swiper-wrapper">
      <div v-for="item in data" :key="item.fileName" class="swiper-slide">
        <div
          v-if="item.attributes.image"
          class="slide-bg"
          :style="{
            backgroundImage: `url(${require(`~/assets/image/${item.attributes.image}`)})`,
          }"
        ></div>
        <div class="slide-wrapper">
          <div class="doc-title">
            <nuxt-link
              :to="{ name: 'slug', params: { slug: item.fileName } }"
              >{{ item.attributes.title }}</nuxt-link
            >
          </div>
          <div class="doc-description">
            <span>{{ item.attributes.description }}</span>
          </div>
          <div class="doc-date">
            <span
              ><i class="iconfont icon-riqi"></i>「
              {{ item.attributes.date | dateformat('mm月 dd, yyyy') }}
              」</span
            >
          </div>
          <!--  eslint-disable vue/no-v-html -->
          <!-- <div
              class="doc-preview"
              v-html="repairHTML(item.html.slice(0, 500))"
            ></div> -->
          <HtmlView
            class="doc-preview"
            :html="item.html.slice(0, 500)"
          ></HtmlView>
          <!--  eslint-enable  -->
          <div class="read-more">
            <nuxt-link :to="{ name: 'slug', params: { slug: item.fileName } }">
              <span>查看全文 <i class="iconfont icon-jiantou-you"></i></span>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
    <div class="swiper-pagination"></div>
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from 'swiper';
import 'swiper/css/swiper.css';
import dateformat from 'dateformat';
import HtmlView from '~/components/html-view';
export default {
  name: 'HomeBanner',
  filters: {
    dateformat,
  },
  components: { HtmlView },
  props: {
    data: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      height: 0,
    };
  },
  mounted() {
    // document.addEventListener('scroll', this.uptop, {
    //   passive: true,
    // });
    this.initSwiper();

    this.watchHeight();
    // this.testSafari();
  },
  methods: {
    watchHeight() {
      const upHeight = () => {
        this.height = window.innerHeight;
      };
      window.addEventListener('resize', upHeight, {
        passive: true,
      });
      this.$once('hook:beforeDestroy', function() {
        window.removeEventListener('resize', upHeight);
      });
      upHeight();
    },
    // testSafari() {
    //   this.userAgent = navigator.vendor;
    //   if (/Safari/.test(navigator.userAgent)) {
    //     this.isSafari = true;
    //   }
    // },
    initSwiper() {
      const mySwiper = new Swiper(this.$refs.swiperContainer, {
        loop: true,
        // autoplay: {
        //   disableOnInteraction: false,
        // },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      });
      this.$once('hook:beforeDestroy', function() {
        // document.removeEventListener('scroll', this.uptop);
        mySwiper.destroy();
      });
      return mySwiper;
    },
    // uptop() {
    //   this.top = window.innerHeight;
    // },
  },
};
</script>

<style lang="stylus" scoped>
// .banner-container
// // background-color #100e17
// position sticky
// top 0
// // position relative
// z-index -1
// // overflow hidden
// // height 100vh
// color #ddd
// // left 0
// // right 0
// height 100vh
.banner-wrapper
  position sticky
  top 0
  // z-index -1
  // position absolute
  // position sticky
  overflow hidden
  // right 0
  // bottom 0
  // left 0
  // height 100vh
  height 100vh
  // height -webkit-fill-available
  // width 100vw
  background-color #100e17
  // height 100%
  // background-image url('https://res.cloudinary.com/tridiamond/image/upload/v1572613799/blog/simplify-your-javascript-with_acr2px.jpg')
  background-size cover
  color #ddd
  transform translateY(0)

.swiper-container
  .swiper-pagination
    right 0
    bottom 80px
    left 0
    width 100%

    /deep/
      .swiper-pagination-bullet
        margin 4px
        // width 40px
        border-radius 20px
        // background-color rgba(0, 0, 0, .5)
        background-color #fff
        transition width .3s

      .swiper-pagination-bullet-active
        // background-color #fff
        // height 10px
        width 20px

  .swiper-button-prev, .swiper-button-next
    color #fff

  .swiper-button-prev
    left 40px

  .swiper-button-next
    right 40px

  @media screen and (max-width: 425px)
    .swiper-button-prev, .swiper-button-next
      display none

  .swiper-slide
    position relative
    // display flex
    // justify-content center
    // align-items center
    font-size 20px

    .slide-bg
      position absolute
      top 0
      right 0
      bottom 20%
      left 20%
      z-index -1
      // width 100%
      // height 100%
      background-position center
      background-size cover
      -webkit-mask-image radial-gradient(ellipse closest-side, rgba(0, 0, 0, .3), rgba(0, 0, 0, 0))

    .slide-wrapper
      position relative
      z-index 0
      display flex
      flex-direction column
      // overflow hidden
      margin 300px 300px 100px
      max-height calc(100% - 400px)

      // height calc(100% - 400px)
      @media screen and (max-width: 1024px)
        margin 200px 200px 100px
        max-height calc(100% - 300px)

      @media screen and (max-width: 768px)
        margin 200px 100px 100px
        max-height calc(100% - 300px)

      @media screen and (max-width: 425px)
        margin 100px 20px 100px
        max-height calc(100% - 200px)

    .doc-title
      // margin-top 200px
      >a
        display inline-block
        background-image linear-gradient(
          to right,
          #b2fefa,
          #0ed2f7,
          #0052d4,
          #0ed2f7,
          #b2fefa
        )
        background-position center
        background-position 0% center
        background-position 200% center
        background-size 200% 100%
        color transparent
        text-decoration none
        font-weight bold
        font-size 56px
        -webkit-background-clip text

        &:hover
          animation bg 1s linear infinite

        @keyframes bg
          from
            background-position 200% center

          to
            background-position 0% center

    .doc-description
      margin-top 1em
      margin-left 1em
      color #7a7a8c
      font-size 14px

    .doc-date
      margin-top 1em
      margin-left 1em
      color #7a7a8c
      font-size 14px

    .doc-preview
      flex auto
      // overflow auto
      overflow hidden
      width 80%
      font-size 14px
      line-height 2

      @media screen and (max-width: 425px)
        width 100%

    .read-more
      margin-top 1em
      font-weight bold

      // font-size 1.2em
      >a
        position relative
        text-decoration none

        &:after
          position absolute
          top 65%
          right -.1em
          bottom 0
          left -.1em
          z-index -1
          background #0ed2f7
          content ''
          opacity .3
          transition top 200ms cubic-bezier(0, .8, .13, 1)

        &:hover:after
          top 0
</style>
