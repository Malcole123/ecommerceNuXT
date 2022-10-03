import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _73032d16 = () => interopDefault(import('../pages/orders.vue' /* webpackChunkName: "pages/orders" */))
const _517dcde5 = () => interopDefault(import('../pages/view_product.vue' /* webpackChunkName: "pages/view_product" */))
const _63f0bdbb = () => interopDefault(import('../pages/checkout/address.vue' /* webpackChunkName: "pages/checkout/address" */))
const _5a37facd = () => interopDefault(import('../pages/checkout/payment.vue' /* webpackChunkName: "pages/checkout/payment" */))
const _39f352e1 = () => interopDefault(import('../pages/checkout/review.vue' /* webpackChunkName: "pages/checkout/review" */))
const _719f24f2 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/orders",
    component: _73032d16,
    name: "orders"
  }, {
    path: "/view_product",
    component: _517dcde5,
    name: "view_product"
  }, {
    path: "/checkout/address",
    component: _63f0bdbb,
    name: "checkout-address"
  }, {
    path: "/checkout/payment",
    component: _5a37facd,
    name: "checkout-payment"
  }, {
    path: "/checkout/review",
    component: _39f352e1,
    name: "checkout-review"
  }, {
    path: "/",
    component: _719f24f2,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
