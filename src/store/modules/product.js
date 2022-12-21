
const state = {
    productList: [
        {
            id : 1,
            name : 'Burger',
            quantity: 0,
            price : 250,
            vat: true,
        },
        {
            id : 2,
            name : 'Pizza',
            quantity: 0,
            price : 550,
            vat: true,
        },
        {
            id : 3,
            name : 'Thai Soup',
            quantity: 0,
            price : 400,
            vat: true,
        },
        {
            id : 4,
            name : 'Shawarma',
            quantity: 0,
            price : 200,
            vat: true,
        },
        {
            id : 5,
            name : 'Chicken Fry',
            quantity: 0,
            price : 150,
            vat: true,
        },
        {
            id : 6,
            name : 'Cheese Cake',
            quantity: 0,
            price : 350,
            vat: true,
        },
        {
            id : 7,
            name : 'Waffles',
            quantity: 0,
            price : 220,
            vat: true,
        },
        {
            id : 8,
            name : 'Crispy Sandwich',
            quantity: 0,
            price : 180,
            vat: true,
        },
        {
            id : 9,
            name : 'Kebab Platter',
            quantity: 0,
            price : 700,
            vat: true,
        },
        {
            id : 10,
            name : 'Fish and Chips',
            quantity: 0,
            price : 630,
            vat: true,
        },
        {
            id : 11,
            name : 'Mineral Water',
            quantity: 0,
            price : 15,
            vat: false,
        },
        {
            id : 12,
            name : 'Cold Drinks',
            quantity: 0,
            price : 40,
            vat: false,
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