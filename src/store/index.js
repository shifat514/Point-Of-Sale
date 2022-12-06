import { createStore }  from 'vuex'
import  product  from './modules/product'
import selectProduct from './modules/selectProduct'

 const store = createStore({
    modules: {
        product,
        selectProduct,
    },
    // state:{},
    // getters:{},
    // mutations:{},
    // actions:{},
})

export default store;