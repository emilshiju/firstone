import jwt, { Secret } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { string } from "joi";


export const accessToken = (userName: string, email: string) => {
  const secretOrPrivateKey: Secret = process.env.ACCESS_TOKEN_SECRET || "";

  const token = jwt.sign(
    {
      username: userName,
      email: email,
    },
    secretOrPrivateKey,
    { expiresIn: "30m" }
  );

  console.log("ccreating creatn creaitn creaitn creta ty token token token otken eotne token")
  console.log(token)
  return token;
};

export const verifyRefreshToken = (
  input: string,
  username: string,
 
): Promise<string | null> => {

  const secret: Secret = process.env.REFRESH_TOKEN_SECRET || "";

  return new Promise((resolve, reject) => {
    jwt.verify(input, secret, async (err, decoded) => {
      if (err) {
        reject(err); // Return error if verification fails
      } else {
        const secretOrPrivateKey: Secret = process.env.ACCESS_TOKEN_SECRET || "";

        const token = await jwt.sign(
          {
            username: username,
          },
          secretOrPrivateKey,
          { expiresIn: "30m" }
        );

        resolve(token); // Return the signed token
      }
    });
  });


};



export const refreshToken = (username: string) => {


  const secretOrPrivateKey: Secret = process.env.REFRESH_TOKEN_SECRET || "";
  const token = jwt.sign(
    {
      username: username,
      
    },
    secretOrPrivateKey,
    { expiresIn: "1d" }
  );
  return token;
};








// Define a type for your access token secret
type AccessTokenSecret = string | undefined;


export const verifyAccesToken=(req:Request,res:Response,next:NextFunction)=>{
  
  try{
    const authHeader = req.headers['authorization'];
    let token=authHeader && authHeader.split(' ')[1]
   
 
    if (!token) {
     

      return res.status(401).json({ message: 'Unauthorized' });
    }

  
    const secretOrPrivateKey: AccessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "";
   
    jwt.verify(token, secretOrPrivateKey,(err:any,decoded:any)=>{


      
      if(err){
        console.log(err)
        return res.status(401).json({message:'Unauthorized'})
      }
      console.log("ivide ane decoed decoed decoed ")
      console.log(decoded)
    // @ts-ignore
      req.user=decoded 

      next()
    }
    
  );



  }catch(error){

  }
}