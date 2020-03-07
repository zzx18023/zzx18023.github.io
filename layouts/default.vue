<template>
  <div class="layout-default">
    <homeHeader></homeHeader>
    <main class="main-container">
      <nuxt />
    </main>
  </div>
</template>

<script>
import homeHeader from '~/components/header';

export default {
  name: 'LayoutDefault',
  components: { homeHeader },
};
</script>

<style lang="stylus" scoped>
.layout-default
  padding-bottom 0

  @supports (bottom: env(safe-area-inset-bottom))
    padding-bottom env(safe-area-inset-bottom)
</style>
