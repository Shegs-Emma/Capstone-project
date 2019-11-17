const { Pool, Client }      = require('pg');

      
const connectionString = 'postgressql://postgres:M@rch041992P@localhost:5432/capstone_project';

const client = new Client({
    connectionString: connectionString
});

client.connect();




exports.createArticle = (req, res, next)=>{
    const query = {
        text: 'INSERT INTO articles(article_body, user_id) VALUES($1, $2)',
        values: ['jbj hvhg vcgs jbjh vs gjdhgfhjgds sdcdbvjhgsc sxcjhv', 3],
    }

    client.query(query, (err, res)=>{
        if(err) throw err;
        console.log(res);
        
        client.end();
    });
    res.end();
};



exports.editArticle = (req, res, next)=>{

};


exports.deleteArticle = (req, res, next)=>{

};

exports.commentArticle = (req, res, next)=>{

};

exports.allArticles = (req, res, next)=>{

};

exports.oneArticle = (req, res, next)=>{

};