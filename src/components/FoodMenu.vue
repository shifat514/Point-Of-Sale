<template>
<div>
    <h1>Foodmenu</h1>
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

            // for(let i=0; i<this.$store.state.selectList.length(); i++)
            // {
            //     if(item.id==this.$store.state.selectList.id)
            //     {
            //         this.$store.state.selectList.price+item.price;
            //     }
            // }


            this.$emit('selectProduct', this.selectMenu);
            this.$router.push('/selectmenu');
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
