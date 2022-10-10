// data
const products = [
    { id: 1, description: "Quarz Luxe", price: 12, img: 'assets/img/quarz-luxe.JPG' },
    { id: 2, description: 'Curren Business', price: 20, img: 'assets/img/curren-business.JPG' },
    { id: 3, description: 'Curren Sport', price: 5, img: 'assets/img/curren-sport.JPG' },
    { id: 4, description: 'Jaragar Racing', price: 8, img: 'assets/img/jaragar-racing.JPG' },
    { id: 5, description: 'Liges Hommes', price: 3, img: 'assets/img/liges-hommes.JPG' },
    { id: 6, description: 'Maserati Mechanical', price: 65, img: 'assets/img/maserati-mechanical.JPG' },
    { id: 7, description: 'Montre Mecanique', price: 25, img: 'assets/img/montre-mecanique.JPG' },
    { id: 8, description: 'Brand Designer', price: 28, img: 'assets/img/brand-designer.JPG' },
    { id: 9, description: 'Relogio Masculino', price: 4, img: 'assets/img/relogio-masculino.JPG' },
    { id: 10, description: 'Tissot Multifunction', price: 29, img: 'assets/img/tissot-multifunction.JPG' },
    { id: 11, description: 'Hip Hop Gold', price: 87, img: 'assets/img/hiphop-gold.JPG' },
    { id: 12, description: 'Mesh Genova', price: 6, img: 'assets/img/mesh-genova.JPG' },
];



// 1. Define route components.
// These can be imported from other files

//Component Home
const Home = {
    name: 'Home',
    template: '#home',
    data() {
        return {
            products,
            searchkey: '',
            liked: [],
            cart: [],
        }
    },

    // Computed & Methods sont les meme chose sauf que:
    // Computed pr une surveillance avt d passer à l'action
    computed: {
        filteredList() {
            return this.products.filter((products) => {
                return products.description.toLowerCase().includes(this.searchkey.toLowerCase());
            })
        },

        getLikeCookie() {
            let cookieValue = JSON.parse($cookies.get('like'));
            cookieValue == null ? this.liked = [] : this.liked = cookieValue
        },

        cartTotalAmount() {
            let total = 0;
            for (let item in this.cart) {
                total = total + (this.cart[item].quantity * this.cart[item].price);
            }
            return total;
        },

        itemTotalAmount() {
            let itemTotal = 0;
            for (let item in this.cart) {
                itemTotal = itemTotal + (this.cart[item].quantity);
            }
            return itemTotal;
        }
    },

    // Methods pr une fction precise
    methods: {
        setLikeCookie() {
            document.addEventListener('input', () => {
                setTimeout(() => {
                    $cookies.set('like', JSON.stringify(this.liked));
                }, 300);
            })
        },
        addToCart(product) {
            //check if already in array
            for (let i = 0; i < this.cart.length; i++) {
                if (this.cart[i].id === product.id) {
                    return this.cart[i].quantity++
                }

            }
            this.cart.push({
                id: product.id,
                img: product.img,
                description: product.description,
                price: product.price,
                quantity: 1
            })
        },
        cartPlusOne(product) {
            product.quantity = product.quantity + 1;
        },
        cartMinusOne(product, id) { 
            if (product.quantity == 1) {
                this.cartRemoveItem(id);
            } else {
                product.quantity = product.quantity - 1;
            }
        },
        cartRemoveItem(id) {
            // this.$delete(this.cart, id);
            this.cart.splice(id, 1)
        }

    },

    //Tu montes les cookies liker
    mounted: () => {
        this.getLikeCookie;
    },
}


//Component UserSettings
const UserSettings = {
    name: 'UserSettings',
    template: '<h1>User Settings</h1>'
}


//Component WishList
const WishList = {
    name: 'WishList',
    template: '<h1>Wish List</h1>'
}


//Component ShoppingCart
const ShoppingCart = {
    name: 'ShoppingCart',
    template: '<h1>Shopping Cart</h1>'
}


// 2. Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.

const routes = [
    { path: '/', component: Home },
    { path: '/user-settings', component: UserSettings },
    { path: '/wish-list', component: WishList },
    { path: '/shopping-cart', component: ShoppingCart },
]


// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = VueRouter.createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: VueRouter.createWebHashHistory(),
    routes, // short for `routes: routes`
})


// 5. Create and mount the root instance.
const app = Vue.createApp({})
// Make sure to _use_ the router instance to make the
// whole app router-aware.
app.use(router)




app.mount('#app')
// const vue = new_Vue({
//     router
// }).$mount('#app')