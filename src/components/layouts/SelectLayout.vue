<template>
    <div>
    <SelectMenu/>
    <slot></slot>
    <!-- <FoodMenu/> -->
    </div>
 
</template>

<script>
// import FoodMenu from "../FoodMenu.vue"
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