
const state = {
    selectList: [],
};

const getters = {
    getSelectList: state => state.selectList,
    selectListLength: state => state.selectList.length,
    
};

const mutations = {
    addMenu(state,payload)
    {
        state.selectList.push(payload);
    }
};

const actions = {
    selectMenu(context, payload) {
        context.commit("addMenu", payload);
    }
};


export default {
    state,
    getters,
    mutations,
    actions,
};