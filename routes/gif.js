const express           = require('express'),
      router            = express.Router(),
      auth              = require('../middleware/auth'),
      gifControl        = require('../controllers/gif');

//Create and share gifs by employee
router.post('/', auth, gifControl.createGif);


//Delete their gifs
router.delete('/:id', auth, gifControl.deleteGif);

//Comment on other people's gif posts
router.post('/comments', auth, gifControl.gifComments);


module.exports = router;