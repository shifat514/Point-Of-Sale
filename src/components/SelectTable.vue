<template>
  <div>
    <div class="grid grid-cols-3 p-4 pt-16">
      <div class="bg-blue-50 2xl:col-span-1 xl:col-span-1 lg:col-span-1 md:col-span-2 col-span-3">
        <div class="text-white border-2 border-slate-700 font-semibold bg-slate-700">Ordered Menu</div>
        <h5 class="text-slate-700 bg-slate-200 font-base text-sm py-1">
          <span class="font-semibold">Order Id</span>#{{ this.id }}
        </h5>
        <div class="grid grid-rows-4 bg-slate-100 justify-center">
          <div class="row-span-3">
            <table class="table-auto">
              <thead>
                <tr>
                  <th class="w-1/6 px-5">Id</th>
                  <th class="w-1/6 px-5">Name</th>
                  <th class="w-1/6 px-5">Quantity</th>
                  <th class="w-1/6 px-5">Price</th>
                </tr>
              </thead>
              <tbody class="text-sm">
                <tr class="pointer" v-for="(item, index) in orderData.menu" :key="index" :id=item.id>
                  <td>{{ item.id }}</td>
                  <td>{{ item.name }}</td>
                  <td class="flex justify-center px-2 py-1">

                    <span class="px-2">
                      {{ item.quantity }}
                    </span>

                  </td>
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
            <div @click="checkOut()" class="
                bg-green-900
                hover:bg-green-600
                text-white
                rounded-sm
                py-1 w-full">
              Checkout
            </div>
          </div>

        </div>
        </div>

        
      </div>
      <div class="2xl:col-span-2 xl:col-span-2 lg:col-span-2 md:col-span-1 col-span-3">
        <h1 class="text-slate-700 border-2 border-slate-700 font-semibold bg-white">Select Table</h1>

        <div class="grid 2xl:grid-cols-3 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-3 py-3 ml-1">
          <div v-for="table in tableList" :key="table.id">
            <div v-if="table.select == false" @click="selectTable(table.id)" class="
                pointer
                text-sm
                border-2
                font-bold border-slate-700 
                rounded
                text-white
                bg-slate-700
                hover:bg-white hover:text-slate-800 hover:font-semibold
                
              ">
              <div class="grid grid-rows-2 items-center justify-center">
                <div> {{ table.name }} #{{ table.id }}</div>
                <div class="flex items-center justify-center hover:font-semibold">
                  <Icon width="25" icon="material-symbols:table-restaurant" style="color: white;" />
                </div>
              </div>
            </div>

            <div v-else class="
                pointer
                text-slate-400
                border-2
                border-slate-300
                rounded
              ">
              <div class="grid grid-rows-2 items-center justify-center">
                <div> {{ table.name }} #{{ table.id }}</div>
                <div class="flex items-center justify-center hover:font-semibold">
                  <Icon width="25" icon="material-symbols:table-restaurant" style="color:slategray;" />
                </div>
              </div>
            </div>
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
  props: ["id"],
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
        isTableSelected: Boolean
      }
    };
  },
  created() {
    for (let i = 0; i < this.$store.getters.getOrderList.length; i++) {

      if (this.$store.getters.getOrderList[i].orderId == this.id) {

        this.orderData.menu = this.$store.getters.getOrderList[i].menu;
        this.orderData.vat = this.$store.getters.getOrderList[i].vat;
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
  methods: {
    getOrderDetails(clickedOrderId, tableId) {
      for (let i = 0; i < this.orderList.length; i++) {
        console.log(clickedOrderId);
        if (this.orderList[i].orderId == clickedOrderId) {
          this.orderList[i].tableNo = tableId;
          console.log("ei orderList er table no", this.orderList[i].tableNo);
          this.orderData.menu = this.orderList[i].menu;
          this.orderData.vat = this.orderList[i].vat;
          this.orderData.serviceCharge = this.orderList[i].serviceCharge;
          this.orderData.totalPrice = this.orderList[i].totalPrice;
        }
      }
    },
    checkOut() {
      if (this.isTableSelected == true) {
        this.$router.push("/showtables/");
      }
    },
    selectTable(tableId) {
      if (this.executed == false) {
        for (let i = 0; i < this.tableList.length; i++) {
          if (this.tableList[i].id == tableId) {
            this.tableList[i].select = true;
            this.tableList[i].orderId = this.id;
            this.isTableSelected = true;
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
