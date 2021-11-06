const login = async () => {
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  var notify = document.getElementById("notify");
  var testEr = "Username Or Password Is Incorrect";

  if (!username || !password) {
    notify.innerHTML = "Username And Password Are Required";
    return;
  } else {
    const response = await fetch(
      "https://61814ec932c9e20017804764.mockapi.io/users?username=" +
        username +
        "&password=" +
        password
    );
    const users = await response.json();

    try {
      if (users[0].password !== password) {
        notify.innerHTML = `${testEr}`;
        return;
      } else {
        testEr = 0;
        window.localStorage.setItem("UAT", users[0].token);
        window.location.assign("index.html");
      }
    } catch (err) {
      notify.innerHTML = `${testEr}`;
    }
  }
};
