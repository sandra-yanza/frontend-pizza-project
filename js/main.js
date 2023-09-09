const getProducts = () => [
    {
        "id": "hawaian",
        "title": "Hawaian",
        "image": "./images/products/hawaian.jpg",
        "category": {
            "name": "hawaian",
            "id": "hawaian"
        },
        "price": 20,
        "size": "Small"
    },

    {
        "id": "cheese-tomato",
        "title": "Cheese and Tomato",
        "image": "./images/products/cheese-tomato.jpg",
        "category": {
            "name": "cheese-tomato",
            "id": "cheese-tomato"
        },
        "price": 18,
        "size": "Small"
    },

    {
        "id": "pepperoni",
        "title": "Pepperoni",
        "image": "./images/products/pepperoni.jpg",
        "category": {
            "name": "pepperoni",
            "id": "pepperoni"
        },
        "price": 22,
        "size": "Medium"
    },

    {
        "id": "california",
        "title": "California",
        "image": "./images/products/california.jpg",
        "category": {
            "name": "california",
            "id": "california"
        },
        "price": 25,
        "size": "Medium"
    },

    {
        "id": "chicago",
        "title": "Chicago",
        "image": "./images/products/chicago.jpg",
        "category": {
            "name": "chicago",
            "id": "chicago"
        },
        "price": 27,
        "size": "Medium"
    },

    {
        "id": "greek",
        "title": "Greek",
        "image": "./images/products/greek.jpg",
        "category": {
            "name": "greek",
            "id": "greek"
        },
        "price": 36,
        "size": "Large"
    },

    {
        "id": "neapolitan",
        "title": "Neapolitan",
        "image": "./images/products/neapolitan.jpg",
        "category": {
            "name": "neapolitan",
            "id": "neapolitan"
        },
        "price": 26,
        "size": "Medium"
    },

    {
        "id": "newYork",
        "title": "New York",
        "image": "./images/products/newYork.jpg",
        "category": {
            "name": "newYork",
            "id": "newYork"
        },
        "price": 32,
        "size": "Large"
    }
]

const containerProducts = document.querySelector("#package-products");
const buttonsCategories = document.querySelectorAll(".category-button");
const mainTitle = document.querySelector("#main-title");
let buttonsAdd = document.querySelectorAll(".product-add");
const smallNumber = document.querySelector("#small-number");
const aboutContainer = document.querySelector("#history");

let products = getProducts();

$(document).ready(() => {
    const session = getUserSession();
    if (session) {
        $("#user-session__action").removeClass("disabled");
        $("#log-in__action").addClass("disabled");
        $("#sign-up__action").addClass("disabled");

        $("#username").text(session.name);
    }
    addProducts(products);
});


buttonsCategories.forEach(button => button.addEventListener("click", () => {
    aside.classList.remove("aside-visible");
}))


function addProducts(productsChosen) {

    containerProducts.innerHTML = "";
    productsChosen.forEach(product => {

        const isValidSession = getUserSession();
        const div = document.createElement("div");

        div.classList.add("product");
        div.innerHTML = `
            <img class="product-image" src="${product.image}" alt="${product.title}">
            <div class="product-details">
                <h3 class="product-title">${product.title}</h3>
                <p class="product-price">$${product.price}</p>
                ${isValidSession
                ? `<button class="product-add" id='${product.id}'>Add</button>`
                : ''
            }
            </div>
        `;

        containerProducts.append(div);
    })

    updateButtonsAdd();
}

function toggleElements({
    componentName,
    type = "article",
    className = "disabled",
    invertClass = false
}) {
    const sections = [...document.getElementsByTagName(type)];
    sections.forEach((section) => {
        if (section.id !== componentName) {
            section.classList[invertClass ? "remove" : "add"](className)
        } else {
            section.classList[invertClass ? "add" : "remove"](className)
        }
    })
}

$("button#menu").click(function () {
    const buttonOptions = {
        componentName: "menu",
        type: "button",
        className: "active",
        invertClass: true
    }
    toggleElements({ componentName: "menuComponent" });
    toggleElements(buttonOptions);
    addProducts(products);
});

$("button#about-us").click(function () {
    const buttonOptions = {
        componentName: "about-us",
        type: "button",
        className: "active",
        invertClass: true
    }
    toggleElements({ componentName: "aboutUsComponent" });
    toggleElements(buttonOptions);
});

$("button#logIn").click(function () {
    const buttonOptions = {
        componentName: "logIn",
        type: "button",
        className: "active",
        invertClass: true
    }

    // Valida si el usuario ya esta logueado
    const isUserLoggedIn = getUserSession();

    toggleElements({ componentName: isUserLoggedIn ? "userLoggedComponent" : "loginComponent" });
    toggleElements(buttonOptions);
});

$("button#signUp").click(function () {
    const buttonOptions = {
        componentName: "signUp",
        type: "button",
        className: "active",
        invertClass: true
    }

    // Valida si el usuario ya esta logueado
    const isUserLoggedIn = getUserSession();

    toggleElements({ componentName: isUserLoggedIn ? "userLoggedComponent" : "registerComponent" });
    toggleElements(buttonOptions);
});

$("button#user").click(function () {
    const buttonOptions = {
        componentName: "user",
        type: "button",
        className: "active",
        invertClass: true
    }

    toggleElements({ componentName: "userLoggedComponent" });
    toggleElements(buttonOptions);
    const { name } = getUserSession();
    $("#username-page").text(`Welcome back, ${name}`)
});

function updateButtonsAdd() {
    buttonsAdd = document.querySelectorAll(".product-add");

    buttonsAdd.forEach(boton => {
        boton.addEventListener("click", addToCart);
    });
}

let productsInCart;
let productsInCartLS = localStorage.getItem("products-in-cart");

if (productsInCartLS) {
    productsInCart = JSON.parse(productsInCartLS);
    updateSmallNumber();
} else {
    productsInCart = [];
}

function addToCart(e) {

    Toastify({
        text: "Product Added",
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "linear-gradient(to right, #d87d33, #e9bc5c)",
            borderRadius: "2rem",
            textTransform: "uppercase",
            fontSize: ".75rem"
        },
        offset: {
            x: '1.5rem', // horizontal axis - can be a number or a string indicating unity. eg: '2em'
            y: '1.5rem' // vertical axis - can be a number or a string indicating unity. eg: '2em'
        },
        onClick: function () { } // Callback after click
    }).showToast();

    const idButton = e.currentTarget.id;
    const productAdded = products.find(product => product.id === idButton);

    if (productsInCart.some(product => product.id === idButton)) {
        const index = productsInCart.findIndex(product => product.id === idButton);
        productsInCart[index].quantity++;
    } else {
        productAdded.quantity = 1;
        productsInCart.push(productAdded);
    }

    updateSmallNumber();
    localStorage.setItem("products-in-cart", JSON.stringify(productsInCart));
}

function updateSmallNumber() {
    let newSmallNumber = productsInCart.reduce((acc, product) => acc + product.quantity, 0);
    smallNumber.innerText = newSmallNumber;
}

function setupLogin(userName) {
    $("button#menu").click();
    $("#user-session__action").removeClass("disabled");
    $("#log-in__action").addClass("disabled");
    $("#sign-up__action").addClass("disabled");

    console.log($("#username").text());
    $("#username").text(userName)
}

function onLogin(e) {
    e.preventDefault();
    $("#login-error").addClass("disabled")
    const email = $("#login-email").val();
    const password = $("#login-password").val();

    const data = localStorage.getItem("userInfo");
    if (!data) return; // Control error

    const userInfo = JSON.parse(data);
    const dbUser = userInfo.users.find((user) => user.email === email) || [];
    console.log(dbUser);

    if (dbUser.length === 0) return;


    if (dbUser.password === password) {
        const newUserInfo = {
            ...userInfo, currentUser: { name: dbUser.name, email }
        }

        localStorage.setItem("userInfo", JSON.stringify(newUserInfo));
        setupLogin(dbUser.name);
        cleanForm();
    } else {
        $("#login-error").removeClass("disabled")
    }
}

function cleanForm(isRegister = false) {
    if (isRegister) {
        $("#register-name").val("");
        $("#register-email").val("");
        $("#register-password").val("");
        $("#register-password2").val("");
    } else {
        $("#login-email").val("");
        $("#login-password").val("");
    }
}

function onRegister(e) {
    e.preventDefault();
    const name = $("#register-name").val();
    const email = $("#register-email").val();
    const password = $("#register-password").val();
    const passwordConfirmation = $("#register-password2").val();

    if (password !== passwordConfirmation) {
        $("#password-error").removeClass("disabled");
        return;
    } else {
        $("#password-error").addClass("disabled");
    }

    if (email && name && password && passwordConfirmation) {

        const userStorage = localStorage.getItem("userInfo");
        const userInfo = JSON.parse(userStorage);

        const users = userInfo ? userInfo.users : [];
        const alreadyCreated = users.find((user) => user.email === email);

        if (alreadyCreated) {
            $("#duplicated-email-error").removeClass("disabled");
            return;
        } else {
            $("#duplicated-email-error").addClass("disabled");
        }

        const currentUser = { name, email, password };

        const newUserInfo = {
            users: [...users, currentUser],
            currentUser: { name, email }
        }

        localStorage.setItem("userInfo", JSON.stringify(newUserInfo));
        setupLogin(name);
        cleanForm(true);
    }
}

function getUserSession() {
    const storage = localStorage.getItem("userInfo");
    if (!storage) return false;

    const userInfo = JSON.parse(storage);
    return userInfo.currentUser;
}

function redirectToRegister() {
    // Simula click nativo y adapta la funcion predefinida
    const registerBtn = document.getElementById("signUp");
    registerBtn.click();
}

function redirectToLogin() {
    // Simula click nativo y adapta la funcion predefinida
    const loginBtn = document.getElementById("logIn");
    loginBtn.click();
}

function closeSession() {
    const userInfo = localStorage.getItem("userInfo");
    if (!userInfo) return;

    console.log(userInfo);
    const userData = JSON.parse(userInfo);
    console.log(userData);
    localStorage.setItem("userInfo", JSON.stringify({ users: userData.users, currentUser: null }));
    $("button#logIn").click();
    $("#user-session__action").addClass("disabled");
    $("#log-in__action").removeClass("disabled");
    $("#sign-up__action").removeClass("disabled");
}

function applyFilter(){
    let products = getProducts();

    const size = $("#size").val();
    if (size.localeCompare("All") != 0)
        products = products.filter(a => a.size == size);

    const price = $("#price").val();
    const compareValue = price.localeCompare("low")
    if (compareValue == 0)   
        products = sortJSON(products, 'price', 'asc');
    else
        products = sortJSON(products, 'price', 'desc');
    
    addProducts(products);
}

function sortJSON(data, key, orden) {
    return data.sort(function (a, b) {
        var x = a[key],
        y = b[key];

        if (orden === 'asc') {
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        }
        if (orden === 'desc') {
            return ((x > y) ? -1 : ((x < y) ? 1 : 0));
        }
    });
}