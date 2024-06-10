import jwt from 'jsonwebtoken'
export const authenticateJwt = async (req, res, next) => {
    try {
        console.log(req.headers.authentication.split(' '))
        if (
            !req.headers.authentication ||
            !req.headers.authentication.startsWith('Bearer') ||
            (req.headers.authentication.split(' ').length !== 2)
        ) {
            
            return res.redirect('/')
            // next()
        }
        else {
            const secretkey = process.env.JWT_SECRET
            const token = req.headers.authentication.split(' ')[1];
            jwt.verify(token, secretkey, (err, authorized)=>{
                if(err){
                    res.sendStatus(403)
                }
                else{

                    req.token  = token;

                    console.log("user authorized")
                    next();
                }
            })
        }
        // decode then token and verify

    }
    catch (error) {
        console.log(error.meesage)
    }
};
