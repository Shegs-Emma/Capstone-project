const express               = require('express'),
      app                   = express(),
      { Pool, Client }      = require('pg');


const connectionString = 'postgressql://postgres:M@rch041992P@localhost:5432/capstone_project';

const client = new Client({
    connectionString: connectionString
});

client.connect();

client.query('SELECT * FROM company', (err, res)=>{
    console.log(err, res);
    client.end();
});


app.get('/emp', (req, res) =>{
    res.status(200).json({
        message: 'Working..'
    });
    
});

module.exports = app;