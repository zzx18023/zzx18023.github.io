export const state = () => ({});

export const mutations = {};

export const actions = {
  nuxtServerInit({ commit }) {
    commit('docs/loadDocs');
  },
};
