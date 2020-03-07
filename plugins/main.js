export default (context) => {
  const { app } = context;

  const mixin = {
    mounted() {
      // console.log(666);

      // 使移动端能响应:active选择器样式
      document.body.addEventListener('touchstart', () => {});
    },
  };
  app.mixins = app.mixins || [];
  app.mixins.push(mixin);
};
