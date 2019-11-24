const jwt = require('jsonwebtoken');

module.exports = (req, res, next)=>{
    try{
        // extract token from request
        const token = req.headers.authorization.split(' ')[1];
        // decode the token
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        console.log(decodedToken)
        //extract userId
        const userId = decodedToken.userId;
        if(userId){
            next()
        } else{
            return res.status(401).json({ error: 'Not Authorized'})
        }
    }catch{
        res.status(401).json({
            error: new Error('Invalid request!')
        });
    };
};