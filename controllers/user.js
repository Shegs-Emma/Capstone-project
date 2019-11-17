const bcrypt            = require('bcrypt'),
      jwt               = require('jsonwebtoken'),
      Pool              = require('pg').Pool;

const pool = new Pool ({
    user: 'postgres',
    host: 'localhost',
    database: 'capstone_project',
    password: process.env.DATABASE_PW,
    port: 5432
});



exports.signUp = (req, res, next)=>{
    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;
    const uname = req.body.uname;
    const password = req.body.password;

    console.log(fname, lname, email, uname);

    bcrypt.hash(password, 10).then((hash)=>{
        const query = {
            text: 'INSERT INTO users(first_name, last_name, email, username, password) VALUES($1, $2, $3, $4, $5)',
            values: [fname, lname, email, uname, hash],
        };

        pool.query(query, (err, results)=>{
            if(err) throw err;
            
            res.status(201).json({results});
            // client.end();
        });
    }).catch((error)=>{
        res.status(500).json({
            error: error
        });
    });
};


exports.logIn = (req, res, next)=>{
    const query = {
        text: `SELECT username, password, id FROM users WHERE username = '${req.body.uname}'`
    };

    pool.query(query).then(
        (results)=>{
            const user = results;

            bcrypt.compare(req.body.password, user.rows[0].password).then(
                (valid)=>{
                    if(!valid){
                        return res.status(401).json({
                            error: new Error('Incorrect password')
                        });
                    }
                    const token = jwt.sign(
                        {userId: user.rows[0].id},
                        'RANDOM_TOKEN_SECRET',
                        {expiresIn: '24h'}
                    );
                    res.status(200).json({
                        userId: user.rows[0].id,
                        token: token
                    });
                }
            ).catch((error)=>{
                res.status(500).json({
                    error: "Here two"
                });
            });
            pool.end();
        }
    ).catch((error)=>{
        res.status(500).json({
            error: "User not found"
        });
    }); 
};