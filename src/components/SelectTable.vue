<template>
  <div class="container">
    <div class="grid grid-cols-3">
      <div class="bg-blue-50 col-span-1">
        <h1 class="text-white font-semibold bg-slate-700">Ordered Menu</h1>
        <h5 class="text-slate-700 bg-slate-200 font-base text-sm py-1">
          <span class="font-semibold">Order Id</span>#{{ this.id }}
        </h5>
        <div class="flex justify-center">
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
                <tr class="pointer" v-for="item in orderData.menu" :key="item.id">
                  <td>{{ item.id }}</td>
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
                <div>VAT (5%)</div>
                <div>Service Charge (10%)</div>
                <div>Total Price</div>
              </div>
              <div>
                <div>
                  <div>{{ orderData.vat }} BDT</div>
                  <div>{{ orderData.serviceCharge }} BDT</div>
                  <div>{{ orderData.totalPrice }} BDT</div>
                </div>
              </div>
            </div>
            <button @click="updateOrder()" class="
                bg-cyan-700
                hover:bg-cyan-200 hover:text-cyan-800
                text-white
                rounded-md
                py-1
                px-2
                mr-2
              ">
              Update
            </button>
            <button @click="checkOut()" class="
                bg-green-900
                hover:bg-green-600
                text-white
                rounded-md
                py-1
                px-2
              ">
              Checkout
            </button>
          </div>
        </div>
      </div>
      <div class="col-span-2">
        <h1 class="text-white font-semibold bg-slate-400">Select a Table</h1>
        <div class="grid grid-cols-3 lg:gap-5 py-3">
          <div v-for="table in tableList" :key="table.id">
            <div v-if="table.select == false" @click="selectTable(table.id)" class="
                pointer
                text-sm
                border-2
                shadow-sm
                border-slate-600
                rounded
                hover:bg-slate-800 hover:text-white hover:font-semibold
              ">
              <div>{{ table.name }} #{{ table.id }}</div>
            </div>

            <div v-else class="
                pointer
                text-slate-400
                border-2
                shadow-sm
                border-slate-300
                rounded
              ">
              <div>{{ table.name }} #{{ table.id }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
      }
    };
  },
  onMounted(){

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
