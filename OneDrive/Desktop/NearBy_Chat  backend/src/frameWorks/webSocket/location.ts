
import socketIo ,{Server}from "socket.io"
import mongoose from "mongoose";
import  {locationRepository} from "../../repositories/locationRepository"

import { ProfileRepository } from "../../repositories/profileRepository";

import { Schema } from "mongoose";






import { IPofileRepository } from "../../interfaces/user/profile/IProfileRepository";
import { INTERFACE_TYPE } from "../../utils/appConst";
import { Container } from "inversify";

import {container} from "../../routes/profileRoute"
// const container=new Container()
const profileRepo=container.get<IPofileRepository>(INTERFACE_TYPE.ProfileRepository)

const repository = new locationRepository ();
const profile=new ProfileRepository()


const socketConfig=(io:Server)=>{   
    let connectedClients: { [key: string]: any } = {};

     io.on('connection',(socket)=>{

        socket.on('on',(userId)=>{
            if(userId){
            connectedClients[userId]=socket.id
            }
        })
        console.log("conected    89798798787878789798798798798798989   pesdjfospeploe connected pepeole conenctd pepeole ")
        console.log(connectedClients)



  
  
    console.log("vanu")
    // socket.on('locationUpdate',(location:any,userId:string,radius:number)=>{
    //     // io.emit('locationUpdate',location,userId)
    //     // connectedClients[userId]=socket.id
    //     console.log('00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000')
    //     console.log(connectedClients)
    //     console.log(radius)
    //     repository.saveLocation( location,userId,radius)
    //     console.log(location,userId,radius)
    // })  

    // const sendNotification = (userId, notificationData) => {
    //     if (connectedClients[userId]) {
    //       io.to(connectedClients[userId]).emit('notification', notificationData);
    //     } else {
    //       console.log(`User with ID ${userId} not connected`);
    //     }
    //   };

    socket.on('connectionNotification',async(senderId:Schema.Types.ObjectId,receiverId:Schema.Types.ObjectId,senderName:string,userProfileId:Schema.Types.ObjectId,receiverProfileId:Schema.Types.ObjectId)=>{
        console.log("here vaniiii")
        console.log(connectedClients)
       let response=await  profile.RconnectionNotification(senderName,senderId,receiverId,userProfileId,receiverProfileId)
       console.log(response)
       if(response){
        console.log(response)

        if(connectedClients[response.receiverId]){
            
            io.to(connectedClients[response.receiverId]).emit('notification', response);
            // socket.emit('disconnectNotification');
            
        }else{
            console.log("offline")
        }
       }else{
        console.log("sijdfosijfiosd")
       }

    })

    

    socket.on('acceptedRequest',async(senderId,receiverId,senderProfile,receiverIdProfile)=>{
     console.log("heyheyeheyeeheyeyeheyheehehey")
     console.log(senderId)
     console.log(receiverId)
     console.log(senderProfile)
     console.log(receiverIdProfile)
      let response= await profileRepo.acceptedRequest(senderId,receiverId,senderProfile,receiverIdProfile)
      console.log("hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
      console.log("stoppp")
      
      console.log(response)
       console.log(connectedClients)
       let senderOne=response.senderId.toString()
       console.log(senderOne)
      if(connectedClients){
        io.to(connectedClients[senderOne]).emit("notification",response)
      }else{
        console.log("sender offline")
      }
      let receiverOne=response.receiverId.toString()
      console.log(receiverOne)
         if(io.to(connectedClients[receiverOne])){
      
      io.to(connectedClients[response.receiverId]).emit("notification")
         }else{
            console.log("reciever offline")
         }
      
    })


    socket.on('connectionRequested',async(userName,senderId,receiverId,userProfileId,receiverProfileId)=>{
         console.log("0000000000000777777777777777777777777777777777777777777777777777777777777777777777777777777000000000000000000000000000000000000000000000000")
         console.log(userName,senderId,receiverId,userProfileId,receiverProfileId)
        let response=await profileRepo.connectionRequest(userName,senderId,receiverId,userProfileId,receiverProfileId)

        if(response){
            console.log(response)
            

    
            if(connectedClients[response.receiverId]){
                
                io.to(connectedClients[response.receiverId]).emit('notification', response);
                // socket.emit('disconnectNotification');
                
            }else{
                console.log("offline")
            }
           }else{
            console.log("sijdfosijfiosd")
           }
    })


    socket.on('sendMessage',async(roomId,senderId,message)=>{


    })
      
    
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });



 })

 

}



export default socketConfig


