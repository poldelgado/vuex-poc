export default {
    state: {
        cart: [],
    },
    mutations: {
        incrementProductQuantity(state, item) {
            item.quantity++;
          },
          addProductToCart(state, product) {
            state.cart.push({
              id: product.id,
              quantity: 1,
            });
          },
          removeProductFromCart(state, index) {
            state.cart.splice(index,1);
          },
          emptyCart(state) {
            state.cart = [];
          },
    },
    actions: {
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
          },
    },
    getters: {
        productsOnCart(state, getters, rootState) {
            return state.cart.map(item => {
              const product = rootState.products.products.find(product => product.id === item.id)
              return {
                title: product.title,
                price: product.price,
                quantity: item.quantity,
              };
            });
          },
          cartTotal(state, getters) {
            return getters.productsOnCart.reduce((total, current) => total + current.price * current.quantity, 0);
          },
    },
}