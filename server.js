const express = require('express');

const postRouter = require('./posts/postRouter');
const userRouter = require('./users/userRouter');

const server = express();

//calling middleware
server.use(logger);
server.use(express.json());

server.use('/api/user', userRouter);
server.use('/api/posts', postRouter);

server.get('/', (req, res) => {
	res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
	console.log(`${req.method} Request to ${req.originalUrl}`);

	next();
}

module.exports = server;
