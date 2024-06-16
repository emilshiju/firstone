import { User, findUser } from "../entities/user";
import { IUserRepository } from "../interfaces/user/IUserRepository";
import { injectable } from "inversify";
import UserModel from "../frameWorks/mongodb/models/userModel";
import locationModel from "../frameWorks/mongodb/models/userLocation";
import AdminModel from "../frameWorks/mongodb/models/adminModel";
import mongoose from "mongoose";
import { ObjectId } from "mongodb";

import Joi, { Err, string } from "joi";
import bcrypt from "bcrypt";

@injectable()
export class UserRepository implements IUserRepository {
  async create({ userName, dob, gender, email, password }: User): Promise<any> {
    const createdUser = await UserModel.create({
      userName,
      dob,
      gender,
      email,
      password,
    });

    console.log("saveddddddddddddddddddddddddddddddddd");
    // createdUser.save()
    // const userObject: User = createdUser.toObject();

    return createdUser;
  }

  async findUser(data: findUser): Promise<any> {
    console.log(data);

    // check whether user already have data on database

    //   let userLocation

    //   let checkUserLocation=await locationModel.find({userId:data.userId})
    //   if(checkUserLocation.length==0){
    //     console.log("hereeeeeeeeeeee")
    //     const saveLocation=await locationModel.create({
    //         userId:data.userId,
    //         location:{
    //             longitude:data.location.longitude,
    //             latitude:data.location.latitude
    //         },
    //         radius:data.radius
    //     })
    //   console.log(saveLocation)

    //   userLocation=saveLocation

    // }else{

    //     console.log("seceeeeeeeeeeeeeee")
    //     let updated =await locationModel.findOneAndUpdate(
    //         {userId:data.userId},
    //         {
    //             $set:{
    //                 'location.longitude':data.location.longitude,
    //                 'location.latitude':data.location.latitude,
    //                 radius:data.radius
    //             }
    //         }
    //     )

    //     userLocation=updated

    // }
    // let uId=data.userId
    // var id = new mongoose.Types.ObjectId(uId);
    let userLocation = await locationModel.findOne({ userId: data.userId });
    // let userLocation=await locationModel.find()
    console.log(
      "ppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppp"
    );
    console.log(userLocation);
    console.log(data.radius);

    // console.log(checkUserLocation)
    let r: number = data.radius || 0;
    const maxDistance = (r || 0) * 1000; // convert kilometers to meters
    // let longitude=checkUserLocation[0].location?.longitude
    // let latitude=checkUserLocation[0].location?.latitude
    console.log(maxDistance);

    // let longitude=userLocation?.location?.longitude||0
    // let latitude=userLocation?.location?.latitude||0

    // @ts-ignore
    let longitude = userLocation?.location?.coordinates[0] || 0;
    // @ts-ignore
    let latitude = userLocation?.location?.coordinates[1] || 0;

    console.log(longitude);
    console.log(latitude);

    let whoall = await locationModel.find();
    console.log(whoall);

    const nearbyUsers = await locationModel.aggregate([
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [longitude, latitude],
          },
          distanceField: "dist.calculated",
          maxDistance: maxDistance, // max distance in meters
          includeLocs: "dist.location",
          spherical: true,
        },
      },
    ]);

    const userIds = nearbyUsers.map((user) => user.userId);
   console.log("000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000")
    console.log(userIds);

    const profileDetails = await locationModel.aggregate([
      {
        $match: {
          userId: { $in: userIds.map((id) => new ObjectId(id)) },
        },
      },
      {
        $lookup: {
          from: "profiles",
          localField: "userId",
          foreignField: "userId",
          as: "profileDetails",
        },
      },{
        $match: {
          profileDetails: { $ne: [] },
        },
      },
    ]);
    console.log("profileeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
    // @ts-ignore
    console.log(profileDetails);
    for (let i of profileDetails) {
      console.log(i.profileDetails);
    }

    console.log("useressssssssssssssss");
    console.log(nearbyUsers);
    console.log(nearbyUsers);
    const id1 = data.userId;
    const id2 = new ObjectId(data.userId as unknown as string);
    console.log(id2);
    let nearof = [];
    for (let i of profileDetails) {
      console.log(i.userId);
      console.log(id2);
      console.log(id2.equals(i.userId));

      if (!i.userId.equals(id2)) {
        nearof.push(i);
      }
    }
    console.log("near of  near of near of ");
    console.log(nearof);

    return nearof;
  }

  async RfindEmail(data: string): Promise<boolean> {
    console.log(
      "is theeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
    );
    console.log(data);
    //  let email=data.email
    let isThere = await UserModel.findOne({ email: data });
    console.log(isThere);
    if (isThere) {
      return true;
    } else {
      return false;
    }
  }

  async RuserLogin(email: string, password: string): Promise<any> {
    console.log(email);
    let ifUser = await UserModel.findOne({ email: email });
    console.log("ivdie user sdie");
    console.log(ifUser);
    if (ifUser) {
      // let match=await bcrypt.compare(password,ifUser.password)
      // if(match){

      //   return ifUser
      // }

      return ifUser;
    }
    return false;
  }

  async RadminLogin(email: string, password: string): Promise<any> {
    console.log(email);
    let ifAdmin = await UserModel.findOne({ email: email });
    console.log(ifAdmin);
    if (ifAdmin) {
      //       console.log("iide")
      //       console.log(ifAdmin.password)
      //       console.log(password)
      // let hash=ifAdmin.password
      //       let match=await bcrypt.compare(password,hash)
      //       console.log(match)
      //       console.log("ivide")
      //       if(match){
      //     console.log("trei")
      //         return ifAdmin
      //       }

      return ifAdmin;
    }

    return false;
  }

  // async Rgetusers(): Promise<any> {

  //   let allUsers=await UserModel.find()

  //   return allUsers
  // }

  async RgoogleLogin(email: string): Promise<any> {
    let data = await UserModel.findOne({ email: email });

    return data;
  }

  async RuserStatus(userId: mongoose.Schema.Types.ObjectId): Promise<boolean> {
    let response = await UserModel.findById(userId);
    if (response?.status) return true;
    else return false;
  }

   async RsaveLocation(longitude: any, latitude: any,userId:any): Promise<any> {
     

    let updated =await locationModel.findOneAndUpdate(
      {userId:userId},
      {
          // $set:{
          //     'location.longitude':data.longitude,
          //     'location.latitude':data.latitude,
          //     radius:radius
          // }
          $set:{
              'location.type': 'Point', // Set GeoJSON type
              'location.coordinates': [longitude, latitude],
         
          }
      },{ upsert: true, new: true } 
      
  )

}

}



export class userStatus {
  async userStatus(userId: mongoose.Schema.Types.ObjectId): Promise<boolean> {
    
    let response = await UserModel.findById(userId);
    console.log("-000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000")
    console.log(response?.status)
    if (response?.status) return true;
    else return false;
  }

  
}
