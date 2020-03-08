<template>
  <header class="header-container">
    <div
      ref="headerWrapper"
      class="header-wrapper"
      :class="{
        hidden,
        bgTransparent,
      }"
      :data-hiddenScrollY="hiddenScrollY"
    >
      <div class="header-logo-wrapper"></div>
      <div class="header-nav-wrapper">
        <nuxt-link class="nav" to="/">
          <span>Home</span>
        </nuxt-link>
        <nuxt-link class="nav" to="/1">
          <span>About</span>
        </nuxt-link>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'HomeHeader',
  data() {
    return {
      scrollY: 0,
      hiddenScrollY: 0,
      hidden: false,
      bgTransparent: true,
    };
  },
  computed: {},
  watch: {
    // scrollY: {
    //   handler(val, oldVal) {
    //     if (val < this.$refs.headerWrapper.offsetHeight) {
    //       this.hidden = false;
    //     }else if(){
    //     }
    //     // this.hidden =
    //     //   val > this.$refs.headerWrapper.offsetHeight && val > oldVal;
    //   },
    //   // deep: true,
    // },
  },
  mounted() {
    const upScrollY = () => {
      const scrollY = (this.scrollY = window.scrollY);
      if (scrollY < this.$refs.headerWrapper.offsetHeight) {
        // 滚动位置小于导航栏高度直接显示
        this.hidden = false;
        this.hiddenScrollY = scrollY;
        this.bgTransparent = true;
      } else if (scrollY > this.hiddenScrollY) {
        // 向下滚动时隐藏导航栏
        this.hidden = true;
        this.hiddenScrollY = scrollY;
        this.bgTransparent = true;
      } else if (scrollY + 200 < this.hiddenScrollY) {
        // 向上滚动时显示导航栏，并且至少滚动了200px，避免因向下滚动触底回弹导致触发导航栏显示
        this.hidden = false;
        this.hiddenScrollY = scrollY;
        this.bgTransparent = false;
      } else {
      }
    };
    document.addEventListener('scroll', upScrollY, {
      passive: true,
    });
    this.$once('hook:beforeDestroy', function() {
      document.removeEventListener('scroll', upScrollY);
    });
  },
};
</script>

<style lang="stylus" scoped>
.header-container
  position relative
  z-index 100
  height 0px

.header-wrapper
  position fixed
  top 0
  right 0
  left 0
  z-index 100
  display flex
  padding 40px 40px 20px
  // height 120px
  background-color rgba(0, 0, 0, .8)
  box-shadow 0px 0px 12px 6px rgba(0, 0, 0, .8)
  transition all .3s

  &.bgTransparent
    background-color rgba(0, 0, 0, 0)
    box-shadow 0px 0px 12px 6px rgba(0, 0, 0, 0)

  &.hidden
    box-shadow 0px 0px 12px 6px rgba(0, 0, 0, 0)
    transform translateY(-100%)

.header-nav-wrapper
  display flex
  flex none
  margin-left auto
  color #999
  font-size 24px

  .nav
    display block
    margin 0 10px
    padding 10px
    // transition color .3s
    // color transparent
    text-decoration none
    // color transparent
    font-weight bold

    >span
      position relative
      background-image linear-gradient(to right, #fff, #fff)
      color transparent
      // transition background-image 30s
      -webkit-background-clip text

      &:before
        position absolute
        // right -5px
        bottom 0
        left -5px
        z-index -1
        // top 100%
        // width calc(100% + 10px)
        width 0
        // top 65%3
        height 2px
        background linear-gradient(to right, #b2fefa, #0ed2f7, #0052d4)
        content ''
        // opacity .3
        transition all 200ms

    &:hover
      >span
        &:before
          width calc(100% + 10px)
          // height 2px
          // top
          // animation nav-hover .3s

    &.nuxt-link-exact-active
      >span
        // background-image linear-gradient(to right, #b2fefa, #0ed2f7, #0052d4)
        background-image linear-gradient(to right, #b2fefa, #0ed2f7, #0052d4)
        // -webkit-background-clip text
        // -webkit-text-fill-color transparent
</style>
