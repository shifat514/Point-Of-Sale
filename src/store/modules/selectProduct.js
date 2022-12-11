
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
    removeFromMenu(state,payload) {
        state.selectList.splice(payload,1);
    }

};

const actions = {
    selectMenu(context, payload) {
        context.commit("addMenu", payload);
    },

    removeProduct(context,payload) {
        context.commit("removeFromMenu",payload);
    }
};


export default {
    state,
    getters,
    mutations,
    actions,
};