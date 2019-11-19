const express       = require('express'),
      router        = express.Router(),
      auth          = require('../middleware/auth'),
      articleCtrl   = require('../controllers/articles');



//Write or share articles on subjects of interest
router.post('/articles', articleCtrl.createArticle);



//Edit their articles
router.put('/articles/:id', auth, articleCtrl.editArticle);


//Delete their articles
router.delete('/articles/:id', auth, articleCtrl.deleteArticle);



//Comment on other people's article's posts
router.post('/articles/comments', articleCtrl.commentArticle);



//View all articles showing the most recent first
router.get('/articles', auth, articleCtrl.allArticles);



//View a specific article
router.get('/articles/:id', auth, articleCtrl.oneArticle);

module.exports = router;