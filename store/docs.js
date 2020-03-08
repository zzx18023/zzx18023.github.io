export const state = () => {
  const docsContext = require.context('~/docs', false, /\.md$/);
  const docsKeys = docsContext.keys();
  const list = docsKeys
    .map((src) => {
      const v = docsContext(src);
      v.id = /\.\/(.*)\.md$/.exec(src)[1];
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
  // console.log(list);
  // const a = import('~/docs/' + name + '.md');
  // console.log(a);
  // const list = docsKeys.map(v=>import('~/docs/'))

  return { list };
};

export const getters = {
  getItemById(state) {
    return (id) => {
      const item = state.list.find((v) => {
        return v.id === id;
      });
      return item;
    };
  },
  paging(state) {
    return (currentPage = 1, pageSize = 10, offset = 0) => {
      const start = (currentPage - 1) * pageSize + offset;
      const end = start + pageSize;
      const list = state.list.slice(start, end);
      return {
        currentPage,
        pageSize,
        pageCount: Math.ceil((state.list.length - offset) / pageSize),
        list,
        total: state.list.length,
      };
    };
  },
  // loadArr() {},
};

export const mutations = {};
export const actions = {};
