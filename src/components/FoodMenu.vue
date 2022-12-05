<template>
    <div>
      <h1>Foodmenu</h1>
      <ul>
        <li v-for="(item) in findProductList" :key="item">
          {{ item.id }} - {{ item.name }} - {{item.price}}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
        name: "foodmenu",
    data() {
      return {
        productList: [],
      };
    },
    
    computed: {
      findProductList(){
        return this.$store.getters.getProductList;
      }
    },
    
    methods: {
     // getProduct
    }
  }
  </script>
  
  <style>
  
  </style>