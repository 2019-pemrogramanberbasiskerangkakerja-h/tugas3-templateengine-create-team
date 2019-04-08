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
  	const todos = ['Fork and clone', 'Make it better', 'Make a pull request', 'Looping']
  	res.render('todolist', {
    	todos: todos,
    	title: 'Welcome!'
  	})
})

app.get("/today", (req, res) => {

    let today = new Date();
    res.render("show_date", {
      now: today,
      title: 'Today!'
    })
    // res.render("derived", { content: 'Some content' })
})

app.get('/name', (req, res) => {

    users = [{ name: 'Ivan Agung', age: 22 }, { name: 'Joshua Resamuel', age: 21 }]
    res.render('users', {
      users: users,
      title: 'Active Users!'
    })
})

app.use((req, res) => {
    res.statusCode = 404
    res.end("404 - page not found")
})

module.exports = app