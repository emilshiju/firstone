
import { Profile } from "../entities/profile";
import ProfileModel from "../frameWorks/mongodb/models/profileModel";
import { IPofileRepository } from "../interfaces/user/profile/IProfileRepository";
import { injectable } from "inversify";
import notificationModel from "../frameWorks/mongodb/models/notificationModel";
import mongoose,{Schema,model, Types} from "mongoose";

@injectable()
export class ProfileRepository implements IPofileRepository {
  async RcreateProfile(input: Profile): Promise<any> {
    const updateData = {
      bio: input.bio,
      profession: input.profession,
      nickName: input.nickName,
      imageUrl: input.imageUrl,
    };

    const profile = await ProfileModel.findOneAndUpdate(
      { userId: input.userId },
      updateData,
      { upsert: true, new: true }
    );
    console.log(profile);
    return profile;
  }

  async RgetProfileUrl(input: any): Promise<any> {
    console.log("thirdd");
    let imageUrl = await ProfileModel.findOne({ userId: input });
    console.log(
      "11111111111111111111111111111111111111111111111111111111111111111"
    );
    if (!imageUrl) {

      return false;
    }
    return imageUrl;
  }

  async RupdateImageUrl(
    userId: Schema.Types.ObjectId,
    imageUrl: string
  ): Promise<any> {
    let found = await ProfileModel.findOneAndUpdate(
      { userId: userId },
      { imageUrl: imageUrl }
    );
    console.log(found);
    return found;
  }

  async RconnectionNotification(
    senderName: string,
    senderId: Schema.Types.ObjectId,
    receiverId: Schema.Types.ObjectId,
    userProfileId: Schema.Types.ObjectId,
    receiverProfileId: Schema.Types.ObjectId
  ): Promise<any> {
    try {
      console.log(receiverId);
      console.log(userProfileId);

      const notification = await new notificationModel({
        senderId,
        receiverId,
        senderProfile: userProfileId,
        receiverIdProfile: receiverProfileId,
        type: "connect",
        message: `${senderName} wants to connect with you.`,
      });

      const savedNotification = await notification.save();
      const save = await savedNotification.populate("senderProfile");
      console.log(savedNotification);

      console.log(
        "keteyiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii"
      );

      return save;
    } catch (error) {
      console.log(error);
    }
    // const response=await
  }

  async RgetNotification(userId: string): Promise<any> {
    const connectRequests = await notificationModel.find({
      $or: [{ senderId: userId }, { receiverId: userId }],
    }); 
    if (!connectRequests || connectRequests.length === 0) {
      throw new Error(
        "No connect requests found for the given sender and receiver IDs"
      );
    }
    // const objectId = new Types.ObjectId(userId);

    await Promise.all(connectRequests.map(async (connectRequest) => {
      console.log(connectRequest.senderId)
      if (connectRequest.senderId.toString()==userId ) {
        console.log("its eqaul")  
        console.log(connectRequest.senderId.toString())
          await connectRequest.populate('receiverIdProfile')
      }
      if (connectRequest.receiverId.toString()=== userId) {
          await connectRequest.populate('senderProfile')
      }


      // Optionally save each updated connect request
      await connectRequest.save();
  }));
  return connectRequests

    console.log(connectRequests)
  }

   async acceptedRequest(senderId:Schema.Types.ObjectId,receiverId:Schema.Types.ObjectId,senderProfile:Schema.Types.ObjectId,receiverIdProfile:Schema.Types.ObjectId): Promise<any> {
    
     try{
console.log("0o0opopopopopo")
        const response1 = await ProfileModel.findByIdAndUpdate(
      senderProfile,
      {
          $push: {
              connections: {
                  userId: receiverId,
              }
          }
      },
    // This option returns the updated document
  );
     

      const response2=await ProfileModel.findByIdAndUpdate(
        receiverIdProfile,
        {
          $push:{
            connections:{
              userId:senderId
            }
          }
        }
      )



      
  console.log(response1)
  console.log(response2)
        const notification = await notificationModel.findOne({
          senderId: senderId,
          receiverId: receiverId,
        }).populate('receiverIdProfile');
        


        if (!notification) {
          console.log('Notification not found');
          return;
        }

        notification.status='true'

        notification.message='both are connected'

        const updatedNotification = await notification.save()
        console.log("updaed notificaiotn")
        console.log(updatedNotification)

  
        // const notification = await new notificationModel({
        //   senderId,
        //   receiverId,
        //   senderProfile: senderProfileId,
        //   receiverIdProfile: receiverProfileId,
        //   type: "connect",
        //   message: `${userName} wants to connect with you.`,
        // });
  
        // const savedNotification = await notification.save();
        // const save = await savedNotification.populate("senderProfile");
        // console.log(savedNotification);
  
        // return save;
  
  

      



    //   const profile1:any = await ProfileModel.findOne({ userId:userId});
    //   const connection1 = profile1.connections.find(
    //     (conn:any) => conn.userId.toString() === receiverId.toString()
    // );
    // connection1.status = "true";
    // await profile1.save();

    // const profile2:any = await ProfileModel.findOne({ userId:receiverId});
    //   const connection2 = profile1.connections.find(
    //     (conn:any) => conn.userId.toString() === userId.toString()
    // );
    // connection2.status = "true";
    // await profile2.save();





console.log("kkkkkkkk")


      
      return updatedNotification

     }catch(error){
      console.log("error")

     }


  }

  async connectionRequest(userName:string,senderId:string,receiverId:string,senderProfileId:Schema.Types.ObjectId,receiverProfileId:Schema.Types.ObjectId): Promise<any> {

  console.log("oneeeeeeeeeeeeeeeee")
  console.log(userName,senderId,receiverId,senderProfileId,receiverProfileId)
  //   const response = await ProfileModel.findByIdAndUpdate(
  //     senderProfileId,
  //     {
  //         $push: {
  //             connections: {
  //                 userId: receiverId,
  //             }
  //         }
  //     },
  //     { new: true }  // This option returns the updated document
  // );
  //     console.log(response)

      // const response2=await ProfileModel.findByIdAndUpdate(
      //   receiverProfileId,
      //   {
      //     $push:{
      //       connections:{
      //         userId:senderId
      //       }
      //     }
      //   }
      // )


      const notification = await new notificationModel({
        senderId,
        receiverId,
        senderProfile: senderProfileId,
        receiverIdProfile: receiverProfileId,
        type: "connect",
        message: `${userName} wants to connect with you.`,
      });

      const savedNotification = await notification.save();
      const save = await savedNotification.populate("senderProfile");
      console.log(savedNotification);

      return save;



   
 }

  async RcheckConnectionStatus(userId:any,receiverId:any): Promise<boolean> {

    console.log("ivdieeeee")

    const userProfile = await ProfileModel.findOne({ userId });

    if (!userProfile) {
      // No profile found for the user
      return false;
  }

  const connection = userProfile.connections.find(conn =>
    conn.userId&& (conn.userId as mongoose.Types.ObjectId).equals(receiverId)
);
  if(!connection){

  }

  console.log("all connection of user all ocnnectio n of user ")

  console.log(connection)

  if(connection ){
    return true
  }

  

    return false
   
 }

  
}
