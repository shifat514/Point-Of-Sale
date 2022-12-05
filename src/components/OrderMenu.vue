<template>
    <div>
        <p>{{ menu.id }}</p>
        <p>{{ menu.name }}</p>
        <p>{{ menu.price }}</p>
        <FoodMenu @orderProduct="addedProduct"/>
    </div>

</template>

<script>
import FoodMenu from './FoodMenu.vue';

export default {
    data() {
        return {
            menu: {
                id: '',
                name: '',
                price: '',
            },
        };
    },

    components: {
        FoodMenu
    },
    methods: {
        addedProduct(childData) {
            this.menu = childData;
            console.log(childData);
        }
    }
}
</script>

<style>

</style>
