const express = require('express');

const Users = require('./userDb.js');
const Posts = require('../posts/postDb.js');

const router = express.Router();

router.post('/', validateUser, (req, res) => {
	console.log(req.body);
	Users.insert(req.body)
		.then((user) => {
			res.status(201).json(user);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({
				message: 'there was an error adding user',
			});
		});
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
	Posts.insert({
		...req.body,
		user_id: req.params.id,
	})
		.then((newPost) => {
			res.status(201).json(newPost);
		})
		.catch(() => {
			res
				.status(500)
				.json({ message: 'There was an error adding a post to the database' });
		});
});

router.get('/', (req, res) => {
	Users.get()
		.then((users) => {
			res.status(200).json(users);
		})
		.catch((err) => {
			res.status(500).json({ message: 'Error retrieving the users' });
		});
});

router.get('/:id', validateUserId, (req, res) => {
	Users.getById(req.params.id)
		.then((user) => {
			if (user) {
				res.status(200).json(user);
			} else {
				res.status(404).json({ message: 'user not found' });
			}
		})
		.catch((error) => {
			// log error to server
			console.log(error);
			res.status(500).json({
				message: 'Error retrieving the user',
			});
		});
});

router.get('/:id/posts', (req, res) => {
	Users.getUserPosts(req.params.id)
		.then((post) => {
			res.status(200).json(post);
		})
		.catch((err) => {
			res.status(500).json({
				message: 'Error getting post from the user',
			});
		});
});

router.delete('/:id', validateUserId, (req, res) => {
	Users.remove(req.params.id)
		.then(() => {
			res
				.status(201)
				.json({ message: 'The user was succesully removed from the database' });
		})
		.catch(() => {
			res.status(500).json({
				message: 'There was an error removing the user from the database',
			});
		});
});

router.put('/:id', validateUserId, (req, res) => {
	Users.update(req.params.id, req.body)
		.then(() => {
			Users.getById(req.params.id).then((user) => {
				res.status(201).json(user);
			});
		})
		.catch(() => {
			res.status(500).json({ message: 'There was an error updating the user' });
		});
});

//custom middleware

function validateUserId(req, res, next) {
	Users.getById(req.params.id)
		.then((user) => {
			if (user) {
				next();
			} else {
				res.status(404).json({ message: 'User not found' });
			}
		})
		.catch(() => {
			res.status(500).json({
				message: 'There was an error fetching the user from the database',
			});
		});
}

function validateUser(req, res, next) {
	// do your magic!
	if (req.body) {
		next();
	} else if ((req.body = undefined)) {
		res.status(400).json({ message: 'missing user data' });
	} else if ((req.body.name = undefined)) {
		res.status(400).json({ message: 'missing required name field' });
	}
}

function validatePost(req, res, next) {
	if (!req.body) {
		res.status(400).json({ message: 'missing post data' });
	}
	if (!req.body.text) {
		res.status(400).json({ message: 'missing required text field' });
	}
	next();
}

module.exports = router;
