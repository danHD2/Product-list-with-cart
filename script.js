
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

let cart = [];

const addToCart = (product) => {   
     

    const productIndex = cart.findIndex(item => item.name === product.name);


    if (productIndex !== -1) {
        cart[productIndex].quantity++;
    } else {
     cart.push({ ...product, quantity: 1});
     
    }

   
    updateCart();
    updateBtn(product);
}

const decrement = (product) => {
    const productIndex = cart.findIndex(cartItem => cartItem.name === product.name);
    if (productIndex !== -1) {
        const productInCart = cart[productIndex]; 

        const btn = document.querySelector(`[data-product-name="${product.name}"]`);

        btn.innerHTML = ` <button class="minus-icon-btn icon-btn">
                    <img src="./assets/images/icon-decrement-quantity.svg" class="minus-icon">
                </button>
                <p>${productInCart.quantity}</p>
                <button class="plus-icon-btn icon-btn">
                    <img class="plus-icon" src="./assets/images/icon-increment-quantity.svg">
                </button>`;

        const plus = btn.querySelector(".plus-icon-btn");
        const minus = btn.querySelector(".minus-icon-btn");
        plus.addEventListener("click", () => addToCart(product));
        minus.addEventListener("click", () => removeFromCart(product));

        updateCart();
}
}


const removeFromCart = (product) => {
    
    const productIndex = cart.findIndex(cartItem => cartItem.name === product.name);

    if (productIndex !== -1) {
       if(cart[productIndex].quantity > 1) {
        cart[productIndex].quantity--;
        decrement(product);
    } else {
       
         cart.splice(productIndex, 1);
         
         removebtn(product);
    }
updateCart();


}
}

const removebtn = (product) => {
    
    const btn = document.querySelector(`[data-product-name="${product.name}"]`);
    
    if (btn) {
        btn.classList.remove("selected-btn");
        btn.innerHTML = `<img src="./assets/images/icon-add-to-cart.svg" class="btn-icon"><p class="add-to-cart-text">Add to Cart</p>`;
        const addToCartText = btn.querySelector(".add-to-cart-text");
        addToCartText.addEventListener("click", () => addToCart(product));
    }
}

const updateBtn = (product) => {

    
    const productInCart = cart.find(cartItem => cartItem.name === product.name);
    

    if (productInCart) {
        const btn = document.querySelector(`[data-product-name="${product.name}"]`);
        btn.classList.add("selected-btn");
        btn.innerHTML = `<button class="minus-icon-btn icon-btn">
                <img src="./assets/images/icon-decrement-quantity.svg" class="minus-icon">
            </button>
            <p>${productInCart.quantity}</p>
            <button class="plus-icon-btn icon-btn">
                <img class="plus-icon" src="./assets/images/icon-increment-quantity.svg">
            </button>`;
        const plus = btn.querySelector(".plus-icon-btn");
        const minus = btn.querySelector(".minus-icon-btn");
        plus.addEventListener("click", () => addToCart(product));
        minus.addEventListener("click", () => removeFromCart(product)); 
    } else {
        const btn = document.querySelectorAll(".selected-btn")
        
            btn.forEach((element) => {
                element.classList.remove("selected-btn")
                element.innerHTML = `<img src="./assets/images/icon-add-to-cart.svg" class="btn-icon"><p class="add-to-cart-text">Add to Cart</p>`;
                const addToCartText = document.querySelector(".add-to-cart-text");
                addToCartText.addEventListener("click", () => addToCart(product));
        }) 
        
    }
    

}



const updateCart = (item, index) => {

    cartCard.innerHTML = ''; 
    cartCard.appendChild(yourCart); 
    cartCard.appendChild(emptyCart);
    cartCard.appendChild(emptyText);
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0); 
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
            const buttonIndex = cart.findIndex(item => item.name === item.name);
            xIcon.addEventListener("click", () => removeFromCart(item, buttonIndex));

            const productImg = document.createElement("img");
            productImg.src = item.image.thumbnail;


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
        totalPriceElem.id = "total-price";
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
    const openModal = () => {
        modal.style.display = "block";
        const modalTotalPrice = document.getElementById("total-price").innerText;
        
        

        cart.forEach((item, index) => {
            const itemDiv = document.createElement("div");
            itemDiv.classList = "modal-item-div";
            itemDiv.id = `modal-item-${index}`;
            modalProducts.appendChild(itemDiv);

            const itemDetails = document.createElement("div");
            itemDetails.classList = "item-details";
            itemDiv.appendChild(itemDetails);

            const productImageSrc = item.image.thumbnail;

            const itemImage = document.createElement("img");
            itemImage.src = productImageSrc;
            itemImage.classList = "modal-imgs";
            itemDetails.appendChild(itemImage);

            const itemInfo = document.createElement("div");
            itemInfo.classList = "item-info";
            itemDetails.appendChild(itemInfo);

            const itemName = document.createElement("h5");
            itemName.innerText = item.name;
            itemInfo.appendChild(itemName);

            const itemSub = document.createElement("div");
            itemSub.classList = "item-sub";
            itemInfo.appendChild(itemSub);

            const itemQuantity = document.createElement("p");
            itemQuantity.innerText = `${item.quantity}x`;
            itemQuantity.classList = "modal-quantity";
            itemSub.appendChild(itemQuantity);

            const itemPrice = document.createElement("p");
            itemPrice.innerText = `@ $${item.price.toFixed(2)}`;
            itemPrice.classList = "modal-cart-price";
            itemSub.appendChild(itemPrice);

            const subTotalDiv = document.createElement("div");
            subTotalDiv.classList = "subtotal-div";
            itemDiv.appendChild(subTotalDiv);

            const itemSubtotal = document.createElement("p");
            const subtotal = item.price * item.quantity;
            itemSubtotal.innerText = `$${subtotal.toFixed(2)}`;
            itemSubtotal.classList = "modal-subtotal";
            subTotalDiv.appendChild(itemSubtotal);
            
        });
        const totalDiv = document.createElement("div");
        totalDiv.classList = "modal-total-div";

        const totalTitle = document.createElement("p");
        totalTitle.id = "modal-total-title";
        totalTitle.textContent = "Order Total";
        totalDiv.appendChild(totalTitle);

        const totalPriceElem = document.createElement("h4");
        totalPriceElem.innerText = `${modalTotalPrice}`;
        totalPriceElem.id = "modal-total-price";
        totalDiv.appendChild(totalPriceElem);
        modalProducts.appendChild(totalDiv);

        

        window.addEventListener("click", closeModal)
    }
    
    const confirmBtn = document.getElementById("confirm-button");
    if (confirmBtn !== null) {

        confirmBtn.addEventListener("click", openModal);
    }
}

const closeModal = (event) => {
    if (event.target == modal || event.target == startNewBtn) {
        modal.style.display = "none";
        modalProducts.innerHTML = "";
        cart = [];
        window.removeEventListener("click", closeModal);
        updateCart();
        updateBtn();
        reinitializeButtons();
        
      }
}

const reinitializeButtons = () => {
    
    const buttons = document.querySelectorAll(".btns");

    buttons.forEach(button => {
        
        button.classList.remove("selected-btn");
        button.innerHTML = `<img src="./assets/images/icon-add-to-cart.svg" class="btn-icon"><p class="add-to-cart-text">Add to Cart</p>`;

        
        const productName = button.getAttribute("data-product-name");
        const product = products.find(prod => prod.name === productName);

        
        const addToCartText = button.querySelector(".add-to-cart-text");
        addToCartText.addEventListener("click", () => addToCart(product));
    });
};

const addItem = (product) => {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const itemDiv = document.createElement("div");
    itemDiv.classList = "item-div";
    itemDiv.id = `item-${totalItems}`;
    cartCard.appendChild(itemDiv);

    const itemName = document.createElement("h5");
    itemName.innerText = product.name
}

let products = [];

fetch(`./data.json`)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Network response was not ok`);
        }
        return response.json()
    })
    .then(data => {
        products = data;
        renderProducts(products);
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
        btn.setAttribute(`data-product-name`, product.name);
        card.appendChild(btn);
        
        const btnIcon = document.createElement("img");
        btnIcon.src = "./assets/images/icon-add-to-cart.svg";
        btnIcon.classList = "btn-icon";
        btn.appendChild(btnIcon);
        btn.innerHTML += `<p class="add-to-cart-text">Add to Cart</p>`;
        
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
        const addToCartText = btn.querySelector(".add-to-cart-text");
            addToCartText.addEventListener("click", () => addToCart(product));
            });

            
        }


        const modal = document.createElement("div");
        modal.className = "modal";
        root.appendChild(modal);

        const modalContent = document.createElement("div");
        modalContent.className = "modal-content";
        modal.appendChild(modalContent);

        const modalIcon = document.createElement("img");
        modalIcon.src = "./assets/images/icon-order-confirmed.svg";
        modalIcon.className = "modal-icon";
        modalContent.appendChild(modalIcon);

        const modalTitle = document.createElement("h2");
        modalTitle.className = "modal-title";
        modalTitle.textContent = "Order Confirmed";
        modalContent.appendChild(modalTitle);

        const modalSubtitle = document.createElement("p");
        modalSubtitle.className = "modal-subtitle";
        modalSubtitle.textContent = "We hope you enjoy your food!";
        modalContent.appendChild(modalSubtitle);

        const modalProducts = document.createElement("div");
        modalProducts.classList = "modal-products";
        modalContent.appendChild(modalProducts);

     

        const startNewBtn = document.createElement("button");
        startNewBtn.id = "start-new-btn";
        startNewBtn.textContent = "Start New Order";
        modalContent.appendChild(startNewBtn);
        startNewBtn.addEventListener("click", closeModal)