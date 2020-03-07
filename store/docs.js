export const state = () => ({
  list: [],
});

export const getters = {
  fileNameGetItem(state) {
    return (fileName) => {
      const item = state.list.find((v) => {
        return v.fileName === fileName;
      });
      return item;
    };
  },
};

export const mutations = {
  setList(state, data) {
    state.list = data
      .map((v) => {
        // v.data.
        v.attributes.date = v.attributes.date || '1970/01/01 00:00:00';
        v.attributes.order = v.attributes.order || 0;
        return v;
      })
      .sort((a, b) => {
        if (a.attributes.order === b.attributes.order) {
          // 权重相等按时间倒序
          return new Date(b.attributes.date) - new Date(a.attributes.date);
        } else if (a.attributes.order === -1 || b.attributes.order === -1) {
          // 权重为-1的表示置顶
          return a.attributes.order - b.attributes.order;
        } else {
          // 无置顶的权重越高越靠前
          return b.attributes.order - a.attributes.order;
        }
      });
  },
  loadDocs(state) {
    const docsContext = require.context('~/docs', false, /\.md$/);
    const docsKeys = docsContext.keys();
    const docs = docsKeys.map((src) => {
      return Object.assign(docsContext(src), {
        src,
        fileName: /\.\/(.*)\.md$/.exec(src)[1],
      });
    });
    this.commit('docs/setList', docs);
  },
};
export const actions = {};
