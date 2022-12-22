<template>
    <div>
        <div v-if="isAlert"
            class="fixed  w-full h-full  bg-slate-400 bg-opacity-50 flex justify-center items-center">
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
        <div class="grid grid-cols-3 h-screen p-10 pt-16 w-screen">
            <div class="bg-slate-100 2xl:col-span-1 xl:col-span-1 lg:col-span-1 md:col-span-2 col-span-3"> 
                <div class="text-white border-2 border-slate-700 font-semibold bg-slate-700 ">Selected Menu</div>
                <h5 v-if="this.id != 0" class="text-slate-700 font-base text-sm py-1"><span class="font-semibold">Order
                        Id</span>#{{ this.orderId }}</h5>
               
               <div class="grid grid-rows-4">

                <div class="row-span-3 bg-slate-100 flex justify-center ">
                    <div>
                        <table class="table-auto">
                            <thead class="bg-slate-300 w-screen">
                                <tr>
                                    <th class="w-1/6 px-5">Id</th>
                                    <th class="w-1/6 px-5">Name</th>
                                    <th class="w-1/6 px-5">Quantity</th>
                                    <th class="w-1/6 px-5">Price</th>
                                </tr>
                            </thead>
                            <tbody class="text-sm">
                                <tr class="pointer" v-for="(item, index) in selectProductList" :key="index" :id=item.id>
                                    <td>{{ item.id }}</td>
                                    <td>{{ item.name }}</td>
                                    <td class="flex justify-center px-2 py-1">
                                        <button @click="decreaseQuantity(item)" class="h-5 w-5 border-2 flex items-center justify-center
                                      border-red-400 text-red-400  
                                      cursor-pointer rounded-full font-bold">
                                            <div>-</div>
                                        </button>
                                        <span class="px-2">
                                            {{ item.quantity }}
                                        </span>
                                        <button @click="increaseQuantity(item)" class="h-5 w-5 border-2 flex items-center justify-center
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

                <div class="bg-slate-200 py-2 row-span-1 text-sm">
                 
                    <div>
                        <div class="grid grid-cols-3 h">
                            <div class="flex justify-start col-span-2">
                            <div class="p-1">
                                <div class="flex justify-start">
                                    Sub Total Price
                                </div>
                                <div class="flex justify-start">
                                    VAT (5%)
                                </div>
                                <div class="flex justify-start">
                                    Service Charge (10%)
                                </div>
                                <div class="flex justify-start">
                                    Total Extra Charge
                                </div>
                                <div class="flex justify-start">
                                    Total Price
                                </div>
                            </div>
                                
                            </div>
                            <div class="flex justify-end col-span-1">
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
                        <div v-if="disabled == false" @click="confirmOrder()"
                            class="bg-green-900 hover:bg-green-600 rounded-sm text-white py-1 w-full ">
                            Confirm Order
                        </div>
                    </div>
                        
                </div>

               </div>
                
           
            
            </div>
            <div class="2xl:col-span-2 xl:col-span-2 lg:col-span-2 md:col-span-1 col-span-3">
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
                vat: Boolean,
            },
            orderId: 0,
            isAlert: false,
            removeItem: false,
            selectCharge: 0,
            vat: 0,
            serviceCharge: 0,
            extraCharge: 0,
            totalCharge: 0,
          
            disabled: true,
            chargeFromOrder: 0,
            selectedItem: {
                id: 0,
                name: '',
                quantity: 0,
                price: 0,
                vat: Boolean,
            },
            productQuantity: 0,
            increasedProductPrice: 0,
            chargesWithVat: 0,
            chargesWithOutVat: 0,
        };
    },

    components: {
        FoodMenu
    },
    computed: {
        selectProductList() {
            return this.$store.getters.getSelectList;
        },
        getProductList() {
            return this.$store.getters.getProductList;
        },
        orderList() {
            return this.$store.getters.getOrderList;
        }
    },

    methods: {

        confirmOrder() {

            this.orderId = Math.floor(Math.random() * Math.floor(Math.random() * Date.now()));
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
            this.$store.dispatch("addOrder", orderData);
            this.$store.commit("resetSelectState");
            this.$router.push('/selecttable/' + this.orderId);

        },

        removeProduct() {
            this.removeItem = true;
            if (this.removeItem == true) {

                this.selectProductList.find(element => element.id == this.selectedItem.id).quantity -=1;
                this.$store.dispatch('removeProduct', this.selectedItem);
                this.calculateCharges();
                this.isAlert = false;
                if (this.$store.getters.selectListLength == 0) {
                    this.disabled = true;
                }
            }
            else {
                this.isAlert = false;
            }
        },
        decreaseQuantity(item) {

            if (item.quantity == 1) {
                this.isAlert = true;
                this.selectedItem = item;
            }
            else {
             
                this.selectProductList.find(element => element.id == item.id).quantity -= 1;
                this.calculateCharges();
            }
        },

        increaseQuantity(item) {
            this.selectProductList.find(element => element.id == item.id).quantity += 1;
            this.calculateCharges();
        },

        calculateCharges() { 
            this.selectCharge = 0;
            this.vat =0;
            this.serviceCharge = 0;
            this.extraCharge = 0;
            this.totalCharge =0;
            this.chargesWithVat = 0;
            this.chargesWithOutVat = 0;
            for (let i = 0; i < this.selectProductList.length; i++) {

                let selectedProductQuantity = this.selectProductList[i].quantity;
                let productOriginalPrice = this.getProductList.find(element => element.id == this.selectProductList[i].id).price;
                this.selectProductList[i].price = selectedProductQuantity * productOriginalPrice;
               
                if(this.selectProductList[i].vat == true) {
                    this.chargesWithVat +=this.selectProductList[i].price;
                    this.vat = .05 * this.chargesWithVat;
                    this.serviceCharge = .10 * this.chargesWithVat;
                    this.extraCharge += this.vat + this.serviceCharge;
                    this.totalCharge +=this.chargesWithVat + this.extraCharge;          
                }
                else {
                    this.chargesWithOutVat +=this.selectProductList[i].price;
                    this.totalCharge += this.chargesWithOutVat + this.extraCharge;
                }
            }
            this.selectCharge = this.chargesWithVat + this.chargesWithOutVat;
            this.totalCharge = this.selectCharge + this.extraCharge;
        },

        selectedProduct(listLength) {
            if (listLength < 1) {

                this.menu.quantity += 1;
                this.$store.dispatch('selectMenu', this.menu);
                this.disabled = false;

            } else {
                let flag = 0;
                for (let i = 0; i < listLength; i++) {
                    if (this.menu.id === this.selectProductList[i].id) {
                        
                        flag = 1;
                        this.selectProductList[i].quantity += 1;
                        this.disabled = false;
                    }
                }
                if (flag == 0) {
                    this.menu.quantity += 1;
                    this.$store.dispatch('selectMenu', this.menu);
                    this.disabled = false;
                }
            }
        },

        addedProduct(selectData) {

            this.menu = JSON.parse(JSON.stringify(selectData)); // deep cloning an object
            let selectListLength = this.$store.getters.selectListLength;
            this.selectedProduct(selectListLength);
            this.calculateCharges();
        },

    },
}
</script>

<style>

</style>
