import locationModel from "../frameWorks/mongodb/models/userLocation";

export class locationRepository {

      

    async saveLocation (data:any,userId:string,radius:number){


        let userLocation

        let checkUserLocation=await locationModel.find({userId:userId})
        // if(checkUserLocation.length!==0){
          console.log("hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")

        console.log(radius)
     console.log(userId)

        console.log(checkUserLocation)
        console.log("seceeeeeeeeeeeeeee")
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
                    'location.coordinates': [data.longitude, data.latitude],
                    radius:radius
                }
            },{ upsert: true, new: true } 
            
        )
  
        

       
  
    //   }else{

  

        // const saveLocation=await locationModel.create({
        //     userId:userId,
        //     location:{
        //         longitude:data.longitude,
        //         latitude:data.latitude
        //     },
        //     radius:value
        // })
    // }


}

}