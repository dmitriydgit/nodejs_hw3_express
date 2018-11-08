// подключение express
var express = require('express');
const url = require('url');
const querystring = require('querystring');
// создаем объект приложения
var app = express();
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(readParametrs);
//app.use(countTime);
app.set("views", __dirname + "/views");
app.set("view engine", "hbs");


// определяем обработчик для маршрута "/"
app.get("/", function (request, response) {
	// отправляем ответ
	response.render("index", { foo: "bar" });
});
app.get("/index", function (request, response) {
	// отправляем ответ
	response.render("index", { foo: "bar" });
});
app.get("/about", function (request, response) {
	response.render("about", { foo: "bar" });
});
app.get("/post", function (request, response) {
	response.render("post", { foo: "bar" });
});
app.get("/contact", function (request, response) {
	response.render("contact", { foo: "bar" });
});

app.get("/post-data", function (request, response) {
	const post = require("./data/post");
	response.json(post);
});

app.get("/getList", countTime, function (request, response, countTime) {
	var list = require("./data/list");
	response.json(list);
	//countTime();
});

app.get("/getListItemById/:id", countTime, function (request, response) {
	var list = require("./data/list")
	var query = { _id: request.params.id };
	var result = list.find(item => {
		return item.id == query._id
	})
	response.end(JSON.stringify(result));
});




app.post("/contact", (req, res) => {
	let user = req.body;
	if (user.name && user.email && user.phone && user.message) {
		res.status(200).end();
	} else {
		res.status(404).res.send(" Заполните все поля").res.end();
	}
});

function countTime(request, response, next) {
	console.log("Starting");
	var start = process.hrtime();
	const startMs = (start[0] * 1000 + start[1] / 1000000).toFixed(2);
	console.log(`Started: ${request.originalUrl} at ${startMs} miliseconds`);

	request.on('end', () => {
		setTimeout(function () {
			console.log("Ending");
			var end = process.hrtime(start);
			const endMs = (end[0] * 1000 + end[1] / 1000000).toFixed(2);
			console.log(end);
			console.log(`Pure time requested ${request.originalUrl} took ${endMs} miliseconds`);
			console.log('**********************************************************************')
		}, 1000);
	})

	next();
}

function readParametrs(request, response, next) {
	let result = {};
	result.path = request.path;
	result.querystring = request.query;
	console.log('*******************************************************************');
	console.log("Params : ", request.query);

	console.log("Result : ", result);
	console.log('*******************************************************************');
	next();
}

// начинаем прослушивать подключения на 3000 порту
const port = process.env.port || 3000;
app.listen(3000, () => console.log(`listening ${port}...`));

//getListItemById
//getList
//http://localhost:3000/getListItemById/?params=5