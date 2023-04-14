import shop from "../api/shop.js";
import Vue from "vue";

export default {
    state: {
        products: [],
        selectedProduct: {},
    },
    mutations: {
        setProducts(state, products) {
            state.products = products;
          },
        
          decrementProductInventory(state, product) {
            product.inventory--;
          },
          incrementProductInventory(state, item) {
            const product = state.products.find(product => product.id === item.id);
            product.inventory += item.quantity;
          },
          setSelectedProduct(state, product) {
            state.selectedProduct = product;
          },
          editProduct(state, data) {
            // Buscar el indice del producto
            const index = state.products.findIndex(
                  product => product.id === state.selectedProduct.id
                );
            console.log(data,index);
            // Componer el producto en base a las propiedades cambiadas
            const product = Object.assign({}, state.products[index], data);      
            // Actualizarlo activando la reactividad
            Vue.set(state.products, index, product);
          },
    },
    actions: {
        getProducts({commit}) {
            return new Promise((resolve) => {
              shop.getProducts(products => {
                commit('setProducts', products);
                resolve();
              });
            })
          },
    },
    getters: {
        productsOnStock(state) {
            return state.products.filter(product => {
              return product.inventory > 0;
            });
          },
          
          selectedProduct(state) {
            return state.selectedProduct;
          },
          nearlySoldOut(state) {
            return id => {
              return state.products.find(product => product.id === id).inventory < 2;
            }
          },
    },
}