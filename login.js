const login = async () => {
	console.log("run");
	var username = document.getElementById("username").value;
	var password = document.getElementById("password").value;
	const response = await fetch('https://61814ec932c9e20017804764.mockapi.io/users?username='+ username + '&password=' + password);
	const myJson = await response.json(); //extract JSON from the http response
	window.localStorage.setItem("UAT", myJson[0].token);
	window.location.assign("index.html");
}


