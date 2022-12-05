//import { Vue } from 'vue'
import { createStore }  from 'vuex'
import  product  from './modules/product'

//Vue().use(Vuex());
 const store = createStore({
    modules: {
        product,
    },
    // state:{},
    // getters:{},
    // mutations:{},
    // actions:{},
})

// export default new Vuex().Store({
//     modules: {
//         product,
//     }
// })

export default store;