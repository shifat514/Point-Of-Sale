
const state = {
    selectList: [],
};

const getters = {
    getSelectList: state => state.selectList,
    selectListLength: state => state.selectList.length,

};

const mutations = {
    addMenu(state, payload) {
        state.selectList.push(payload);
    },
    // removeFromMenu(state,payload) {
    //     state.selectList.splice(payload,1);
    // },
    removeFromMenu(state,payload) {
        let productIndex= state.selectList.findIndex(element=> element.id == payload.id);       
         state.selectList.splice(productIndex,1);
    },

    resetSelectState (state) {
       state.selectList = [];
    }

};

const actions = {
    selectMenu(context, payload) {
        context.commit("addMenu", payload);
    },

    removeProduct(context,payload) {
        context.commit("removeFromMenu",payload);
    },
    // resetSelectMenu() {
    //     store.commit("resetState");
    // }
    
};


export default {
    state,
    getters,
    mutations,
    actions,
};