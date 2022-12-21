<template>
    <div class="container">
        <div v-if="isAlert == false" class="grid grid-cols-3 p-4 pt-16">
            <div class="bg-blue-50 col-span-1">
                <div class="text-white border-2 border-slate-700 font-semibold bg-slate-700">Ordered Menu</div>
                <h5 class="text-slate-700 bg-slate-200 font-base text-sm py-1"><span class="font-semibold">Order
                        Id</span>#{{ this.orderId }}</h5>
                <div class="flex justify-center ">
                    <div class="grid grid-rows-1 static py-2">
                        <table class="w-full table-auto">
                            <thead>
                                <tr>
                                    <th class="w-1/6 px-7">Id</th>
                                    <th class="w-1/6 px-7">Name</th>
                                    <th class="w-1/6 px-7">Quantity</th>
                                    <th class="w-1/6 px-7">Price</th>
                                </tr>
                            </thead>
                            <tbody v-if="isTableSelect == true" class="text-sm">
                                <tr class="pointer" v-for="(item) in orderData.menu" :key="item.id">

                                    <td>{{ item.id }}</td>
                                    <td>{{ item.name }}</td>
                                    <td class="flex justify-center px-3">
                                        <button v-if="isUpdateOrder == true" @click="decreaseQuantity(item)" class="h-5 w-5 border-2 flex items-center justify-center
                                         border-red-400 text-red-400  
                                         cursor-pointer rounded-full font-bold">
                                            <div>-</div>
                                        </button>

                                        <span class="px-2">
                                            {{ item.quantity }}
                                        </span>

                                        <button v-if="isUpdateOrder == true" @click="increaseQuantity(item)" class="h-5 w-5 border-2 flex items-center justify-center
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
                <div v-if="isTableSelect == true" class="absolute bottom-20 flex justify-center">
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
                                    Total Price
                                </div>
                            </div>
                            <div>
                                <div>
                                    <div>
                                        {{ orderData.basicCharge }} BDT
                                    </div>
                                    <div>
                                        {{ orderData.vat }} BDT
                                    </div>
                                    <div>
                                        {{ orderData.serviceCharge }} BDT
                                    </div>

                                    <div>
                                        {{ orderData.totalPrice }} BDT
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button @click="orderAgain()"
                            class="bg-gray-700 hover:bg-cyan-200 hover:text-cyan-800  text-white rounded-md py-1 px-2 mr-2">Order
                            again</button>
                        <button @click="updateOrder()"
                            class="bg-cyan-700 hover:bg-cyan-200 hover:text-cyan-800  text-white rounded-md py-1 px-2 mr-2">Update Order</button>
                        <button @click="goToPayBill()"
                            class="bg-green-900 hover:bg-green-600 text-white rounded-md py-1 px-2 ">Pay Bill</button>
                    </div>
                </div>
            </div>
            <div class="col-span-2">
                <h1 class="text-slate-700 border-2 border-slate-700 font-semibold bg-white">Show Table Orders</h1>
                <div class="grid grid-cols-3 lg:gap-5 py-3">
                    <div v-for="table in tableList" :key="table.id">

                        <div v-if="table.select == false" class="pointer 
                        text-sm border-2    
                        font-bold border-slate-700 
                        rounded
                        text-white
                        bg-slate-700
                        
                        hover:bg-white hover:text-slate-800 
                         hover:font-semibold">
                         <div class="grid grid-rows-2 items-center justify-center">
                            <div> {{ table.name }} #{{ table.id }}</div>
                        <div class="flex items-center justify-center hover:font-semibold">
                            <Icon width="25"  icon="material-symbols:table-restaurant" style="color: white;"/>
                        </div>
                        </div>
                        </div>

                        <div v-else @click="showTables(table.id)"
                            class="pointer rounded text-sm  text-slate-400 border-2 shadow-sm border-slate-300 ">
                            <div class="grid grid-rows-2 items-center justify-center">
                            <div> {{ table.name }} #{{ table.id }}</div>
                            <div class="flex items-center justify-center hover:font-semibold">
                                <Icon width="25"  icon="material-symbols:table-restaurant" style="color:slategray;"/>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <div v-else class="bg-gray-400 flex justify-center">
            <div class="grid h-screen place-items-center bg-black bg-opacity-50">
                <div class="bg-white rounded shadow-lg w-1/3 fixed  justify-center items-center">
                    <div class="px-4 py-2">
                        <p>Are you sure you want to remove this item?</p>
                    </div>
                    <div class="flex justify-end items-center w-100 border-t p-3">
                        <button @click="isAlert = false;"
                            class="bg-gray-500 hover:bg-slate-700 text-white px-3 py-1 rounded mr-1">Cancel</button>
                        <button @click="removeProduct();"
                            class="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded mr-1">Yes</button>
                    </div>

                </div>
            </div>
        </div>

    </div>
</template>

<script>
import { Icon } from '@iconify/vue';
export default {
    components: {
    Icon,
    },
    data() {
        return {
            orderId: 0,
            disabled: true,
            isAlert: false,
            // executed: false,
            isTableSelect: false,
            orderData: {
                orderId: 0,
                menu: null,
                vat: 0,
                tableNo: 0,
                basicCharge: 0,
                serviceCharge: 0,
                totalPrice: 0,
            },
            removeItem: false,
            itemToRemove: null,
            isUpdateOrder: false,
        };
    },
    computed: {
        orderList() {
            return this.$store.getters.getOrderList;
        },
        tableList() {
            return this.$store.getters.getTableList;
        },
        productList() {
            return this.$store.getters.getProductList;
        },
    },


    methods: {
        goToPayBill() {
            this.$router.push('/paybill/'+this.orderId);
        },
        updateOrder() {
            this.isUpdateOrder = true;
        },
        removeProduct() {
           // this.removeItem = true;
           // this.decreaseQuantity(this.itemToRemove);
        },
        getOrderDetails() {
            for (let i = 0; i < this.orderList.length; i++) {
                console.log(this.orderId);
                if (this.orderList[i].orderId == this.orderId) {
                    this.orderData.menu = this.orderList[i].menu;
                    this.orderData.vat = this.orderList[i].vat;
                    this.orderData.basicCharge = this.orderList[i].basicCharge;
                    this.orderData.serviceCharge = this.orderList[i].serviceCharge;
                    this.orderData.totalPrice = this.orderList[i].totalPrice;
                }
            }
        },
        decreaseQuantity(item) {

            for (let i = 0; i < this.orderList.length; i++) {
                for (let j = 0; j < this.orderList[i].menu.length; j++) {

                    if (this.orderList[i].menu[j].id == item.id) {
                        let productFromProductList = this.productList.find(element => element.id == item.id);
                        console.log(productFromProductList);

                        if (this.removeItem == true) {
                            this.orderList[i].menu[j].quantity -= 1;
                            this.orderList[i].menu[j].price -= productFromProductList.price;
                            this.orderList[i].basicCharge -= productFromProductList.price;
                            this.orderList[i].vat = .05 * this.orderList[i].basicCharge;
                            this.orderList[i].serviceCharge = .10 * this.orderList[i].basicCharge;
                            this.orderList[i].totalPrice = this.orderList[i].basicCharge + this.orderList[i].vat + this.orderList[i].serviceCharge;
                            this.orderList[i].menu.splice(this.orderList[i].menu[j], 1);
                            this.removeItem = false;
                            this.isAlert = false;
                            this.getOrderDetails();
                        }
                        else {
                            if (this.orderList[i].menu[j].quantity == 1) {
                                this.itemToRemove = item;
                               // this.isAlert = true;
                            }
                            else {
                                this.orderList[i].menu[j].quantity -= 1;
                                this.orderList[i].menu[j].price -= productFromProductList.price;
                                this.orderList[i].basicCharge -= productFromProductList.price;
                                if(this.orderList[i].menu[j].vat == true) {
                                    this.orderList[i].vat = .05 * this.orderList[i].basicCharge;
                                    this.orderList[i].serviceCharge = .10 * this.orderList[i].basicCharge;
                                }
                                this.orderList[i].totalPrice = this.orderList[i].basicCharge + this.orderList[i].vat + this.orderList[i].serviceCharge;
                                this.getOrderDetails();
                            }
                        }
                    }
                }
            }
        },

        increaseQuantity(item) {
            for (let i = 0; i < this.orderList.length; i++) {

                for (let j = 0; j < this.orderList[i].menu.length; j++) {

                    if (this.orderList[i].menu[j].id == item.id) {
                        let productFromProductList = this.productList.find(element => element.id == item.id);
                        console.log(productFromProductList);
                        this.orderList[i].menu[j].quantity += 1;
                        this.orderList[i].menu[j].price += productFromProductList.price;
                        this.orderList[i].basicCharge += productFromProductList.price;
                        if(this.orderList[i].menu[j].vat == true) {
                            this.orderList[i].vat = .05 * this.orderList[i].basicCharge;
                            this.orderList[i].serviceCharge = .10 * this.orderList[i].basicCharge;
                        }
                        this.orderList[i].totalPrice = this.orderList[i].basicCharge + this.orderList[i].vat + this.orderList[i].serviceCharge;
                        this.getOrderDetails();
                    }
                }
            }
        },
        
        orderAgain() {
            this.$router.push("/selectMenu/");
        },
        showTables(tableId) {
            console.log("table Id: ", tableId);
            for (let i = 0; i < this.tableList.length; i++) {

                if (this.tableList[i].id == tableId) {
                    this.orderId = this.tableList[i].orderId;
                    this.getOrderDetails();
                    this.isTableSelect = true;
                }
            }

        }
    },
}
</script>
<style>

</style>
