const Pool              = require('pg').Pool;

const pool = new Pool ({
    user: 'postgres',
    host: 'localhost',
    database: 'capstone_project',
    password: process.env.DATABASE_PW,
    port: 5432
});



exports.createGif = (req, res, next)=>{
    const gifUrl = req.body.gifUrl;
    const gifId = req.body.uId;

    const query = {
        text: 'INSERT INTO gifs(gif_url, user_id) VALUES($1, $2)',
        values: [gifUrl, gifId],
    }

    pool.query(query).then(
        (results)=>{
            res.status(201).json({results});
            pool.end();
        }
    ).catch((error)=>{
        res.status(500).json({
            error: 'Something went wrong'
        });
    })
};


exports.deleteGif = (req, res, next)=>{
    const id = parseInt(req.params.id);

    const query = {
        text: `DELETE FROM gifs WHERE user_id = ${id}`,
    }

    pool.query(query, (error, response) => {
        if (error) throw error;

        res.status(200).send(`User deleted with ID: ${id}`);
        pool.end();
    });
};

exports.gifComments = (req, res, next)=>{
    const commentBody = req.body.commentBody;
    const gifId = req.body.gifId;


    const query = {
        text: 'INSERT INTO comment_s (comment_body, gif_id) VALUES($1, $2)',
        values: [commentBody, gifId],
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