<template>
<div class="bg-slate-300">
    <h1 class="underline text-2xl">Foodmenu</h1>
   <router-link to="./selectmenu">selected Menu</router-link>
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
            selectMenu: {
                id: 0,
                name: '',
                price: 0,
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
            this.selectMenu = item;
            console.log(this.selectMenu);
            this.$emit('selectProduct', this.selectMenu);
           // this.$router.push('/selectmenu');
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
