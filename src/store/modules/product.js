
const state = {
    productList: [
        {
            id : 1,
            name : 'Burger',
            price : 250,
        },
        {
            id : 2,
            name : 'Pizza',
            price : 550,
        },
        {
            id : 3,
            name : 'Thai Soup',
            price : 400,
        },
        {
            id : 4,
            name : 'Shawarma',
            price : 200,
        },
        {
            id : 5,
            name : 'Chicken Fry',
            price : 150,
        },
        {
            id : 6,
            name : 'Cheese Cake',
            price : 350,
        },
        {
            id : 7,
            name : 'Waffles',
            price : 220,
        },
        {
            id : 8,
            name : 'Crispy Sandwich',
            price : 180,
        },
        {
            id : 9,
            name : 'Kebab Platter',
            price : 700,
        },
        {
            id : 10,
            name : 'Fish and Chips',
            price : 630,
        },
    ],
};

const getters = {
    getProductList : state => state.productList,
};

// const mutations = {

// };

// const actions = {

// };


export default {
    state,
    getters,
    // mutations,
    // actions,
};