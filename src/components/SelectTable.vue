<template>
    <div class="container">
        <div class="grid grid-cols-3">
            <div class="bg-blue-50 col-span-1">
                <h1 class="text-white font-semibold bg-slate-700">Ordered Menu</h1>
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
                            <tbody class="text-sm">
                                <tr class="pointer" v-for="(item) in getOrderDetails.menu" :key="item.id">

                                    <td>#{{ item.id }}</td>
                                    <td>{{ item.name }}</td>
                                    <td class="flex justify-center px-3">{{ item.quantity }}</td>
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
                                        {{ getOrderDetails.vat }} BDT
                                    </div>
                                    <div>
                                        {{ getOrderDetails.serviceCharge }} BDT
                                    </div>
                                    <div>
                                        {{ getOrderDetails.totalPrice }} BDT
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button class="bg-green-900 hover:bg-green-600 text-white rounded-md py-1 px-2 ">Checkout</button>
                    </div>
                </div>
            </div>
            <div class="col-span-2">
                <h1 class="text-white font-semibold bg-slate-400">Select a Table</h1>
                <div class="grid grid-cols-3 lg:gap-5 py-3">
                    <div v-for="table in TableList" :key="table.id">

                        <div v-if="table.select == false" @click="selectTable(table.id)" class="pointer text-sm border-2 shadow-sm border-slate-600 rounded  hover:bg-slate-800 hover:text-white
                         hover:font-semibold">
                            <div>
                                {{ table.name }} #{{ table.id }}
                            </div>
                        </div>

                        <div  v-else class="pointer text-slate-400 border-2 shadow-sm border-slate-300 rounded">
                            <div>
                                {{ table.name }} #{{ table.id }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    props: ['id'],
    data() {
        return {
            disabled: true,
            executed: false,
        };
    },
    computed: {
        orderDetails() {
            return this.$store.getters.getOrderList;
        },
        getOrderDetails() {
            return this.$store.getters.getOrderList.find(element => element.id = this.id);
        },
        TableList() {
            return this.$store.getters.getTableList;
        }

    },

    methods: {
        selectTable(tableId) {
               
            if(this.executed == false) {       
                this.getOrderDetails.tableNo = tableId;
                for( let i = 0; i<this.$store.getters.getTableList.length; i++) {
                    if(this.$store.getters.getTableList[i].id == tableId)
                    {
                        this.$store.getters.getTableList[i].select = true;
                    }
                }
                this.executed = true;
                console.log(this.getOrderDetails);
            }

        }
    },
}
</script>
<style>

</style>
