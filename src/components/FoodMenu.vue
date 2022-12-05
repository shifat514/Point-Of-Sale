<template>
<div>
    <h1>Foodmenu</h1>
   <router-link to="./ordermenu">ordered Menu</router-link>
    <ul>
        <div>
            <li class="pointer" v-for="(item) in findProductList" :key="item" :id=item.id @click="addProduct(item)">
                <div>
                    {{ item.id }}.
                </div>
                <div>
                    Item: {{ item.name }}
                </div>
                <div>
                    Price: {{ item.price }}
                </div>
                <br>
            </li>
        </div>
    </ul>
</div>
</template>

<script>
export default {
    name: "foodmenu",
    data() {
        return {
            orderMenu: {
                id: '',
                foodName: '',
                price: '',
            }
        };
    },

    computed: {
        findProductList() {
            return this.$store.getters.getProductList;
        }
    },

    methods: {
        addProduct(item) {
            this.orderMenu = item;
            console.log(this.orderMenu);
            this.$emit('orderProduct', this.orderMenu);
            this.$router.push('/ordermenu');
        }
    }
}
</script>

<style scoped>
.pointer {
    cursor: pointer;
}

ul {
    list-style-type: none;
}
</style>
