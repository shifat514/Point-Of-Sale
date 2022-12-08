<template>
    <div>
        hello
   
    <div class="absolute bottom-1 left-1 bg-slate-100">
        <div>Charge : {{ selectCharge }} BDT</div>
        <div>Vat : {{ vat }} BDT</div>
        <div>SC : {{ serviceCharge }} BDT</div>
        <div>Total Extra Charge : {{ extraCharge }} BDT</div>
        <div>Total : {{ totalCharge }} BDT</div>
    </div>
    <SelectMenu/>
    </div>
 
</template>

<script>
//import FoodMenu from "../FoodMenu.vue"
import SelectMenu from "../SelectMenu.vue"
export default {
    data() {
        return {
            selectCharge: 0,
            vat: 0,
            serviceCharge: 0,
            extraCharge: 0,
            totalCharge: 0,
        };
    },

    components: {
        //FoodMenu,
        SelectMenu
    }
}
</script>

<style>

</style>