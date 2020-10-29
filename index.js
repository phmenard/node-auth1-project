const express = require("express")
const helmet = require("helmet")
const cors = require("cors")
const session = require("express-session")
const KnexSessionStore = require("connect-session-knex")(session)
const db = require("./database/config")
const usersRouter = require("./users/users-router")

const server = express()
const port = process.env.PORT || 5000

server.use(helmet())
server.use(cors())
server.use(express.json())

server.use(session({
	resave: false,
	saveUninitialized: false,
	secret: process.env.SESSION_KEY || "hello world",
	store: new KnexSessionStore({
		knex: db, // configured instance of knex
		createtable: true, // if the table does not exist, it will create it automatically
	}),
}))

server.use("/api", usersRouter)

server.use((err, req, res, next) => {
	console.log(err)
	
	res.status(500).json({
		message: "Something went wrong",
	})
})

server.listen(port, () => {
	console.log(`Running at http://localhost:${port}`)
})
