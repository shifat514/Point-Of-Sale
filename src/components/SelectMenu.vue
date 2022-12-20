<template>
    <div>
        <div v-if="isAlert"
            class="fixed z-50 w-full h-full  bg-slate-400 bg-opacity-50 flex justify-center items-center">
            <div class="absolute  bg-white rounded shadow-lg w-1/3 justify-center items-center">
                <div class="px-4 py-2">
                    <p>Are you sure you want to remove this item?</p>
                </div>
                <div class="flex justify-end items-center w-100 border-t p-3">
                    <button @click="isAlert = false"
                        class="bg-gray-500 hover:bg-slate-700 text-white px-3 py-1 rounded mr-1">Cancel</button>
                    <button @click="removeProduct()"
                        class="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded mr-1">Yes</button>
                </div>
            </div>
        </div>
        <div class="grid grid-cols-3 w-screen h-screen p-4 pt-16">
            <div class="bg-slate-100 col-span-1 h-full relative">
                <div class="text-white border-2 border-slate-700 font-semibold bg-slate-700 ">Selected Menu</div>
                <h5 v-if="this.id != 0" class="text-slate-700 font-base text-sm py-1"><span class="font-semibold">Order
                        Id</span>#{{ this.orderId }}</h5>
                <div class=" bg-slate-100 flex justify-center ">
                    <div class="py-2">
                        <table class="w-full table-auto">
                            <thead>
                                <tr>
                                    <th class="w-1/6 px-7">Id</th>
                                    <th class="w-1/6 px-7">Name</th>
                                    <th class="w-1/6 px-7">Quantity</th>
                                    <th class="w-1/6 px-7">Price</th>
                                </tr>
                            </thead>
                            <tbody class="text-sm">
                                <tr class="pointer" v-for="(item, index) in selectProductList" :key="index" :id=item.id>
                                    <td>{{ item.id }}</td>
                                    <td>{{ item.name }}</td>
                                    <td class="flex justify-center px-3 py-1">
                                        <button @click="decreaseQuantity(item, index)" class="h-5 w-5 border-2 flex items-center justify-center
                                      border-red-400 text-red-400  
                                      cursor-pointer rounded-full font-bold">
                                            <div>-</div>
                                        </button>
                                        <span class="px-2">
                                            {{ item.quantity }}
                                        </span>
                                        <button @click="increaseQuantity(item, index)" class="h-5 w-5 border-2 flex items-center justify-center
                                      border-emerald-300 text-green-700  
                                      cursor-pointer rounded-full font-bold">
                                            <div>+</div>
                                        </button>
                                    </td>
                                    <td>{{ item.price }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="absolute bottom-20 flex justify-center">
                    <div class="">
                        <div class="grid grid-cols-2">
                            <div>
                                <div>
                                    Sub Total Price
                                </div>
                                <div>
                                    VAT (5%)
                                </div>
                                <div>
                                    Service Charge (10%)
                                </div>
                                <div>
                                    Total Extra Charge
                                </div>
                                <div>
                                    Total Price
                                </div>
                            </div>
                            <div>
                                <div>
                                    <div>
                                        {{ selectCharge }} BDT
                                    </div>
                                    <div>
                                        {{ vat }} BDT
                                    </div>
                                    <div>
                                        {{ serviceCharge }} BDT
                                    </div>
                                    <div>
                                        {{ extraCharge }} BDT
                                    </div>
                                    <div>
                                        {{ totalCharge }} BDT
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button 
                          v-if="disabled == false" @click="confirmOrder()"
                          class="bg-green-900 hover:bg-green-600 text-white rounded-lg py-1 px-2 "
                        >
                          Confirm Order
                        </button>
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
            orderId: 0,
            isAlert: false,
            removeItem: false,
            selectCharge: 0,
            vat: 0,
            serviceCharge: 0,
            extraCharge: 0,
            totalCharge: 0,
            selectedIndex: 0,
            disabled: true,
            chargeFromOrder: 0,
            selectedItem: {
                id: 0,
                name: '',
                quantity: 0,
                price: 0,
            },
        };
    },

    components: {
        FoodMenu
    },
    computed: {
        selectProductList() {
            return this.$store.getters.getSelectList;
        },
        orderList() {
            return this.$store.getters.getOrderList;
        }

    },

    methods: {

        confirmOrder() {

            this.orderId = Math.floor(Math.random() * Math.floor(Math.random() * Date.now()));
            console.log(this.selectCharge);
            let orderData = {
                orderId: this.orderId,
                menu: this.selectProductList,
                vat: this.vat,
                tableNo: null,
                basicCharge: this.selectCharge,
                serviceCharge: this.serviceCharge,
                totalPrice: this.totalCharge,
                paidBill: false,
            };

            console.log("amr orderData", orderData);
            this.$store.dispatch("addOrder", orderData);
            this.$store.commit("resetSelectState");
            console.log(this.orderList);
            this.$router.push('/selecttable/' + this.orderId);

        },

        removeProduct() {
            this.removeItem = true;
            if (this.removeItem == true) {

                this.$store.getters.getSelectList[this.selectedIndex].price -= this.$store.getters.getProductList.find(element => element.id == this.selectedItem.id).price;
                this.$store.getters.getSelectList[this.selectedIndex].quantity -= 1;
                this.selectCharge -= this.$store.getters.getProductList.find(element => element.id == this.selectedItem.id).price;
                this.calculateCharges(this.selectCharge);
                this.$store.dispatch('removeProduct', this.selectedIndex);
                this.isAlert = false;
                if (this.$store.getters.selectListLength == 0) {
                    this.disabled = true;
                }
            }
            else {
                this.isAlert = false;
            }
        },
        decreaseQuantity(item, index) {

            if (item.quantity == 1) {
                this.isAlert = true;
                this.selectedIndex = index;
                this.selectedItem = item;
            }
            else {
                this.$store.getters.getSelectList.find(element => element.id == item.id).price -= this.$store.getters.getProductList.find(element => element.id == item.id).price;
                this.$store.getters.getSelectList[index].quantity -= 1;
                this.selectCharge -= this.$store.getters.getProductList.find(element => element.id == item.id).price;
                this.calculateCharges(this.selectCharge);
            }
        },

        increaseQuantity(item, index) {
            this.$store.getters.getSelectList.find(element => element.id == item.id).price += this.$store.getters.getProductList.find(element => element.id == item.id).price;
            this.$store.getters.getSelectList[index].quantity += 1;
            this.selectCharge += this.$store.getters.getProductList.find(element => element.id == item.id).price;
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
                this.disabled = false;

            } else {
                let flag = 0;
                for (let i = 0; i < listLength; i++) {
                    if (this.menu.id === this.$store.getters.getSelectList[i].id) {
                        flag = 1;
                        this.$store.getters.getSelectList[i].price += this.menu.price;
                        this.$store.getters.getSelectList[i].quantity += 1;
                        this.selectCharge += this.menu.price;
                        this.disabled = false;
                    }
                }
                if (flag == 0) {
                    this.menu.quantity += 1;
                    this.selectCharge += this.menu.price;
                    this.$store.dispatch('selectMenu', this.menu);
                    this.disabled = false;
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
