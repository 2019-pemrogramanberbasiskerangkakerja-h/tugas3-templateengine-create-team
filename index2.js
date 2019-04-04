const express = require('express')
const Liquid = require('liquidjs')

const app = express()
const engine = new Liquid({
	root: __dirname, // for layouts and partials
  	extname: '.liquid'
})

app.engine('liquid', engine.express()) // register liquid engine
app.set('views', ['./views']) // specify the views directory
app.set('view engine', 'liquid') // set to default

app.get('/', function (req, res) {
  	const todos = ['fork and clone', 'make it better', 'make a pull request', 'looping']
  	res.render('todolist', {
    	todos: todos,
    	title: 'Welcome to liquidjs!'
  	})
})

app.get("/today", (req, res) => {

    let today = new Date();
    res.render("show_date", {now: today});
    res.render("derived", { content: 'Some content' });
});

app.get("/name", (req, res) => {

    ctx = { users: [{ name: "Ivan", age: 22 }, { name: "Joshua", age: 21 }] };
    res.render("users", ctx);
});

app.use((req, res) => {
    res.statusCode = 404;
    res.end("404 - page not found");
});

module.exports = app