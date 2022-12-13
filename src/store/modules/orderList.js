
const state = {
    orderList: [],
};

const getters = {
     getOrderList: state => state.orderList,
    // selectListLength: state => state.selectList.length,

};

const mutations = {
    addInList(state, payload) {
        state.orderList.push(payload);
    },
    // removeFromMenu(state,payload) {
    //     state.selectList.splice(payload,1);
    // }

};

const actions = {
    addOrder(context, payload) {
        context.commit("addInList", payload);
    },

    // removeProduct(context,payload) {
    //     context.commit("removeFromMenu",payload);
    // }
};


export default {
    state,
    getters,
    mutations,
    actions,
};