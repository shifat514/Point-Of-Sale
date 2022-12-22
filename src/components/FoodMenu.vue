<template>
    <div>
        <h1 class="text-slate-700 border-2 border-slate-700 font-semibold bg-white">Menu</h1>
        <div class="grid 2xl:grid-cols-3 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 lg:gap-5 py-3 ml-1">
            <div  v-for="(item) in findProductList" :key="item" :id=item.id @click="addProduct(item)">
                <div class="pointer px-1 text-sm border-2 shadow-sm border-slate-300 rounded-sm  hover:bg-slate-800 hover:text-white hover:rounded-sm hover:border-slate-800
                    hover:font-semibold">
                    <div>
                        ID #{{ item.id }}
                    </div>
                    <div class="font-semibold">
                        {{ item.name }}
                    </div>
                    <div>
                        <span class="">{{ item.price }}</span>
                        
                    </div>
                </div>
            </div>
            <div class="text-xs p-2">*Vat and service Charge is not applicable on water and cold drinks*</div>
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
                quantity: 0,
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
            this.$emit('selectProduct', this.selectMenu);
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
