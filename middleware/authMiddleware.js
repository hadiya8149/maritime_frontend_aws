import jwt from 'jsonwebtoken'
export const authenticateJwt = async (req, res, next) => {

  function isValidJwtFormat(token) {
    // Check for presence of periods separating segments
    console.log('check for valid parts')

    const parts = token.split('.');
    console.log(parts.length === 3)
    console.log(parts.length === 3)

    return parts.length === 3;
  }
  try {
    console.log(req.headers.authorization, "req.headers.Authorizaiton")
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer')) {
      console.log(req.headers)
      return res.status(401).json({ message: 'Unauthorized: Missing or invalid authorization header' });
    }
    else {
      const token = req.headers.authorization.split(' ')[1];
      if (!isValidJwtFormat(token)) {
        return res.status(403).json({ message: 'Forbidden: Invalid JWT token format' });
      }
      else {
        const secretkey = process.env.JWT_SECRET;
        jwt.verify(token, secretkey, (err, authorized) => {
          if (err) {
            console.log(err.name)
            if (err.name === 'TokenExpiredError') {
              return res.status(400).json({ msg: "expired token" })
            }
            else {
              console.log(err)
              return res.status(403).json({ message: 'Forbidden: Invalid JWT token' });
            }
          }
          else {
            console.log(authorized)
            // req.token = token;
            next()

          }

        });
      }
    }

    // Additional check for valid JWT format (optional)


  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }



};
