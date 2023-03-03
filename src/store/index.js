import Vue from "vue";
import Vuex from "vuex";
import api from "../api/shop.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [],
    cart: [],
  },
  mutations: {
    setProducts(state, products) {
      state.products = products;
    },
    incrementProductQuantity(state, item) {
      item.quantity++;
    },
    addProductToCart(state, product) {
      state.cart.push({
        id: product.id,
        quantity: 1,
      });
    },
    decrementProductInventory(state, product) {
      product.inventory--;
    },
  },
  actions: {
    getProducts({commit}) {
      return new Promise((resolve) => {
        api.getProducts(products => {
          commit('setProducts', products);
          resolve();
        });
      })
    },
    addProductToCart(context, product) {
      //Verificar si hay inventario del producto
      if (product.inventory === 0) return;
      //Existe ya en el carrito?
      const item = context.state.cart.find(item => item.id === product.id)
      if (item) {
        //Si es asi sumar uno mas a la compra
        context.commit('incrementProductQuantity', item);
      } else {
        //Si no es asi, añadir el prod al carrito
        context.commit('addProductToCart', product);
      }
      //Restar al inventario del producto
      context.commit('decrementProductInventory', product);
    }
  },
  getters: {
    productsOnStock(state) {
      return state.products.filter(product => {
        return product.inventory > 0;
      });
    }
  },
  modules: {}
});
