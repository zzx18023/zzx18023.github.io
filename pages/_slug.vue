<template>
  <div class="slug">
    <div class="bg">
      <img
        v-if="doc.attributes.image"
        class="bg-image"
        :src="require(`~/assets/image/${doc.attributes.image}`)"
        alt=""
      />
    </div>
    <div class="banner-container">
      <div class="banner-wrapper">
        <h1 class="doc-title">
          <span>{{ doc.attributes.title }}</span>
        </h1>
        <h2 class="doc-description">
          <span>{{ doc.attributes.description }}</span>
        </h2>
        <div class="doc-date">
          <span
            ><i class="iconfont icon-riqi"></i>「
            {{ doc.attributes.date | dateformat('mm月 dd, yyyy') }}
            」</span
          >
        </div>
      </div>
    </div>
    <!-- eslint-disable-next-line vue/no-v-html -->
    <!-- <div class="doc-content line-numbers" v-html="doc.html"></div> -->
    <HtmlView class="doc-content" :html="doc.html"></HtmlView>
  </div>
</template>

<script>
import dateformat from 'dateformat';
// import htmlScoped from '~/mixins/html-scoped';
import HtmlView from '~/components/html-view';
export default {
  name: 'Posts',
  filters: {
    dateformat,
  },
  components: { HtmlView },
  computed: {
    doc() {
      return this.$store.getters['docs/fileNameGetItem'](
        this.$route.params.slug,
      );
    },
  },

  head() {
    return Object.assign(
      {
        title: this.doc.attributes.title,
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: this.doc.attributes.description || '',
          },
        ],
      },
      // htmlScoped.head.call(this),
    );
  },
};
</script>

<style lang="stylus" scoped>
.banner-container
  position relative
  overflow hidden
  padding-top 100px
  // height 100vw

.bg
  position absolute
  top 0
  right 0
  z-index -1
  overflow hidden
  // bottom 0
  // left 0
  width 100vw
  height 100vh
  background-color #100e17
  -webkit-mask-image linear-gradient(to bottom, rgba(0, 0, 0, 1) 20%, rgba(0, 0, 0, 0))

.bg-image
  position absolute
  top -10vw
  // right
  left 10vw
  // height 80%
  // max-width 900px
  width 80vw
  // height 900px
  object-fit cover
  -webkit-mask-image radial-gradient(ellipse closest-side, rgba(0, 0, 0, .3), rgba(0, 0, 0, 0))

  @media (max-width: 1024px)
    // right 0
    left 0
    width 100vw
  // right 10%

.banner-wrapper
  margin auto
  padding 0 20px
  max-width 1024px
  color #ddd

.doc-title
  display inline-block
  background-image linear-gradient(
    to right,
    #0052d4,
    #0ed2f7,
    #b2fefa
  )
  color transparent
  font-weight bold
  font-size 56px
  -webkit-background-clip text

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

.doc-content
  margin auto
  margin-top 200px
  padding 8px
  max-width 1024px
  // padding 0 20px

.slug
  // margin-top 200px
</style>
