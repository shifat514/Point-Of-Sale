<template>
  <div>
    <div class="grid grid-cols-3 p-10 pt-20">
      <div class="bg-blue-50 2xl:col-span-1 xl:col-span-1 lg:col-span-1 md:col-span-2 col-span-3">
        <div class="text-white border-2 border-slate-700 font-semibold bg-slate-700">Ordered Menu</div>
        <h5 class="text-slate-700 bg-slate-200 font-base text-sm py-1">
          <span class="font-semibold">Order Id</span>#{{ this.orderId }}
        </h5>
        <div class="grid grid-rows-4 justify-center">
          <div class="row-span-3 py-2">
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
                <tr class="pointer" v-for="item in orderData.menu" :key="item.id">
                  <td>{{ item.id }}</td>
                  <td>{{ item.name }}</td>
                  <td class="flex justify-center px-3">{{ item.quantity }}</td>
                  <td>{{ item.price }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="bg-slate-200 py-2 row-span-1 text-sm">
                      <div>
                          <div class="grid grid-cols-3 h">
                              <div class="flex justify-start col-span-2">
                                  <div class="p-1">
                                      <div class="flex justify-start">
                                          VAT (5%)
                                      </div>
                                      <div class="flex justify-start">
                                          Service Charge (10%)
                                      </div>
                                      <div class="flex justify-start">
                                          Total Price
                                      </div>
                                  </div>
  
                              </div>
                              <div class="flex justify-end col-span-1">
                                  <div>
                                  
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
                         
                          
                      </div>
  
            </div>
        </div>
      </div>
      <div class="2xl:col-span-2 xl:col-span-2 lg:col-span-2 md:col-span-1 col-span-3">
        <h1 class="text-slate-700 border-2 border-slate-700 font-semibold bg-white">Pay the Bill</h1>
        <div v-if="billPaid == false">
          <div class="flex justify-center items-center mt-20">
              <input v-model="billAmount" type="text" name="price" id="price"
              class="appearance-none border-2 h-10 w-1/3 border-slate-200 focus:border-none  
              focus:outline-none focus:ring-2 focus:ring-slate-400 focus:bg-white rounded-md pl-4"
              placeholder="input amount">
      
              <button  v-if="disabled == false" @click="payBill()"
                class=" h-9 border-2 border-green-300 text-green-300 hover:text-white hover:bg-green-700  rounded-md  px-3 ml-1 font-semibold ">
                Pay</button>
          </div>
        </div>
        <div v-else class="pt-10">
          <div class="flex justify-center items-center flex-col">
            <Icon class="green-block" height="10%" icon="ic:twotone-paid" />
            <div class="text-green-700 text-2xl font-extrabold font-sans">BILL PAID</div>
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
  props: ["orderId"],
  data() {
    return {
      disabled: true,
      executed: false,
      orderData: {
        orderId: 0,
        menu: null,
        vat: 0,
        tableNo: 0,
        basicCharge: 0,
        serviceCharge: 0,
        totalPrice: 0,
      },
      billAmount: null,
      billPaid: false,
    };
  },
  created() {
    for (let i = 0; i < this.$store.getters.getOrderList.length; i++) {
      if (this.$store.getters.getOrderList[i].orderId == this.orderId) {
        this.orderData.orderId = this.orderId;
        this.orderData.menu = this.$store.getters.getOrderList[i].menu;
        this.orderData.vat = this.$store.getters.getOrderList[i].vat;
        this.orderData.basicCharge = this.$store.getters.getOrderList[i].basicCharge;
        this.orderData.serviceCharge = this.$store.getters.getOrderList[i].serviceCharge;
        this.orderData.totalPrice = this.$store.getters.getOrderList[i].totalPrice;
      }
    }
  },
  computed: {
    orderList() {
      return this.$store.getters.getOrderList;
    },
    tableList() {
      return this.$store.getters.getTableList;
    },
  },
  watch: {
    billAmount() {
      for (let i = 0; i < this.orderList.length; i++) {
        console.log(this.orderList[i].totalPrice);
        console.log(this.billAmount)
        if (this.orderList[i].totalPrice == this.billAmount) {
         this.disabled = false;
         break;
        }
        else {
          this.disabled = true;
        }
      }
    },
  },
  methods: {
    payBill() {
      for (let i = 0; i < this.orderList.length; i++) {
        if (this.orderList[i].totalPrice == this.billAmount) {
          this.tableList.find(element => element.orderId == this.orderId).select = false;
          this.orderList[i].paidBill = true;
          this.billPaid = true;
        }

      }
    },
    getOrderDetails(clickedOrderId, tableId) {
      for (let i = 0; i < this.orderList.length; i++) {
        console.log(clickedOrderId);
        if (this.orderList[i].orderId == clickedOrderId) {
          this.orderList[i].tableNo = tableId;
          this.orderData.menu = this.orderList[i].menu;
          this.orderData.vat = this.orderList[i].vat;
          this.orderData.serviceCharge = this.orderList[i].serviceCharge;
          this.orderData.totalPrice = this.orderList[i].totalPrice;
        }
      }
    },
    checkOut() {
      this.$router.push("/showtables/");
    },
    selectTable(tableId) {
      if (this.executed == false) {
        for (let i = 0; i < this.tableList.length; i++) {
          if (this.tableList[i].id == tableId) {
            this.tableList[i].select = true;
            this.tableList[i].orderId = this.id;
            console.log(this.id);
            this.getOrderDetails(this.id, tableId);
          }
        }
        this.executed = true;
        console.log("full order er list", this.orderList);
      }
    },
  },
};
</script>
<style>

</style>
  