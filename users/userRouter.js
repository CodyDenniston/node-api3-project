const express = require('express');

const Users = require('./userDb.js');

const router = express.Router();

router.post('/', (req, res) => {
	// do your magic!
});

router.post('/:id/posts', (req, res) => {
	// do your magic!
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

router.get('/:id', (req, res) => {
	// do your magic!
});

router.get('/:id/posts', (req, res) => {
	// do your magic!
});

router.delete('/:id', (req, res) => {
	// do your magic!
});

router.put('/:id', (req, res) => {
	// do your magic!
});

//custom middleware

function validateUserId(userID) {
	return function (req, res, next) {
		const { id } = req.params.id;
		if (id === userID) {
			userID = req.user;

			next();
		} else {
			res.status(400).json({ message: 'ID DOES NOT MATCH' });
		}
	};
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
	if (req.body) {
		next();
	} else if ((req.body = undefined)) {
		res.status(400).json({ message: 'missing post data' });
	} else if ((req.body.name = undefined)) {
		res.status(400).json({ message: 'missing required text field' });
	}
}

module.exports = router;
