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
router.get('/:id/comments', (req, res) => {
	const { id } = req.params;
	Post.findPostComments(id)
		.then((post) => {
			if (post) {
				res.status(200).json(post);
			} else {
				res.status(404).json({
					message: `The post with the specified ID (${id}) does not exist`,
				});
			}
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({
				message: 'The comments information could not be retrieved',
			});
		});
});

// ?? POST ==> /api/posts ==> Create post ==> Return post object

router.post('/', async (req, res) => {
	const post = req.body;

	if (!post.title || !post.contents) {
		res.status(400).json({
			message: 'Please provide title and contents for the post',
		});
	} else {
		try {
			const newPost = await Post.insert(post);
			res.status(201).json(newPost);
		} catch (err) {
			console.log(err);
			res.status(500).json({
				message:
					'There was an error while saving the post to the database',
			});
		}
	}
});

// ?? PUT ==> /api/posts/:id ==> Update post ==> Return modified object
router.put('/:id', async (req, res) => {
	const { id } = req.params;
	const post = req.body;
	try {
		const updatedPost = await Post.update(id, post);
		if (post) {
			res.status(200).json(updatedPost);
		} else if (!post.title || !post.content) {
			res.status(400).json({
				message: 'Please provide title and contents for the post',
			});
		} else {
			res.status(404).json({
				message: `The post with the specified ID (${id}) does not exist`,
			});
		}
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: 'The post information could not be modified',
		});
	}
});

// ?? DELETE ==> /api/posts/:id ==> Remove post ==> Return removed post
router.delete('/:id', (req, res) => {
	Post.remove(req.params.id)
		.then((count) => {
			if (count > 0) {
				res.status(200).json({
					message: 'The post has been deleted',
				});
			} else {
				res.status(404).json({
					message: `The post with the specified ID (${req.params.id}) does not exist`,
				});
			}
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({
				message: 'The post could not be removed',
			});
		});
});

module.exports = router;
