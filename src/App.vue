<template>
  <div class="bg-white">
    <nav class="fixed w-full p-3 h-14 mb-4 shadow-md  bg-slate-700 flex items-center justify-between">
      <router-link to="/" class="text-white mx-4" tag="span">
        <span class="font-bold text-white text-xl">FoodQo Mini</span>
        </router-link>
      <div>
        <!-- <router-link to="/selectmenu" class="text-white mx-4">Show Menu</router-link> -->
        <router-link to="/selectmenu" class="text-white mx-4" tag="span">
          <Icon style="display: inline" width="25" icon="mdi:food-turkey"  class="mx-2"/>
        </router-link>
        <router-link to="/showtables" class="text-white mx-4" tag="span">
              <Icon style="display: inline" width="25" icon="material-symbols:table-restaurant" class="mx-2"/>
        </router-link>
        <router-link to="/transaction" class="text-white mx-4" tag="span">
          <Icon style="display: inline" width="25" class="mx-2" inline icon="mingcute:bill-fill"/>
        </router-link>
      </div>
    </nav>
    <router-view/>
  </div>
</template>

<script>
import './style.css'
import { Icon } from '@iconify/vue';

export default {
  name: 'App',
  components: {
    Icon,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

