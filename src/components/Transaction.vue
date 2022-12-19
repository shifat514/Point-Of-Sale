<template>
    <div clas="grid justify-items-between">
        <div class="bg-gray-300 font-semibold">Transactions</div>
        <div class="flex flex-col">
            <div class="overflow-x-auto shadow-md sm:rounded-lg">
                <div class="inline-block min-w-full align-middle">
                    <div class="overflow-hidden ">
                        <table class="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                            <thead class="bg-gray-100 dark:bg-gray-700">
                                <tr class="flex justify-around">
                                    <th scope="col"
                                        class="py-3 ml-12 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                        Order Id
                                    </th>
                                    <th scope="col"
                                        class="py-3 ml-12 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                        Table No
                                    </th>
                                    <th scope="col"
                                        class="py-3 ml-12 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                        Bill Amount
                                    </th>
                                    <th scope="col"
                                        class="py-3 ml-12 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                        Bill Paid
                                    </th>
                                   
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                                <tr v-for="(item) in paidOrderList" :key="item" class="hover:bg-gray-100 dark:hover:bg-gray-700 flex justify-around">
                                    <td
                                        class="py-4 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        #{{ item.orderId }}</td>
                                    <td
                                        class="py-4 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {{ item.tableNo }}</td>
                                    <td
                                        class="py-4  text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {{ item.totalPrice }} BDT</td>
                                        <td
                                        class="py-4 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {{ item.paidBill }}</td>
                                    
                                </tr>
                            </tbody>
                        </table>
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
            paidOrderList: [],
        }
    },
    methods: {

        paidBillOrderList() {
            for (let i = 0; i < this.$store.getters.getOrderList.length; i++) {
                console.log(this.$store.getters.getOrderList[i].paidBill);
                if (this.$store.getters.getOrderList[i].paidBill == true) {
                    console.log(this.$store.getters.getOrderList[i]);
                    this.paidOrderList.push(this.$store.getters.getOrderList[i]);
                }
            }

        },
    },
    created() {
        this.paidBillOrderList();
    }
}
</script>

<style>

</style>