const express = require('express');

const Posts = require('./postDb.js');

const router = express.Router();

router.get('/', (req, res) => {
	Posts.get()
		.then((posts) => {
			res.status(200).json(posts);
		})
		.catch((err) => {
			res
				.status(500)
				.json({ message: 'There was an error retrieving the posts' });
		});
});

router.get('/:id', validatePostId, (req, res) => {
	Posts.getById(req.params.id)
		.then((id) => {
			res.status(200).json(id);
		})
		.catch((err) => {
			res
				.status(500)
				.json({ message: 'there was an error retrieving post by id' });
		});
});

router.delete('/:id', validatePostId, (req, res) => {
	Posts.remove(req.params.id)
		.then((post) => {
			res
				.status(201)
				.json({ message: 'The post was succesully removed from the database' });
		})
		.catch(() => {
			res.status(500).json({
				message: 'There was an error removing the post from the database',
			});
		});
});

router.put('/:id', validatePostId, (req, res) => {
	Posts.update(req.params.id, req.body)
		.then(() => {
			Posts.getById(req.params.id).then((post) => {
				res.status(201).json(post);
			});
		})
		.catch(() => {
			res.status(500).json({ message: 'There was an error updating the post' });
		});
});

// custom middleware

function validatePostId(req, res, next) {
	Posts.getById(req.params.id)
		.then((post) => {
			if (post) {
				next();
			} else {
				res.status(404).json({ message: 'post not found' });
			}
		})
		.catch(() => {
			res.status(500).json({
				message: 'There was an error fetching the post from the database',
			});
		});
}

module.exports = router;
