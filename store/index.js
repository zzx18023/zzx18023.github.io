export const state = () => ({});

export const mutations = {};

export const actions = {
  nuxtServerInit({ commit }) {
    const docsContext = require.context('~/docs', false, /\.md$/);
    const docsKeys = docsContext.keys();
    const docs = docsKeys.map((src) => {
      return Object.assign(docsContext(src), {
        src,
        fileName: /\.\/(.*)\.md$/.exec(src)[1],
      });
    });
    commit('docs/setList', docs);
  },
};
