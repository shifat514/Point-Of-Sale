<template>
<div>
    <div>
        <li class="pointer" v-for="(item) in selectProductList" :key="item" :id=item.id>
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
    <div>Charge : {{ selectCharge }}</div>
    <div>Vat : {{ vat }}</div>
    <div>SC : {{ serviceCharge }}</div>
    <div>Extra Charge : {{ extraCharge }}</div>
    <div>Total : {{ totalCharge }}</div>
    <FoodMenu @selectProduct="addedProduct" />
</div>
</template>

<script>
import FoodMenu from './FoodMenu.vue';

export default {
    data() {
        return {
            menu: {
                id: 0,
                name: '',
                price: 0,
            },
            selectCharge: 0,
            vat: 0,
            serviceCharge: 0,
            extraCharge: 0,
            totalCharge: 0,
        };
    },

    components: {
        FoodMenu
    },

    computed: {
        selectProductList() {
            return this.$store.getters.getSelectList;
        }
    },

    methods: {
        calculateCharges(basicCharge) {

            this.vat = .05*basicCharge;
            this.serviceCharge = .10*basicCharge;
            this.extraCharge = this.vat + this.serviceCharge;
            this.totalCharge = basicCharge + this.extraCharge;
        },

        selectedProduct(listLength) {
            if (listLength < 1) {
                this.$store.dispatch('selectMenu', this.menu);
                this.selectCharge += this.menu.price;
            } else {
                let flag = 0;
                for (let i = 0; i < listLength; i++) {
                    if (this.menu.id === this.$store.getters.getSelectList[i].id) {
                        flag = 1;
                        // console.log(this.menu.price);
                        this.$store.getters.getSelectList[i].price += this.menu.price;
                        this.selectCharge += this.menu.price;
                    }
                }
                if (flag == 0) {
                    this.$store.dispatch('selectMenu', this.menu);
                    this.selectCharge += this.menu.price;
                }
            }
        },
        addedProduct(selectData) {

            this.menu = JSON.parse(JSON.stringify(selectData)); // deep cloning an object
            let selectListLength = this.$store.getters.selectListLength;

            this.selectedProduct(selectListLength);
            this.calculateCharges(this.selectCharge);
        },

    },
}
</script>

<style>

</style>
