<template>
  <div>
    <h2>Listado de productos</h2>
    <hr />
    <ul>
      <li
      :class="{'sold-out': nearlySoldOut(product.id)}"
      @click="selectProduct(product)"
      v-for="product in productsOnStock" :key="product.id">
        {{ product.title }} | {{ product.price }}
        <i>{{ product.inventory }} </i>
        <button @click.prevent="addToCart(product)">add</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex';
export default {
  name: "AppProductList",
  async created() {
    try {
      await this.$store.dispatch('getProducts');
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    ...mapActions({
      addToCart: 'addProductToCart',
    }),
    ...mapMutations({
      selectProduct: 'setSelectedProduct',
    }),
  },
  computed:{
    ...mapGetters([
        'productsOnStock',
        'nearlySoldOut'
              ]),
    ...mapState([
      'selectedProduct',
    ]),
  }
};
</script>

<style scoped>
ul {
  text-align: left;
}
.sold-out {
  background-color: lightpink;
  border: 3px solid tomato;
  padding: 0.3rem;
  margin: 0.1rem;
}
</style>
