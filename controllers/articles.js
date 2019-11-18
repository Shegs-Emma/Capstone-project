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


    const query = {
        text: 'INSERT INTO articles(article_body, user_id) VALUES($1, $2)',
        values: [article, userId],
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

};

exports.commentArticle = (req, res, next)=>{

};

exports.allArticles = (req, res, next)=>{

};

exports.oneArticle = (req, res, next)=>{

};