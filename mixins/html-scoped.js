export default {
  head() {
    return {
      htmlAttrs: {
        [this.$vnode.componentOptions.Ctor.options._scopeId]: this.$vnode
          .componentOptions.Ctor.options._scopeId,
      },
    };
  },
};
