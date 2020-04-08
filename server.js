const express = require('express');

const postRouter = require('./posts/postRouter.js');
const userRouter = require('./users/userRouter');

const server = express();

//calling middleware
server.use(logger);

server.use('/api/user', userRouter);
server.use('/api/post', postRouter);

server.get('/', (req, res) => {
	res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
	console.log(`${req.method} Request to ${req.originalUrl}`);

	next();
}

module.exports = server;
