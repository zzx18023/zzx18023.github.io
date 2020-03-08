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
    <div class="main-container">
      <MarkdownView class="doc-content" :str="doc.body"></MarkdownView>
      <div id="gitalk-container"></div>
    </div>
    <!-- eslint-disable-next-line vue/no-v-html -->
    <!-- <div class="doc-content line-numbers" v-html="doc.html"></div> -->

    <!-- <div id="SOHUCS" :key="$route.params.slug" :sid="$route.params.slug"></div> -->
  </div>
</template>

<script>
import dateformat from 'dateformat';
import Gitalk from 'gitalk';
import 'gitalk/dist/gitalk.css';
import MarkdownView from '~/components/markdown-view';

export default {
  name: 'Posts',
  filters: {
    dateformat,
  },
  components: { MarkdownView },
  computed: {
    doc() {
      return this.$store.getters['docs/getItemById'](this.$route.params.slug);
    },
  },
  mounted() {
    const gitalk = new Gitalk({
      clientID: 'd97041b044b200b8fb87',
      clientSecret: '833a2e4ecb9971c3e289fbcb495780459102d370',
      repo: 'blogtalk',
      owner: 'zzx18023',
      admin: ['zzx18023'],
      id: this.$route.params.slug,
      title: this.doc.attributes.title,
      distractionFreeMode: true,
    });

    gitalk.render('gitalk-container');
  },
  head() {
    return Object.assign({
      title: this.doc.attributes.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.doc.attributes.description || '',
        },
      ],
    });
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
  // margin auto
  // max-width 1024px
  // padding 0 20px

.slug
  // margin-top 200px

.main-container
  margin auto
  margin-top 200px
  padding 8px
  max-width 1024px
</style>
