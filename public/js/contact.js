"use strict";
(() => {

	const name = document.querySelector("#name");
	const email = document.querySelector("#email");
	const phone = document.querySelector("#phone");
	const message = document.querySelector("#message");
	const sendMessageBtn = document.querySelector("#sendMessageButton");

	let data = {};
	const xhr = new XMLHttpRequest();

	sendMessageBtn.addEventListener("click", e => {
		e.preventDefault();

		data.name = name.value;
		data.phone = phone.value;
		data.message = message.value;
		data.email = email.value;

		let json = JSON.stringify(data);

		xhr.open("POST", "contact");
		xhr.setRequestHeader("Content-type", "application/json; charset=utf-8")
		xhr.send(json)

		xhr.onreadystatechange = () => {
			if (xhr.readyState === 4 && xhr.status == 200) {
				window.location.pathname = "/";
				alert(xhr.status + " Data saved");
			}
			else {
				console.log(xhr.status + ': ' + xhr.responseText);
			}
		}
	})
})()
