<template>
    <div class="container">
        <div class="grid grid-cols-3">
            <div class="bg-blue-50 col-span-1">
                <h1 class="text-white font-semibold bg-slate-700">Ordered Menu</h1>
                <h5 class="text-slate-700 bg-slate-200 font-base text-sm py-1"><span class="font-semibold">Order Id</span>#{{ this.orderId }}</h5>
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
                                <tr class="pointer" v-for="(item) in getOrderDetails.menu" :key="item.id">

                                    <td>{{ item.id }}</td>
                                    <td>{{ item.name }}</td>
                                    <td class="flex justify-center px-3">{{ item.quantity }}</td>
                                    <td>{{ item.price }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div v-if=" isTableSelect == true" class="absolute bottom-20 flex justify-center">
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
                        
                          <button @click="orderAgain()" class="bg-gray-700 hover:bg-cyan-200 hover:text-cyan-800  text-white rounded-md py-1 px-2 mr-2">Order again</button>
                          <button @click="updateOrder()" class="bg-cyan-700 hover:bg-cyan-200 hover:text-cyan-800  text-white rounded-md py-1 px-2 mr-2">Update</button>
                        <button class="bg-green-900 hover:bg-green-600 text-white rounded-md py-1 px-2 ">Checkout</button>
                    </div>
                </div>
            </div>
            <div  class="col-span-2">
                <h1 class="text-white font-semibold bg-slate-400">Select a Table</h1>
                <div class="grid grid-cols-3 lg:gap-5 py-3">
                    <div v-for="table in tableList" :key="table.id">

                        <div v-if="table.select == false"  class="pointer rounded text-sm  border-slate-600  border-2 shadow-sm  hover:bg-slate-800 hover:text-white
                         hover:font-semibold">
                            <div>
                                {{ table.name }} #{{ table.id }}
                            </div>
                        </div>
                        
                        <div  v-else @click="selectTable(table.id)" class="pointer rounded text-sm  text-slate-400 border-2 shadow-sm border-slate-300 ">
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
   
    data() {
        return {
            orderId: 0,
            disabled: true,
           // executed: false,
            isTableSelect : false,
        };
    },
    computed: {
        orderDetails() {
            return this.$store.getters.getOrderList;
        },
        getOrderDetails() {
            let abc = this.$store.getters.getOrderList.find(element => element.id = this.orderId);
            console.log("amar consoel", abc);
            return abc;
        },
        tableList() {
            return this.$store.getters.getTableList;
        }

    },
    methods: {
        orderAgain() {
            this.$router.push("/selectMenu/");
        },
        selectTable(tableId) {
            
            for( let i = 0; i<this.tableList.length; i++) {
                
                if(this.tableList[i].id == tableId)
                {
                    if(this.tableList[i].orderId != null)
                    {
                        this.orderId = this.tableList[i].orderId;
                        console.log("order er deitals on showtable",this.getOrderDetails);
                            this.isTableSelect = true;
                            
                        }
                       
                    }
                }
              //  this.executed = true;

              //  console.log(this.getOrderDetails);
          // }

        }
    },
}
</script>
<style>

</style>
