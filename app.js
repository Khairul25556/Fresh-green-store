let products = []; //*Creates an empty array to store products.
let cart = []; //*Creates an empty array to store the items added to the cart.

const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const totalDiv = document.getElementById("total");
const searchInput = document.getElementById("search");
const buyBtn = document.getElementById("buy-btn");

//* Fetch product data from data.json (fetch means bring)
fetch("data.json") //*Fetches the product data from a file called data.json.
.then((res) => res.json()) //*Converts the response into JSON format.
.then((data) => {
    products = data; //*When the data is received, it's stored in the products array.
    renderProducts(products); //*the function renderProducts is called to display them.
});

//*Render products to the page
function renderProducts(items){
    productList.innerHTML = ""; //*Clears the current product list before adding new ones.
    items.forEach(({item, price}) => { //*Loops through each product and displays it.
    //Use curly brackets {} when you are destructuring an object (e.g., { item, price } for objects with properties item and price).Use square brackets [] when you are destructuring an array (e.g., [item, price] for arrays).

        const div = document.createElement("div");
        div.classList.add("product");

        //*Creates a span element for the product name and price, and sets the text inside it.
        const name = document.createElement("span");
        name.textContent = `${item} - $${price}`;

        //*Creates a button that says "Add to Cart" and adds an event listener for when it’s clicked.
        const btn = document.createElement("button");
        btn.textContent = "Add to Cart";
        btn.addEventListener("click", () =>{ //*When clicked, the product is added to the cart array, and the updateCart() function is called.
            cart.push({item, price}); 
            updateCart();
        });

        //*The product name and button are added to the div, and the div is added to the productList on the page.
        div.appendChild(name);
        div.appendChild(btn);
        productList.appendChild(div);
    });
}

//*Update cart view
function updateCart() {
    cartList.innerHTML = ""; //*clears the cart list
    cart.forEach(({item,price}) => { //* now loops through the cart array, adding each item to the cart list on the page.
        const li = document.createElement("li");
        li.textContent = `${item} - $${price}`;
        cartList.appendChild(li); 
    });
}

searchInput.addEventListener("input", () => {
    const value = searchInput.value.toLowerCase(); //*searchInput.value gets the actual text that the user has typed into the input field.
    const filtered = products.filter((p) => 
        p.item.toLowerCase().includes(value)
    ); //*This filters the products array by checking if the product name (converted to lowercase) includes the search text (also converted to lowercase).

    //*filter() is an array method in JavaScript that allows you to filter elements from an array based on a condition. It returns a new array containing only the elements that meet the condition specified in the callback function.

    //*So, products.filter(...) will loop over each element in the products array and apply the condition inside the callback function to decide if the element should be included in the resulting filtered array.

    //*(p) => p.item.toLowerCase().includes(value) This part is the callback function that will be applied to each product in the products array. Let’s break it down:

    //* => p In the filter callback, p represents an individual product from the products array.

    //* => includes() is a string method that returns true if the string contains the specified substring, and false if it does not.

    //* => If the user types "ap", then value = "ap". "apple".includes("ap") returns true because "apple" contains "ap".

    //* => filter() After checking the condition for each product in the array, the filter() method will return a new array with only the products that match the condition.

    renderProducts(filtered); //* to display the filtered products.
});

buyBtn.addEventListener("click", () => {
    if(cart.length === 0){
        totalDiv.textContent = "Cart is empty!";
        return;
    }

    let total = 0;
    for(let item of cart){
        total += item.price;
    }

    let discount = 0;
    if(total >= 1000) {
        discount = Math.floor(total * 0.1);
        total -= discount;
    }

    totalDiv.textContent = `Discount: $${discount}, Final Total: $${total}`;
});


