const macBox = document.getElementsByClassName("mac-box")[0];
const iphoneBox = document.getElementsByClassName("iphone-box")[0];
const ipadBox = document.getElementsByClassName("ipad-box")[0];
const cartList = document.getElementsByClassName("header__cart-list-item")[0];
var totalBox = document.getElementsByClassName("total")[0];

var products,updateProducts;
// open cart
const cartOpen = document.getElementsByClassName("header__cart-icon")[0];
cartOpen.addEventListener("click",function(event){
    let open = document.getElementsByClassName("header__cart-list")[0];
    open.classList.add("cart-open");
    updateCart();
    event.stopPropagation();
});
// close cart
const cartClose = document.getElementsByClassName("close-icon")[0];
cartClose.addEventListener("click",function(event){
    let close = document.getElementsByClassName("header__cart-list")[0];
    close.classList.remove("cart-open");
    event.stopPropagation();
});

// read json
const readJson = async () => {
	const response = await fetch('https://61814ec932c9e20017804764.mockapi.io/products');
	const myJson = await response.json(); //extract JSON from the http 
    products = myJson; // get products information
	getJsonData(myJson);
}

function getJsonData(data){
    for (var i=0;i<data.length;i++){
        addProductToWeb(data[i]);
    }
}

function addProductToWeb(object){
    let product = eval(object.des+"Box").getElementsByClassName("product")[0];
    let newElement = document.createElement("div");
    newElement.classList.add("product-item")
    
    newElement.innerHTML=`
        <div class="product-img">  <a href=""><image class="product-img" src="${object.src}"></image></a></div>
        <div class="product-name"><a href="">${object.name}</a></div>
        <div class="produc-price">${formatMoney(object.price) + "đ"}<span class="discount">(- 25%)</span></div>
        <div class="add" onclick="showSuccessToast();" id="${object.id}"><a class="btn-cart">ADD</a></div>
    `;
    // add to cart when we click "add"
    newElement.getElementsByClassName("add")[0].addEventListener("click", function() {
        addToCart(this.id);
    });

    product.appendChild(newElement);
}

const checkLogin = async () => {
    if (!window.localStorage.getItem("UAT")){
        window.location.assign("login.html");
    } else {
        // get User
        
    }
}

function logout(){
    window.localStorage.removeItem("UAT");
    window.location.assign("login.html");
}

// money_format
function formatMoney(x){
    let parts ="";
    let stringx = x.toString();
    let leng = x.toString().length;
    let count;
    if (leng%3==0) count=0;
    else if (leng%3==1) count=2;
    else if (leng%3==2) count=1;
    for (var i = 0; i < leng; i++){
        if (count==3){
            parts+=",";
            count=0;
        }
        parts+=stringx[i];
        count+=1;
    }
    return parts;
}

function addToCart(productId) {
    // test
    // console.log(productId);

    // them len api fetch
    apiCart(productId);
    // 
    updateCart();
}

const apiCart = async (productId) => {
    // get cart information from user
    const response = await fetch('https://61814ec932c9e20017804764.mockapi.io/users?token=' + window.localStorage.getItem("UAT"));
    let user = await response.json(); //extract JSON from the http response
    let newCart = user[0].cart;
    
    // check and add product if productId has not in cart then add key(productId)
    if (!(productId in newCart)){
        newCart[productId] = 1;
    }
    else{
        newCart[productId] += 1;
    }

    // update cart to Mock API
    const response2 = await fetch('https://61814ec932c9e20017804764.mockapi.io/users/'+ user[0].id, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
           },
        body: JSON.stringify({
            cart: newCart,
        })
    })

    // test case
    // console.log(user, products);
    //console.log(newCart);

}

const updateCart = async () => {
    const response = await fetch('https://61814ec932c9e20017804764.mockapi.io/users?token=' + window.localStorage.getItem("UAT"));
    let user = await response.json(); //extract JSON from the http response
    // console.log(user[0].cart);
    // reset cart
    cartList.innerHTML = ``;
    updateProducts = user[0].cart;
    printItemCart();
}

function printItemCart(){
    let total = 0;
    for (item in updateProducts){
        let id = item;
        let quantity = updateProducts[item];
        let temp;
        // test case
        // console.log(id, quantity);
        // console.log(products.length);

        // check id to get product and add html
        for (var i = 0; i < products.length ; i++){
            if (id === products[i].id){
                temp = products[i];
                // total
                total += temp.price*quantity;

                // create cart box items
                let newElement = document.createElement("li");
                newElement.classList.add("header__cart-item");
                newElement.innerHTML=`<img
                      src="${temp.src}"
                      alt=""
                      class="header__cart-img"
                    />
                    <span class="header__cart-name">
                      <div class="cart-title">${temp.name}</div>
                      <div class="cart-price">
                          <div>${formatMoney(temp.price) + "đ"}</div>
                          <div> x ${quantity}</div>
                          <div> = ${formatMoney(temp.price*quantity) + "đ"}</div>
                      </div>
                    </span>
                    <div class="header__cart-del" id="${temp.id}">
                      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z"/></svg>
                    </div>
                `;
                let deleteBox = newElement.getElementsByClassName("header__cart-del")[0];
                deleteBox.addEventListener("click",function(e){
                    deleteProduct(this.id);
                });
                cartList.appendChild(newElement);
            }
        }
        // print total
        totalBox.innerHTML = formatMoney(total) + "đ";
    }
}

const deleteProduct = async (product) => {
    // get cart information from user
    const response = await fetch('https://61814ec932c9e20017804764.mockapi.io/users?token=' + window.localStorage.getItem("UAT"));
    let user = await response.json(); //extract JSON from the http response
    const newCart = user[0].cart;
    delete newCart[product];

    // update cart to Mock API
    const response2 = await fetch('https://61814ec932c9e20017804764.mockapi.io/users/'+ user[0].id, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
           },
        body: JSON.stringify({
            cart: newCart,
        })
    })
    location.reload();
}
function toast(object)  {
    const main = document.getElementById('toast');
    if (main) {
        const toast = document.createElement('div');
        // auto close
        const autoClose = setTimeout(function(){
            main.removeChild(toast);
        },object.duration + 1000);
        // close when clicked
        toast.onclick = function(e){
            if (e.target.closest(".toast__close")) {
                main.removeChild(toast);
                clearTimeout(autoClose);
            }
        }
        const icons = {
            success: 'fa-check-circle'
        };
        const icon = icons[object.type];
        const delay = (object.duration / 1000).toFixed(2);
        toast.classList.add('toast',`toast--${object.type}`);
        toast.style.animation = `slideInLeft ease 0.5s , fadeOut linear 1s ${delay}s forwards`;
        toast.innerHTML=`
            <div class="toast__icon">
                <i class="fas ${icon}"></i>
            </div>
            <div class="toast__body">
                <h3 class="toast__title">${object.title}</h3>
                <p class="toast__msg">${object.messenger}</p>
            </div>
            <div class="toast__close">
                <i class="fas fa-times"></i>
            </div>
        `;
        main.appendChild(toast);
    }
}

function showSuccessToast() {
    toast({
        title: 'Success',
        messenger: 'Add To Cart Successful',
        type: 'success',
        duration: 5000
});
}


function start(){
    checkLogin();
    readJson();
    updateCart();
}
window.onload = start;