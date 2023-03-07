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
    incrementProductInventory(state, item) {
      const product = state.products.find(product => product.id === item.id);
      product.inventory += item.quantity;
    },
    removeProductFromCart(state, index) {
      state.cart.splice(index,1);
    }
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
    },
    removeProductFromCart(context, index) {
      const item = context.state.cart[index];

      //Eliminar producto del carrito
      context.commit("removeProductFromCart", index);

      //Restaurar el inventario
      context.commit("incrementProductInventory", item);
    }
  },
  getters: {
    productsOnStock(state) {
      return state.products.filter(product => {
        return product.inventory > 0;
      });
    },
    productsOnCart(state) {
      return state.cart.map(item => {
        const product = state.products.find(product => product.id === item.id)
        return {
          title: product.title,
          price: product.price,
          quantity: item.quantity,
        };
      });
    },
    cartTotal(state, getters) {
      return getters.productsOnCart.reduce((total, current) => total + current.price * current.quantity, 0);
    }
  },
  modules: {}
});
