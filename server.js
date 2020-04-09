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
	const message = process.env.DEPLOYED || `I'M DEPLOYED ON HEROKU! `;
	res.status(200).json({ message });
});

//custom middleware

function logger(req, res, next) {
	console.log(`${req.method} Request to ${req.originalUrl}`);

	next();
}

module.exports = server;
