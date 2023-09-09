let productsInCart = localStorage.getItem("products-in-cart");
productsInCart = JSON.parse(productsInCart);

const containerEmptyCart = document.querySelector("#empty-cart");
const containerProductsCart = document.querySelector("#products-cart");
const containerActionsCart = document.querySelector("#actions-cart");
const containerBoughtCart = document.querySelector("#cart-bought");
let buttonsDelete = document.querySelectorAll(".delete-cart-product");
const buttonEmpty = document.querySelector("#actions-cart-empty");
const containerTotal = document.querySelector("#total");
const buttonBuy = document.querySelector("#actions-cart-buy");


function addProductsCart() {
    if (productsInCart && productsInCart.length > 0) {

        containerEmptyCart.classList.add("disabled");
        containerProductsCart.classList.remove("disabled");
        containerActionsCart.classList.remove("disabled");
        containerBoughtCart.classList.add("disabled");
    
        containerProductsCart.innerHTML = "";
    
        productsInCart.forEach(product => {
    
            const div = document.createElement("div");
            div.classList.add("cart-product");
            div.innerHTML = `
                <img class="cart-product-image" src="${product.image}" alt="${product.title}">
                <div class="cart-product-title">
                    <small>Title</small>
                    <h3>${product.title}</h3>
                </div>
                <div class="cart-product-quantity">
                    <small>Quantity</small>
                    <p>${product.quantity}</p>
                </div>
                <div class="cart-product-price">
                    <small>Price</small>
                    <p>$${product.price}</p>
                </div>
                <div class="cart-product-subtotal">
                    <small>Subtotal</small>
                    <p>$${product.price * product.quantity}</p>
                </div>
                <button class="delete-cart-product" id="${product.id}"><i class="bi bi-trash-fill"></i></button>
            `;
    
            containerProductsCart.append(div);
        })
    
    updateButtonsDelete();
    updateTotal();
	
    } else {
        containerEmptyCart.classList.remove("disabled");
        containerProductsCart.classList.add("disabled");
        containerActionsCart.classList.add("disabled");
        containerBoughtCart.classList.add("disabled");
    }

}

addProductsCart();

function updateButtonsDelete() {
    buttonsDelete = document.querySelectorAll(".delete-cart-product");

    buttonsDelete.forEach(boton => {
        boton.addEventListener("click", removeFromCart);
    });
}

function removeFromCart(e) {
    Toastify({
        text: "Product removed",
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
        onClick: function(){} // Callback after click
      }).showToast();

    const idButton = e.currentTarget.id;
    const index = productsInCart.findIndex(product => product.id === idButton);
    
    productsInCart.splice(index, 1);
    addProductsCart();

    localStorage.setItem("products-in-cart", JSON.stringify(productsInCart));

}

buttonEmpty.addEventListener("click", emptyCart);
function emptyCart() {

    Swal.fire({
        title: '¿Are you sure?',
        icon: 'question',
        html: `It will remove ${productsInCart.reduce((acc, product) => acc + product.quantity, 0)} products.`,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {
            productsInCart.length = 0;
            localStorage.setItem("products-in-cart", JSON.stringify(productsInCart));
            addProductsCart();
        }
      })
}


function updateTotal() {
    const totalCalculated = productsInCart.reduce((acc, product) => acc + (product.price * product.quantity), 0);
    total.innerText = `$${totalCalculated}`;
}

buttonBuy.addEventListener("click", buyCart);
function buyCart() {

    productsInCart.length = 0;
    localStorage.setItem("products-in-cart", JSON.stringify(productsInCart));
    
    containerEmptyCart.classList.add("disabled");
    containerProductsCart.classList.add("disabled");
    containerActionsCart.classList.add("disabled");
    containerBoughtCart.classList.remove("disabled");

}