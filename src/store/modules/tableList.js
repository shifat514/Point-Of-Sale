
const state = {
    tableList: [
        {
            orderId: 0,
            id : 1,
            name : 'Table',
            select: false,
        },
        {
            orderId: 0,
            id : 2,
            name : 'Table',
            select: false,
        },
        {
            orderId: 0,
            id : 3,
            name : 'Table',
            select: false,
        },
        {
            orderId: 0,
            id : 4,
            name : 'Table',
            select: false,
        },
        {
            orderId: 0,
            id : 5,
            name : 'Table',
            select: false,
        },
        {
            orderId: 0,
            id : 6,
            name : 'Table',
            select: false,
        },
        {
            orderId: 0,
            id : 7,
            name : 'Table',
            select: false,
        },
        {
            orderId: 0,
            id : 8,
            name : 'Window Side North',
            select: false,
        },
        {
            orderId: 0,
            id : 9,
            name : 'Window Side South',
            select: false,
        },
        {
            orderId: 0,
            id : 10,
            name : 'Smoking Zone',
            select: false,   
        },
    ],
};

const getters = {
     getTableList: state => state.tableList,
    // selectListLength: state => state.selectList.length,

};

const mutations = {
    // addInList(state, payload) {
    //     state.orderList.push(payload);
    // },
    // // removeFromMenu(state,payload) {
    // //     state.selectList.splice(payload,1);
    // // }

};

const actions = {
    // addOrder(context, payload) {
    //     context.commit("addInList", payload);
    // },

    // // removeProduct(context,payload) {
    // //     context.commit("removeFromMenu",payload);
    // // }
};


export default {
    state,
    getters,
    mutations,
    actions,
};