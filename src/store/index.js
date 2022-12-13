import { createStore }  from 'vuex'
import  product  from './modules/product'
import selectProduct from './modules/selectProduct'
import orderList from './modules/orderList'
import tableList from './modules/tableList'
 
const store = createStore({
    modules: {
        product,
        selectProduct,
        orderList,
        tableList
    },
    // state:{},
    // getters:{},
    // mutations:{},
    // actions:{},
})

export default store;