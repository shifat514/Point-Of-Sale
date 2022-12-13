
const state = {
    tableList: [
        {
            id : 1,
            name : 'Table',
            select: false,
        },
        {
            id : 2,
            name : 'Table',
            select: false,
        },
        {
            id : 3,
            name : 'Table',
            select: false,
        },
        {
            id : 4,
            name : 'Table',
            select: false,
        },
        {
            id : 5,
            name : 'Table',
            select: false,
        },
        {
            id : 6,
            name : 'Table',
            select: false,
        },
        {
            id : 7,
            name : 'Table',
            select: false,
        },
        {
            id : 8,
            name : 'Window Side North',
            select: false,
        },
        {
            id : 9,
            name : 'Window Side South',
            select: false,
        },
        {
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