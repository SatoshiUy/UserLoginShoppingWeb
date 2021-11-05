const login = async () => {
	var username = document.getElementById("username").value;
	var password = document.getElementById("password").value;
	var notify = document.getElementById("notify");
	console.log(notify);
	if (!username || !password){
		notify.innerHTML = "username and password are required";
		return;
	} else {
		const response = await fetch('https://61814ec932c9e20017804764.mockapi.io/users?username='+ username + '&password=' + password);
		const users = await response.json();
console.log(users);
		if (users[0].password!==password){
			notify.innerHTML = "username and/or password is incorrect";
			return;
		} else {
			window.localStorage.setItem("UAT", users[0].token);
			window.location.assign("index.html");
		}
	}
}