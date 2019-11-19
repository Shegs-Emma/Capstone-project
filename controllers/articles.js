const Pool              = require('pg').Pool;

const pool = new Pool ({
    user: 'postgres',
    host: 'localhost',
    database: 'capstone_project',
    password: process.env.DATABASE_PW,
    port: 5432
});




exports.createArticle = (req, res, next)=>{
    const article = req.body.article;
    const userId = req.body.userId;
    const tag = req.query.tag;


    const query = {
        text: 'INSERT INTO articles(article_body, user_id, tags) VALUES($1, $2, $3)',
        values: [article, userId, tag],
    }

    pool.query(query).then(
        (response)=>{
            res.status(201).json({response});
            pool.end();
        }
    ).catch((error)=>{
        res.status(500).json({
            error: 'Something went wrong'
        });
    })
};



exports.editArticle = (req, res, next)=>{
    const id = parseInt(req.params.id);
    const article = req.body.article;
    const userId = parseInt(req.body.userId);


    const query = {
        text: `SELECT article_body, user_id FROM articles WHERE id = ${id}`
    }

    pool.query(query).then(
        (response)=>{
            const userID = response.rows[0].user_id;
            
            if(userID === userId){
                const query = {
                    text: 'UPDATE articles SET article_body = $1 WHERE user_id = $2',
                    values: [article, userID],
                }
                pool.query(query).then(
                    (results)=>{
                        res.status(201).json({results});
                        pool.end();
                    }
                ).catch((error)=>{
                    console.log(error);
                    res.status(500).json({
                        error: 'Something went wrong'
                    });
                })
            }
        }
    ).catch((error)=>{
        res.status(500).json({
            error: 'User with that Id does not exist'
        });
    })    

};


exports.deleteArticle = (req, res, next)=>{
    const id = parseInt(req.params.id);

    const query = {
        text: `DELETE FROM articles WHERE id = ${id}`,
    }

    pool.query(query).then(
        (response)=>{
            console.log(response);
            res.status(200).send(`User deleted with ID: ${id}`);
            pool.end();
        }
    ).catch((error)=>{
        res.status(500).json({
            error: 'Something went wrong'
        });
    })
};

exports.commentArticle = (req, res, next)=>{
    const commentBody = req.body.commentBody;
    const articleId = req.body.articleId;


    const query = {
        text: 'INSERT INTO comment_s (comment_body, article_id) VALUES($1, $2)',
        values: [commentBody, articleId],
    }

    pool.query(query).then(
        (response)=>{
            res.status(201).json({response});
            pool.end();
        }
    ).catch((error)=>{
        
        res.status(500).json({
            error: 'Something went wrong'
        });
    })
};

exports.allArticles = (req, res, next)=>{

    const query = {
        text: 'SELECT * FROM articles ORDER BY created_at DESC',
    }

    pool.query(query).then(
        (response)=>{
            
            res.status(200).json(response.rows);
            pool.end();
        }
    ).catch((error)=>{
        res.status(500).json({
            error: 'Something went wrong'
        });
    })
};

exports.oneArticle = (req, res, next)=>{
    const id = parseInt(req.params.id);

    const query = {
        text: `SELECT * FROM articles WHERE id = ${id}`,
    }

    pool.query(query).then(
        (response)=>{
            
            res.status(200).json({
                id : response.rows[0].id,
                article : response.rows[0].article_body,
                UserId : response.rows[0].user_id,
                time : response.rows[0].created_at,
            });
            pool.end();
        }
    ).catch((error)=>{
        res.status(500).json({
            error: 'Something went wrong'
        });
    })
};


// Note
// To solve my query issues, i did  ot have to hard code it
// i just pulled it out with req.query. Then send it in from 
// post man using the ?tag=spirit