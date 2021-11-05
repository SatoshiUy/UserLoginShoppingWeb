const container = document.querySelector(".history-container");
const productObj = {
  MA29: 1,
  MP1666: 2,
  MP1340: 3,
  IPP35: 4,
  IP13: 5,
  IPM20: 6,
  IPB10: 7,
  IP13PM: 8,
  IP13P: 9,
  IP12PM: 10,
};

const loadHistory = async () => {
  const rawUser = await fetch(
    "https://61814ec932c9e20017804764.mockapi.io/users?token=" +
      window.localStorage.getItem("UAT")
  );
  const users = await rawUser.json();
  const rawHistory = await fetch(
    "https://61814ec932c9e20017804764.mockapi.io/history?userId=" +
      users[0].id +
      "&sortBy=date&order=desc"
  );
  const history = await rawHistory.json();
  const rawProductInfo = await fetch(
    "https://61814ec932c9e20017804764.mockapi.io/products?"
  );
  const productInfo = await rawProductInfo.json();

  console.log(history.length);
  for (let i = 0; i < history.length; i++) {
    loadTransaction(
      history[i].date,
      history[i].productId,
      history[i].money,
      productInfo
    );
  }
};

function checkLogin() {
  if (!window.localStorage.getItem("UAT")) {
    window.location.assign("login.html");
  }
}

function loadTransaction(date, products, money, productsInfo) {
  // date
  var dateMoney = document.createElement("div");
  dateMoney.setAttribute("class", "history-date-money");
  dateMoney.innerHTML = `
        <div class="history-date">DATE: ${date} </div>
        <div class="history-money">Total: ${formatMoney(money) + "đ"} </div>
    `;
  container.appendChild(dateMoney);
  // print cart
  const productIds = Object.keys(products);
  for (let i = 0; i < productIds.length; i++) {
    var productInfo = productsInfo[productObj[productIds[i]] - 1];
    var item = document.createElement("div");
    item.setAttribute("class", "history-item");
    item.innerHTML = `
            <div class="history-img" style="background-image: url('${
              productInfo.src
            }');"></div>
            <div class="history-name">${productInfo.name}</div>
            <div class="history-quantity">${products[productIds[i]]}</div>
            <div class="history-price">${
              formatMoney(productInfo.price) + "đ"
            }</div>
        `;
    container.appendChild(item);
  }
}

function formatMoney(x) {
  let parts = "";
  let stringx = x.toString();
  let leng = x.toString().length;
  let count;
  if (leng % 3 == 0) count = 0;
  else if (leng % 3 == 1) count = 2;
  else if (leng % 3 == 2) count = 1;
  for (var i = 0; i < leng; i++) {
    if (count == 3) {
      parts += ",";
      count = 0;
    }
    parts += stringx[i];
    count += 1;
  }
  return parts;
}

function start() {
  checkLogin();
  loadHistory();
}

start();
