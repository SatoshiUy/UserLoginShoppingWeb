const container = document.querySelector(".history-container");


const loadHistory = async () => {
    const rawUser = await fetch('https://61814ec932c9e20017804764.mockapi.io/users?token=' + window.localStorage.getItem("UAT"));
    const users = await rawUser.json();
    const rawHistory = await fetch('https://61814ec932c9e20017804764.mockapi.io/history?userId='+users[0].id+'&sortBy=date&order=desc');
    const history = await rawHistory.json();

        console.log(history.length);
    for (let i=0; i<history.length; i++){
        loadTransaction(history[i].id, history[i].date, history[i].productId, history[i].money);
        // console.log(history[i].id, history[i].date, history[i].productId, history[i].money);
    }
}

const checkLogin = async() => {
    if (!window.localStorage.getItem("UAT")){
        window.location.assign("login.html");
    } else {
        
    }
}

const loadTransaction = async(id, date, productId, money) => {
    

    console.log(updateProducts);
    // date
    // money

    // in san pham

    for (var i = 0; i < 4; i++){
        const rawProduct = await fetch("https://61814ec932c9e20017804764.mockapi.io/products?id="+productId[i]);
        const product = await rawProduct.json();
        let newElement = document.createElement("li");
        newElement.classList.add("header__cart-item");
        
        container.appendChild(newElement);
        console.log(newElement);
    }
 
    // append



    // var div = document.createElement("div");
    // div.setAttribute("class", "history-img");
    // div.style.backgroundImage = 'url("'+product[0].src+'")';
    // container.appendChild(div);

    // var div = document.createElement("div");
    // div.setAttribute("class", "history-name");
    // var text = document.createTextNode(product[0].name);
    // div.appendChild(text);
    // container.appendChild(div);

    // var div = document.createElement("div");
    // div.setAttribute("class", "history-quantity");
    // var text = document.createTextNode(quantity);
    // div.appendChild(text);
    // container.appendChild(div);

    // var div = document.createElement("div");
    // div.setAttribute("class", "history-date");
    // var text = document.createTextNode(date);
    // div.appendChild(text);
    // container.appendChild(div);

}

function start(){
    checkLogin();
    loadHistory();
}

start();