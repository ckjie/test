import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('../index.vue'),
      meta: { title: 'index' }
    },
    {
      path: '/test001',
      name: 'test001',
      component: () => import('../pages/test-page001.vue'),
      meta: { title: 'test-page001' }
    },
    {
      path: '*',
      component: () => import('../index.vue')
    }
  ]
});
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next();
})

export default router;