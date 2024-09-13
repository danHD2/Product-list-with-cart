
const root = document.getElementById("root");
const leftDiv = document.createElement("div");
leftDiv.id = "left-div";
root.appendChild(leftDiv);

const rightDiv = document.createElement("div");
rightDiv.id = "right-div";
root.appendChild(rightDiv);

const title = document.createElement("h2");
title.id = "title";
title.textContent = "Desserts"
leftDiv.appendChild(title);

const content = document.createElement("div");
content.id = "content";
leftDiv.appendChild(content);

const cartCard = document.createElement("div");
cartCard.id = "cart";
rightDiv.appendChild(cartCard);

const yourCart = document.createElement("h4");
yourCart.id = "your-cart";
yourCart.textContent = `Your Cart (0)`;
cartCard.appendChild(yourCart);

const emptyCart = document.createElement("img");
emptyCart.id = "empty-cart";
emptyCart.src = "./assets/images/illustration-empty-cart.svg";
cartCard.appendChild(emptyCart);

const emptyText = document.createElement("p");
emptyText.id = "empty-text";
emptyText.textContent = "Your added items will appear here";
cartCard.appendChild(emptyText);

const cart = [];

const addToCart = (product, productId) => {
     
     

    const productIndex = cart.findIndex(item => item.name === product.name);


    if (productIndex !== -1) {
        cart[productIndex].quantity++;
    } else {
     cart.push({ ...product, quantity: 1});
    }

    console.log(cart);
    updateCart();
    updateBtn(productId);
}

const removeFromCart = (product, productId) => {
    const productIndex = cart.findIndex(cartItem => cartItem.name === product.name);

    if (productIndex !== -1) {
       if(cart[productIndex].quantity > 1) {
        cart[productIndex].quantity--;
    } else {
         cart.splice(productIndex, 1);
         updateBtn(productId);
    }
updateCart();


}
}

const updateBtn = (productId) => {

    const btn = document.querySelector(`[data-product-id="${productId}"]`);
    

    if (btn.classList.contains("selected-btn")) {
        btn.classList.remove("selected-btn")
        btn.innerHTML = `<img src="./assets/images/icon-add-to-cart.svg" class="btn-icon"><p>Add to Cart</p>`;
    } else {
        btn.classList.add("selected-btn");
        btn.innerHTML = `<img src="./assets/images/icon-decrement-quantity.svg" id="minus-icon"><p>${productId}</p><img src="./assets/images/icon-increment-quantity.svg">`;
    }
    

}


const updateCart = () => {

    cartCard.innerHTML = ''; 
    cartCard.appendChild(yourCart); 
    cartCard.appendChild(emptyCart);
    cartCard.appendChild(emptyText);
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0); // Calculate total items
    yourCart.textContent = `Your Cart (${totalItems})`;

    if (totalItems === 0) {
        emptyCart.style.display = "block";
        emptyText.style.display = "block";     
        
    } else {
        emptyCart.style.display = "none";
        emptyText.style.display = "none";
        

        let totalPrice = 0;

        cart.forEach((item, index) => {
            const itemDiv = document.createElement("div");
            itemDiv.classList = "item-div";
            itemDiv.id = `item-${index}`;
            cartCard.appendChild(itemDiv);

            const itemName = document.createElement("h5");
            itemName.innerText = item.name;
            itemDiv.appendChild(itemName);

            const itemQuantity = document.createElement("p");
            itemQuantity.innerText = `${item.quantity}x`;
            itemQuantity.classList = "quantity";
            itemDiv.appendChild(itemQuantity);

            const itemPrice = document.createElement("p");
            itemPrice.innerText = `@ $${item.price.toFixed(2)}`;
            itemPrice.classList = "cart-price";
            itemDiv.appendChild(itemPrice);

            const itemSubtotal = document.createElement("p");
            const subtotal = item.price * item.quantity;
            itemSubtotal.innerText = `$${subtotal.toFixed(2)}`;
            itemSubtotal.classList = "subtotal";
            itemDiv.appendChild(itemSubtotal);

            const xIcon = document.createElement("img");
            xIcon.src = "./assets/images/icon-remove-item.svg";
            xIcon.classList = "x-icon";
            itemDiv.appendChild(xIcon);

            xIcon.addEventListener("click", () => removeFromCart(item, index));


            totalPrice += subtotal;
        });

        const totalDiv = document.createElement("div");
        totalDiv.classList = "total-div";
        const totalTitle = document.createElement("p");
        totalTitle.id = "total-title";
        totalTitle.textContent = "Order Total";
        totalDiv.appendChild(totalTitle);
        const totalPriceElem = document.createElement("h4");
        totalPriceElem.innerText = `$${totalPrice.toFixed(2)}`;
        totalDiv.appendChild(totalPriceElem);
        cartCard.appendChild(totalDiv);
        const carbonDiv = document.createElement("div");
        carbonDiv.id = "carbon-div";
        cartCard.appendChild(carbonDiv);
        const carbonIcon = document.createElement("img");
        carbonIcon.id = "carbon-icon";
        carbonIcon.src = "./assets/images/icon-carbon-neutral.svg";
        carbonDiv.appendChild(carbonIcon);
        const carbonText = document.createElement("p");
        carbonText.id = "carbon-text";
        carbonText.textContent = `This is a `;
        const boldText = document.createElement("b");
        boldText.textContent = "carbon-neutral";
        carbonText.appendChild(boldText);
        carbonText.innerHTML += " delivery";
        carbonDiv.appendChild(carbonText);
        const confirmBtn = document.createElement("button");
        confirmBtn.id = "confirm-button";
        confirmBtn.textContent = "Confirm Order";
        cartCard.appendChild(confirmBtn);
    }
}


const addItem = (product) => {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const itemDiv = document.createElement("div");
    itemDiv.classList = "item-div";
    itemDiv.id = `item-${totalItems}`;
    cartCard.appendChild(itemDiv);

    const itemName = document.createElement("h5");
    itemName.innerText = product.name
}

fetch(`./data.json`)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Network response was not ok`);
        }
        return response.json()
    })
    .then(data => {
        renderProducts(data);
    })
    .catch(error => {
        console.error(`Error fetching the JSON file:`, error);
    });

    function renderProducts(products) {       
        
        products.forEach((product, index) => {
        const card = document.createElement("div");
        card.className = "product-card";
        card.id = `product-${index}`;
        
        const img = document.createElement("img");
        img.src = product.image.desktop;
        img.alt = product.name;
        img.classList = "product-img";
        card.appendChild(img);

        const btn = document.createElement("button");
        btn.id = `btn${index}`;
        btn.classList = "btns";
        btn.setAttribute(`data-product-id`, index);
        card.appendChild(btn);
        btn.addEventListener("click", () => addToCart(product, index));

        const btnIcon = document.createElement("img");
        btnIcon.src = "./assets/images/icon-add-to-cart.svg";
        btnIcon.classList = "btn-icon";
        btn.appendChild(btnIcon);
        btn.innerHTML += "<p>Add to Cart</p>";
        
        const productCategory = document.createElement("p");
        productCategory.textContent = product.category;
        productCategory.className = "category";
        card.appendChild(productCategory);

        const productName = document.createElement("h3");
        productName.textContent = product.name;
        card.appendChild(productName);
                
        const productPrice = document.createElement("p");
        productPrice.textContent = `$${product.price.toFixed(2)}`;
        productPrice.className = "price";
        card.appendChild(productPrice);
        
        content.appendChild(card);
            });

           
        }
