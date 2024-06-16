import { NextFunction, Request, Response } from "express";

import { IUserInteractor } from "../interfaces/user/IUserInteractor";

import { inject, injectable } from "inversify";

import { INTERFACE_TYPE } from "../utils/appConst";

const { OAuth2Client } = require('google-auth-library');

import axios from "axios";
import dotenv from "dotenv"

import { accessToken ,refreshToken} from "../services/jwtService";
dotenv.config();

import {v2 as cloudinary} from 'cloudinary';



cloudinary.config({ 
  cloud_name:process.env.CLOUDINARY_CLOUD_NAME, 
  api_key:process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});


let CLIENT_ID=process.env.CLIENT_ID

const client = new OAuth2Client(process.env.CLIENT_ID);


  @injectable()
export class UserController {
  private interactor: IUserInteractor;

  constructor(
    @inject(INTERFACE_TYPE.UserInteractor) interactor: IUserInteractor
  ) {
    this.interactor = interactor;
  }

  async onCreateUser(req: Request, res: Response, next: NextFunction) {
    try {
      console.log("vanu")
      const input = req.body;

      const { Accesstoken, data, RefreshToken } =
        await this.interactor.createUser(input);

      // if(!data){
      //     console.log("dfhfsiijjjjjjjjjjjj")

      //     return res.json({message:"already  used"}).status(304)
      // }

      const userData = {
        _id: data._id,
        userName: data.userName,
        role: data.role,
        email:data.email,
        status:data.status
      };

      if(!userData.status){
        return res.status(403).json({ error: 'Your account is blocked. Please contact support.' });
      }
      

      res.cookie("jwt", RefreshToken, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      });

      return res
        .json({
          message: "succesfully registered",
          data: userData,
          Accesstoken,
        })
        .status(200);


    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async onRefreshToken(req: Request, res: Response, next: NextFunction) {
    try {

      let id= req.cookies['jwt']; 
      const {userName }= req.body;
      console.log("888888888888888888888888888888888888888888888888888888888888888888888888")
      console.log(id,userName)
      if(!id){
        return res.status(401).json({ message: 'Unauthorized' });
      }
      const accesstoken= await this.interactor.refreshToken(id,userName);
      console.log("reeeeeeeeeeeeefreshhhhhhhhhhhhhhhhhhhh tokennnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn")
      console.log(accesstoken)
      res.status(200).json({data:accesstoken})
    } catch (error) {
      console.log("error aneee")
      return  res.status(401).json({message:"oops"})
      console.log(error);
    }
  }

  async onLoginUser(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (error) {
      console.log(error);
    }
  }

  async onFindUser(req: Request, res: Response, next: NextFunction) {
    try {
      // await this.interactor.findUser()
      const body = req.body;

      console.log("herereeeeee");
      console.log(body);

      const data = await this.interactor.IfindUser(body);
      console.log("response")
           console.log(data)
           console.log("oiooioio")
      return res.json({data}).status(200)
      
    } catch (error) {
      console.log(error);
    }
  }

  async googleAuth(req: Request, res: Response, next: NextFunction) {
    try{
    console.log("hereee")
    console.log(process.env.CLIENT_ID)
    let CLIENT_ID=process.env.CLIENT_ID
    let REDIRECT_URI=process.env.REDIRECT_URI
    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=profile email`;
    console.log(REDIRECT_URI)
    console.log(CLIENT_ID)
    
    res.redirect(url);
    }catch(error){
      console.log(error)
    }
  }

  async googleAuthCallback(req: Request, res: Response, next: NextFunction) {
    console.log("iveide aneee okk")
    const { code } = req.query;
    try {
      //  Exchange authorization code for access token
 console.log("ivide onnn anee")
      const { data } = await axios.post("https://oauth2.googleapis.com/token", {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        code,
        redirect_uri: process.env.REDIRECT_URI,
        grant_type: "authorization_code",
      });
      const { access_token, id_token } = data;

      const { data: profile } = await axios.get(
        "https://www.googleapis.com/oauth2/v1/userinfo",
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      );

      const { email } = profile;

        const isThere=await this.interactor.IcheckEmail(email)
        if(!isThere){
            return res.json({messaeg:"please create an account here"})
        }

        return res.json({message:"sucessfulyy logined"})




    } catch (error) {
        console.log(error);
        return res.json({message:"please create an google account"})
      
    }
  }


  async findEmail(req:Request,res:Response,next:NextFunction){
    console.log("am hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
    const {email}=req.body

    console.log(email)
    const isThere=await this.interactor.IcheckEmail(email)
    return res.json({status:isThere})




  }


  async googleLogin(req:Request,res:Response,next:NextFunction){
 
    const { idToken,email,username}=req.body

    console.log("vansdfsfsdfs333333333333333333333333333333333333333333333333333333333333333333333333333333d")
    try{

      const ticket=await client.verifyIdToken({
        idToken:idToken,
        audience:CLIENT_ID
      })


    

      

    let {data,Accesstoken,RefreshToken}=await this.interactor.IgoogleLogin(email)



      const userData = {
        _id: data._id,
        userName: data.userName,
        role: data.role,
        email:data.email,
        status:data.status
      };
      if(!userData.status){
        return res.status(403).json({ error: 'Your account is blocked. Please contact support.' });
      }
      

      res.cookie("jwt", RefreshToken, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      });

      return res
        .json({
          message: "succesfully registered",
          data: userData,
          Accesstoken,
        })
        .status(200);


      // return res.json({message:"Login SucessFully",token:generateToken})



    }catch(error){
      console.log("bjbjhb")
      console.log(error)
    }


  }


  async login(req:Request,res:Response,next:NextFunction){


    const {email,pasword}=req.body
    console.log("vanu")


    console.log(email,pasword)

    let  {ifUser,AccessToken,RefreshToken} =await this.interactor.IuserLogin(email,pasword)
       console.log("poyiiii")
    if(ifUser){
    
    const userData = {
      _id: ifUser._id,
      userName: ifUser.userName,
      role: ifUser.role,
      email:ifUser.email,
      status:ifUser.status
    }; 
    
    if(!userData.status){
      return res.status(403).json({ error: 'Your account is blocked. Please contact support.' });
    }
    



    res.cookie("jwt", RefreshToken, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    console.log('acess tokennnnnnnnnnnnnnnnadsfsdfsdfsd')
  console.log(AccessToken)
    return res
      .json({
        message: "succesfully Logined",
        data: userData,
        AccessToken ,
        status:true
      })
      .status(200);

    }else{

      return res.json({message:"credential not correct",status:false}).status(400)
    }


  }



  async adminLogin(req:Request,res:Response,next:NextFunction){

    const {email,password}=req.body
    console.log('vanu')

    const user=await this.interactor.IadminLogin(email,password)

    console.log("999999999999999999999999999999")
    console.log(user)
    if(user){
      return res.json({status:true})
    }
    return  res.json({message:'check you credentials',status:false})





  }


  // async getAllUsers(req:Request,res:Response,next:NextFunction){
  //    console.log("yes")
  //   let users=await this.interactor.Igetusers()

  //   console.log("sodfjso")
  //   console.log(users)
  //   return res.json({data:users})
  // }


  async uploadProfileUser(req:Request,res:Response,next:NextFunction){

    try{
   console.log("vanuunu")
   console.log(req.body)
   console.log(req.file)
   if(req.file){
    
   const result = await cloudinary.uploader.upload(req.file.path , {
    folder:'/nearbychat'
    });
    console.log("am    33333333333333333333333333333333333333333333333333333333333333333333333            hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
 console.log(result)

if(result){
 return res.json({status:true,result})
}
return res.json({status:false})
}


   

    }catch(error){
      console.log(error)
    }

  }



  async userStatus(req:Request,res:Response,next:NextFunction){

    let {userId}=req.body

    let response=await this.interactor.IuserStatus(userId)

    return  res.json({status:response})

  }

  async saveLocation(req:Request,res:Response,next:NextFunction){

    let {longitude,latitude,userId}=req.body

    const response=await this.interactor.IsaveLocation(longitude,latitude,userId)




  }

  
}
