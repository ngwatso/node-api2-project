// !! implement your posts router here
const router = require('express').Router();

const Post = require('./posts-model');

// ** Post Endpoints

// ?? GET ==> /api/posts ==> Return array of all post objects
router.get('/', (req, res) => {
	Post.find()
		.then((posts) => {
			res.status(200).json(posts);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({
				message: 'The posts information could not be retrieved',
			});
		});
});

// ?? GET ==> /api/posts/:id ==> Return post object with specified id
router.get('/:id', (req, res) => {
	Post.findById(req.params.id)
		.then((post) => {
			if (post) {
				res.status(200).json(post);
			} else {
				res.status(404).json({
					message: `The post with the specified ID (${req.params.id}) does not exist`,
				});
			}
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({
				message: 'The post information could not be retrieved',
			});
		});
});

// ?? GET ==> /api/posts/:id/comments ==> Return array of comment objects

// ?? POST ==> /api/posts ==> Create post ==> Return post object

// ?? PUT ==> /api/posts/:id ==> Update post ==> Return modified object

// ?? DELETE ==> /api/posts/:id ==> Remove post ==> Return removed post

module.exports = router;