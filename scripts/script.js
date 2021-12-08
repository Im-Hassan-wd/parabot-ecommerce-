// Global selection and variables
const reviewCards = document.querySelectorAll(".card");
const productItem = document.querySelector(".tabs");
const cartItemContainer = document.querySelector(".cart-item-container");
const cart = document.querySelector(".product-cart");
const sections = document.querySelectorAll(".products");
const itemInfo = document.querySelector(".item-info");
const cartTotal = document.querySelector(".product-cart p");
const back = document.querySelector(".go-back");

// Event listeners
const indexScriptCode  = () => {
    reviewCards.forEach(card => {
        card.addEventListener("mouseenter", (e) => {
            cardsAnimation(e);
        });
        card.addEventListener("mouseleave", (e) => {
            removeCardsAnimation(e);
        });
    }); 
}

const productScriptCode  = () => {
    products();
    getCartTotal();
    productItem.addEventListener("click", (e) => {
        addItemToLocalstorage(e);
        addToCart(e);
        removeFromCart(e);
        getInfo(e);
    });
    cartItemContainer.addEventListener("click", (e) => {
        removeFromCart(e);
    });
    cart.addEventListener("click", () => {
        cartItemContainer.classList.toggle('active');
        productItem.classList.toggle("active");
    });
    toogleTab();
    addToCart();
}

const infoScriptCode = () => {
    showInfo();
    back.addEventListener("click", () => {
        removeInfoFromLocalstorage();
    });
}

// run while I'm in the index file : don't run
if (document.body.id.includes("index")) {
    indexScriptCode();
}
if (document.body.id.includes("product")) {
    productScriptCode();
}
if (document.body.id.includes("info")) {
    infoScriptCode();
}

async function products() {
    const products = await getProducts();
    
    products.forEach(product => {
        if(product.category == "chair"){
            let html;

            html = `
                <div class="product-item">
                    <img class="item-img" src="${product.src}" alt="${product.name}">
                    <h4 class="item-name">${product.name}</h4>
                    <h3 class="item-price">${product.price}</h3>
                    <a href="info.html?id=${product.id}" class="info-button" data-id="${product.id}"><img src="./icon/info.svg" alt="more info"></a>
                    <button class="cart-button"><img class="item-cart" src="./icon/cart.svg" alt="add to cart"></button>
                </div>
            `;

            sections[0].innerHTML += html;
        } else if (product.category == "sofas") {
            let html;

            html = `
                <div class="product-item">
                    <img class="item-img" src="${product.src}" alt="${product.name}">
                    <h4 class="item-name">${product.name}</h4>
                    <h3 class="item-price">${product.price}</h3>
                    <a href="info.html?id=${product.id}" class="info-button" data-id="${product.id}"><img src="./icon/info.svg" alt="more info"></a>
                    <button class="cart-button"><img class="item-cart" src="./icon/cart.svg" alt="add to cart"></button>
                </div>
            `;

            sections[1].innerHTML += html;
        } else if (product.category == "table"){
            let html;

            html = `
                <div class="product-item">
                <img class="item-img" src="${product.src}" alt="${product.name}">
                <h4 class="item-name">${product.name}</h4>
                <h3 class="item-price">${product.price}</h3>
                <a href="info.html?id=${product.id}" class="info-button" data-id="${product.id}"><img src="./icon/info.svg" alt="more info"></a>
                <button class="cart-button"><img class="item-cart" src="./icon/cart.svg" alt="add to cart"></button>
            </div>
            `;

            sections[3].innerHTML += html;
        }
    });
}

// Functions 
function cardsAnimation(e){
    let customer = e.target.children[2];
    customer.style.transform = 'translateY(0px)';
    customer.style.transition = '0.5s ease';
}

function removeCardsAnimation(e){
    let customer = e.target.children[2];
    customer.style.transform = 'translateY(10px)';
    customer.style.transition = '0.5s ease';
}

function addToCart(e){
    //create item to add to cart
    if(localStorage.getItem("products") !== null) {
        const products = JSON.parse(localStorage.getItem("products"));
        products.forEach(product => {
            //
            const cartDiv = document.createElement("div");
            cartDiv.classList.add("cart-item");
            //
            const itemImg = document.createElement("img");
            itemImg.src = product.src;
            itemImg.classList.add("cart-item-img");
            cartDiv.appendChild(itemImg);
            //
            const itemDesc = document.createElement("div");
            cartDiv.appendChild(itemDesc);
            //
            const itemName = document.createElement("h4");
            itemName.classList.add("item-name");
            itemName.textContent = product.name;
            itemDesc.appendChild(itemName);
            //
            const itemPrice = document.createElement("h4");
            itemPrice.classList.add("item-name");
            itemPrice.textContent = product.price;
            itemDesc.appendChild(itemPrice);
            //
            const cartBtn = document.createElement("button");
            cartBtn.classList.add("trash-button");
            cartDiv.appendChild(cartBtn);
            //
            const cart = document.createElement("img");
            cart.src = "./icon/trash.svg";
            cart.alt = "add to cart";
            cart.classList.add("item-cart");
            cartBtn.appendChild(cart);
            cartItemContainer.prepend(cartDiv);
            //reload page
        });
    }
    // if(localStorage.getItem("newProducts") !== null) {
    //     const newProducts = JSON.parse(localStorage.getItem("newProducts"));
    //     // cart.textContent = newProducts.length;
    //     newProducts.forEach(product => {
    //         //
    //         const cartDiv = document.createElement("div");
    //         cartDiv.classList.add("cart-item");
    //         //
    //         const itemImg = document.createElement("img");
    //         itemImg.src = product.src;
    //         itemImg.classList.add("cart-item-img");
    //         cartDiv.appendChild(itemImg);
    //         //
    //         const itemDesc = document.createElement("div");
    //         cartDiv.appendChild(itemDesc);
    //         //
    //         const itemName = document.createElement("h4");
    //         itemName.classList.add("item-name");
    //         itemName.textContent = product.name;
    //         itemDesc.appendChild(itemName);
    //         //
    //         const itemPrice = document.createElement("h4");
    //         itemPrice.classList.add("item-name");
    //         itemPrice.textContent = product.price;
    //         itemDesc.appendChild(itemPrice);
    //         //
    //         const cartBtn = document.createElement("button");
    //         cartBtn.classList.add("trash-button");
    //         cartDiv.appendChild(cartBtn);
    //         //
    //         const cart = document.createElement("img");
    //         cart.src = "./icon/trash.svg";
    //         cart.alt = "add to cart";
    //         cart.classList.add("item-cart");
    //         cartBtn.appendChild(cart);
    //         cartItemContainer.prepend(cartDiv);
    //     });
    //}
}

function addItemToLocalstorage(e){
    if(e.target.classList.contains("cart-button")){
        //item img
        const src = e.target.parentElement.children[0].src;
        //item name
        const name = e.target.parentElement.children[1].textContent;
        //item price
        const price = e.target.parentElement.children[2].textContent;
        //local storage
        let products;

        if(localStorage.getItem("products") === null){
            products = [];
        } else {
            products = JSON.parse(localStorage.getItem("products"));
        }
        products.push({src, name, price});
        // increase id up one
        localStorage.setItem("products", JSON.stringify(products));
        location.reload();        
    }
}

function removeFromCart (e) {
    if(e.target.classList.contains("trash-button")){
        if(localStorage.getItem("products") !== null) {
            let products = JSON.parse(localStorage.getItem("products"));
            let itemName = e.target.previousElementSibling.children[0];
            let newProducts = products.filter(product => product.name !== itemName.textContent);
            localStorage.setItem("newProducts", JSON.stringify(newProducts));
            // location.reload();
            localStorage.removeItem("products");
            // localStorage.removeItem("newProducts");
            //
            // const getNewProduct = JSON.parse(localStorage.getItem("newProducts"));
            // console.log(getNewProduct);
            location.reload();
        }
    }
}

async function getInfo(e){
    if(e.target.classList.contains("info-button")){
        // get id
        const id = e.target.getAttribute("data-id");
        const products = await getProducts();
        products.forEach(product => {
            if(product.id == id){
                if(localStorage.getItem("info") === null){
                    info = [];
                } else {
                    info = JSON.parse(localStorage.getItem("info"));
                }
                info.push(product);
                // increase id up one
                localStorage.setItem("info", JSON.stringify(info));
            }
        });
    }
}

function getCartTotal () {
    if(localStorage.getItem("products")) {
        cartTotal.textContent = JSON.parse(localStorage.getItem("products")).length;
    } else if (localStorage.getItem("newProducts")){
        cartTotal.textContent = JSON.parse(localStorage.getItem("newProducts")).length;
    }
}

function showInfo(e) {
    if(localStorage.getItem("info")) {
        const infos = JSON.parse(localStorage.getItem("info"));
        infos.forEach(info => {
            let html;
            html = `
                <div class="image">
                    <img src="${info.src}" data-type=${info.type} alt="${info.name}">
                </div>
                <div class="pricing">
                    <div class="desc">
                        <h4>${info.name}</h4>
                        <h4>${info.price}</h4>
                        <p>${info.category}</p>
                    </div>
                    <div class="colors">
                        <button class="color1 color"></button>
                        <button class="color2 color"></button>
                        <button class="color3 color"></button>
                    </div>
                    <p>${info.info}</p>
                    <div class="add-to-cart">
                        <button><img src="./icon/cart.svg" alt="add to cart"></button>
                        <p>+ Add to Cart</p>
                    </div>
                </div>
            `;
            itemInfo.innerHTML = html;
            // localStorage.removeItem("info");
        });
    }
    changeItemimage();
}

function removeInfoFromLocalstorage() {
    localStorage.removeItem("info");
}

function changeItemimage() {
    const buttons = document.querySelectorAll(".color");
    const image = document.querySelector(".image img");
    buttons.forEach(button => {
        const attribute = button.parentElement.parentElement.previousElementSibling.children[0];
        button.addEventListener("click", () => {
            if(button.classList.contains("color1")) {
                const type = attribute.getAttribute("data-type");
                image.src = type+"blue.png";
            } else if(button.classList.contains("color2")) {
                const type = attribute.getAttribute("data-type");
                image.src = type+"red.png";
            } else {
                const type = attribute.getAttribute("data-type");
                image.src = type+"yellow.png";
            }
        });
    });
}

//prodduc tabs

function toogleTab() {
    class Tabs {
        constructor(container){
            this.container = container;
            this.tabs = container.querySelectorAll(".trigger");
        }
        init(){
            this.tabs.forEach(tab => {
                tab.addEventListener("click", e=> {
                    this.toggleTabs(e);
                    this.toggleContent(e);
                })
            })
        }
        toggleTabs(e){
            //remove remove current active class from tabs
            this.tabs.forEach(tab => tab.classList.remove("active"));
            //add new active class
            e.target.classList.add("active");
        }
        toggleContent(e){
            //remove current active class from content
            this.container.querySelectorAll(".products").forEach(item => item.classList.remove("active"));
            //add active class from content
            const selector = e.target.getAttribute("data-target");
            const content = this.container.querySelector(selector);
            content.classList.add("active");
        }
    }

    const tabs = new Tabs(document.querySelector(".tabs"));
    tabs.init();

}