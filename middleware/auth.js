const jwt = require('jsonwebtoken');

module.exports = (req, res, next)=>{
    try{
        // extract token from request
        const token = req.headers.authorization.split(' ')[1];
        // decode the token
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        //extract userId
        const userId = decodedToken.userId;
        if(req.body.userId && req.body.userId !== userId){
            throw 'Invalid user Id'
        } else{
            next();
        }
    }catch{
        res.status(401).json({
            error: new Error('Invalid request!')
        });
    };
};