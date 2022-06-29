import jwt from "jsonwebtoken";

const secret = process.env.SECRET;

// wants to like the post
//  click the like button => auth middleware(next) => like controller

// delete the post
// click the delete button => auth middleware(next) => delete controller

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;

    let decodedData;

    // jwt token
    if (token && isCustomAuth) {      
      decodedData = jwt.verify(token, secret);

      req.userId = decodedData?.id;
    } 
    // google oauth token
    else {
      decodedData = jwt.decode(token);
        // sub is google's id
      req.userId = decodedData?.sub;
    }    
    
    next();

  } catch (error) {
    console.log(error);
  }
};

export default auth;