<template>
  <div class="slug">
    <h1>{{ doc.attributes.title }}</h1>
    <h2>{{ doc.attributes.description }}</h2>
    <!-- eslint-disable-next-line vue/no-v-html -->
    <!-- <div class="doc-content line-numbers" v-html="doc.html"></div> -->
    <HtmlView class="doc-content" :html="doc.html"></HtmlView>
  </div>
</template>

<script>
// import htmlScoped from '~/mixins/html-scoped';
import HtmlView from '~/components/html-view';
export default {
  name: 'Posts',
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
.doc-content
  margin auto
  padding 8px
  max-width 900px

.slug
  margin-top 200px
</style>
