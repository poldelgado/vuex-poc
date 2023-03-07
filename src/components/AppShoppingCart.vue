<template>
    <div>
        <h2>Carrito</h2>
        <hr>
        <ul>
            <li v-for="(item, $index) in cartItems" :key="item.id">
                {{ item.title }} ({{ item.quantity }})
                <button @click="removeItem($index)">remove</button>
            </li>
        </ul>
        <hr>
        <h4>Total {{ cartTotal || 0 }}</h4>
    </div>
</template>

<script>
import { currency} from '@/utils/currency.js';
export default {
    name: 'AppShoppingCart',
    computed: {
        cartItems() {
            return this.$store.getters.productsOnCart;
        },
        cartTotal() {
            return currency(this.$store.getters.cartTotal, 'AR$ ');
        },
    },
    methods: {
        removeItem(index) {
            this.$store.dispatch('removeProductFromCart', index);
        },
    }
}
</script>

<style scoped>
ul {
    text-align: left;
}
</style>