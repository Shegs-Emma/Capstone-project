const express               = require('express'),
      app                   = express(),
      bodyParser            = require('body-parser');
      bcrypt                = require('bcrypt'),
      { Pool, Client }      = require('pg');


const connectionString = 'postgressql://postgres:M@rch041992P@localhost:5432/capstone_project';

const client = new Client({
    connectionString: connectionString
});

client.connect();

app.use(bodyParser.urlencoded({extended: true}));


//Create employee account
app.post('/api/v1/signup', (req, res, next)=>{
    bcrypt.hash(req.body.password, id).then((hash)=>{
        const user = {
            first_name: req.body.fname,
            last_name: req.body.lname,
            username: req.body.uname,
            password: hash,
            created_at: req.body.created_at,
        };

        client.query('INSERT INTO users SET ?', user, (err, res)=>{
            if(err) throw err;
            console.log(res);
            client.end();
        });
    }).catch((error)=>{
        res.status(500).json({
            error: error
        });
    });
});

//To sign in
app.post('/api/v1/signin', (req, res, next)=>{

});

//Create and share gifs by employee
app.post('/api/v1/gifs', (req, res, next)=>{

});

//Write or share articles on subjects of interest
app.post('/api/v1/articles?sub={sub}', (req, res, next)=>{

})
//Edit their articles
app.put('/api/v1/articles/:articleId', (req, res, next)=>{

});
//Delete their articles
app.delete('/api/v1/articles/:articleId', (req, res, next)=>{

});
//Delete their gifs
app.delete('/api/v1/gifs/:gifId', (req, res, next)=>{

});
//Comment on other people's article's posts
app.post('/api/v1/articles/comments', (req, res, next)=>{

});
//Comment on other people's gif posts
app.post('/api/v1/gifs/comments', (req, res, next)=>{

});
//View all articles showing the most recent first
app.get('/api/v1/articles?sort={recently_created}', (req, res, next)=>{

});
//View a specific article
app.get('/api/v1/articles/:articleId', (req, res, next)=>{

});





app.get('/emp', (req, res) =>{
    res.status(200).json({
        message: 'Working..'
    });
    
});

module.exports = app;