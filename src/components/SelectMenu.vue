<template>
    <div class="container">
        <div class="grid grid-cols-3">
            <div class="bg-slate-100 col-span-1">
                <h1 class="text-white font-semibold bg-slate-700">Selected Menu</h1>
                <div class=" bg-slate-100 flex justify-center ">
                    <div class="grid grid-rows-1 static py-2">
                        <div>
                            <table class="table-fixed">
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Name</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                    </tr>
                                </thead>
                                <tbody class="text-sm">
                                    <tr class="pointer" v-for="(item, index) in selectProductList" :key="index"
                                        :id=item.id>
                                        <td>#{{ item.id }}</td>
                                        <td>{{ item.name }}</td>
                                        <td>
                                            <button @click="decreaseQuantity(item, index)"
                                                class=" text-red-700  cursor-pointer" >
                                                <span class="font-bold text-3xl">-</span>
                                            </button>
                                                {{ item.quantity }}
                                            <button @click="increaseQuantity(item, index)"
                                                class=" text-green-700  cursor-pointer">
                                                <span class="font-bold text-xl">+</span>
                                            </button>
                                        </td>
                                        <td>{{ item.price }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="flex justify-center text-sm">
                    <div class="absolute bottom-20">
                        <div>Charge : {{ selectCharge }} BDT</div>
                        <div>Vat : {{ vat }} BDT</div>
                        <div>SC : {{ serviceCharge }} BDT</div>
                        <div>Total Extra Charge : {{ extraCharge }} BDT</div>
                        <div>Total : {{ totalCharge }} BDT</div>
                    </div>
                </div>
            </div>
            <div class="col-span-2">
                <FoodMenu @selectProduct="addedProduct" />
            </div>
        </div>
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
                quantity: 0,
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
        },

    },

    methods: {

        decreaseQuantity(item, index) {

            if (item.quantity == 1) {

                this.$store.getters.getSelectList[index].price -= this.$store.getters.getProductList[item.id - 1].price;
                this.$store.getters.getSelectList[index].quantity -= 1;
                this.selectCharge -= this.$store.getters.getProductList[item.id - 1].price;
                this.calculateCharges(this.selectCharge);
                this.$store.dispatch('removeProduct', index);
            }
            else {
                this.$store.getters.getSelectList[index].price -= this.$store.getters.getProductList[item.id - 1].price;
                this.$store.getters.getSelectList[index].quantity -= 1;
                this.selectCharge -= this.$store.getters.getProductList[item.id - 1].price;
                this.calculateCharges(this.selectCharge);
            }

        },

        increaseQuantity(item, index) {
            this.$store.getters.getSelectList[index].price += this.$store.getters.getProductList[item.id - 1].price;
            this.$store.getters.getSelectList[index].quantity += 1;
            this.selectCharge += this.$store.getters.getProductList[item.id - 1].price;
            this.calculateCharges(this.selectCharge);
        },

        calculateCharges(basicCharge) {

            this.vat = .05 * basicCharge;
            this.serviceCharge = .10 * basicCharge;
            this.extraCharge = this.vat + this.serviceCharge;
            this.totalCharge = basicCharge + this.extraCharge;
        },

        selectedProduct(listLength) {
            if (listLength < 1) {
                this.selectCharge += this.menu.price;
                this.menu.quantity += 1;
                this.$store.dispatch('selectMenu', this.menu);

            } else {
                let flag = 0;
                for (let i = 0; i < listLength; i++) {
                    if (this.menu.id === this.$store.getters.getSelectList[i].id) {
                        flag = 1;
                        this.$store.getters.getSelectList[i].price += this.menu.price;
                        this.$store.getters.getSelectList[i].quantity += 1;
                        this.selectCharge += this.menu.price;

                    }
                }
                if (flag == 0) {
                    this.menu.quantity += 1;
                    this.selectCharge += this.menu.price;
                    this.$store.dispatch('selectMenu', this.menu);

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
