// подключение express
var express = require('express');
const url = require('url');
const querystring = require('querystring');
// создаем объект приложения
var app = express();
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(readParametrs);
app.use(countTime);
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

app.get("/getList", function (request, response, countTime) {
	var list = require("./data/list");
	response.json(list);
	countTime();
});

app.get("/getListItemById/:id", function (request, response) {
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
	const NS_PER_SEC = 1e9;
	var start = process.hrtime();
	var startDate = new Date();
	//console.log("start : ", start);  /*Что есть время старта????*/
	console.log(`Bench start ${start[1] * 1e-6} miliseconds`);

	setTimeout(function () {
		console.log("Ending");
		var end = process.hrtime(start);
		var endHr = process.hrtime();
		console.log(`Bench end ${endHr[1] * 1e-6}`)
		console.log(`Pure time ${end[1] * 1e-6} miliseconds`);
		console.log('**********************************************************************')
		//console.log(`Benchmark took ${end[1] * NS_PER_SEC} nanoseconds`);
		//[seconds, nanoseconds]

	}, 1000);
	next();
}

function readParametrs(request, response, next) {
	let result = {};
	result.path = request.path;
	result.querystring = request.query;
	console.log("Result : ", result);
	console.log('*******************************************************************');
	next();
}

// начинаем прослушивать подключения на 3000 порту
const port = process.env.port || 3000;
app.listen(3000, () => console.log(`listening ${port}...`));