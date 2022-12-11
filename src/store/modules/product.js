
const state = {
    productList: [
        {
            id : 1,
            name : 'Burger',
            quantity: 0,
            price : 250,
        },
        {
            id : 2,
            name : 'Pizza',
            quantity: 0,
            price : 550,
        },
        {
            id : 3,
            name : 'Thai Soup',
            quantity: 0,
            price : 400,
        },
        {
            id : 4,
            name : 'Shawarma',
            quantity: 0,
            price : 200,
        },
        {
            id : 5,
            name : 'Chicken Fry',
            quantity: 0,
            price : 150,
        },
        {
            id : 6,
            name : 'Cheese Cake',
            quantity: 0,
            price : 350,
        },
        {
            id : 7,
            name : 'Waffles',
            quantity: 0,
            price : 220,
        },
        {
            id : 8,
            name : 'Crispy Sandwich',
            quantity: 0,
            price : 180,
        },
        {
            id : 9,
            name : 'Kebab Platter',
            quantity: 0,
            price : 700,
        },
        {
            id : 10,
            name : 'Fish and Chips',
            quantity: 0,
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