import jwt  from 'jsonwebtoken'
export const authenticateJwt = async (req, res, next) => {
    function isValidJwtFormat(token) {
        // Check for presence of periods separating segments
        
        const parts = token.split('.');
        console.log(parts.length===3)
        return parts.length ===3;
      }
        try {
          if (!req.headers.authentication || !req.headers.authentication.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Unauthorized: Missing or invalid authorization header' });
          }
       
          const token = req.headers.authentication.split(' ')[1];
      
          // Additional check for valid JWT format (optional)
          if (!isValidJwtFormat(token)) {
            return res.status(403).json({ message: 'Forbidden: Invalid JWT token format' });
          }
      
          const secretkey = process.env.JWT_SECRET;
          jwt.verify(token, secretkey, (err, authorized) => {
            if (err) {
                console.log(err.name)
                if (err.name ==='TokenExpiredError'){
                    return res.status(400).json({msg:"expired token"})
                }
                console.log(err)
              return res.status(403).json({ message: 'Forbidden: Invalid JWT token' });
            }
            if (authorized){
                console.log(authorized)
                // req.token = token;
                next()

            }
          });
        } catch (error) {
          console.error(error);
          return res.status(500).json({ message: 'Internal Server Error' });
        }
      


};
