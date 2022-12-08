<template>
    <div>
        <h1 class="text-white font-semibold bg-slate-800">Menu</h1>
        <div class="grid grid-cols-3 lg:gap-5 py-3">
            <div v-for="(item) in findProductList" :key="item" :id=item.id @click="addProduct(item)">
                <div class="pointer text-sm border-2 shadow-sm border-slate-600 rounded  hover:bg-slate-800 hover:text-white
                    hover:font-semibold">
                    <div>
                        ID #{{ item.id }}
                    </div>
                    <div class="font-medium">
                        {{ item.name }}
                    </div>
                    <div>
                        <span class="">{{ item.price }}</span>
                        
                    </div>
                </div>
            </div>
        </div>

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
